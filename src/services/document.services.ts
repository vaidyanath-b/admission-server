import prisma from "../../prisma/prisma.client";
import { Document } from "../types";
import { uploadDocument, uploadMemoFile } from "./storage.services";
import { DocumentWithoutUrl, DocumentWithFile } from "../types";
import { Course, Quota } from "@prisma/client";
export const createDocument = async (
  file: Express.Multer.File,
  applicantId: number,
  documentTypeCode: string
) => {
  try {
    const extenstions = file.mimetype.split("/");
    const extension = extenstions[extenstions.length - 1];
    console.log("extension", extension);
    const document = await prisma.document.upsert({
      where: {
        applicantId_documentTypeCode: {
          applicantId,
          documentTypeCode,
        },
      },
      create: {
        applicantId,
        documentTypeCode,
        filename: `/${applicantId}/${documentTypeCode}.${extension}`,
        url: `/${applicantId}/${documentTypeCode}.${extension}`,
      },
      update: {
        filename: `/${applicantId}/${documentTypeCode}.${extension}`,
        url: `/${applicantId}/${documentTypeCode}.${extension}`,
      },
      include: {
        DocumentUpdate: true,
      },
    });
    let newPhase = null;
    if (document.DocumentUpdate.length > 0) {
      const nice = await prisma.documentUpdate.updateMany({
        where: {
          applicantId,
          documentTypeCode,
        },
        data: {
          verification: false,
        },
      });
      /* extra sauce */
      const phaseN = await prisma.phaseDocument.findFirst({
        where: {
          documentTypeCode,
        },
        orderBy: {
          phaseId: "asc",
        },
      });
      if (phaseN) {
        await prisma.applicant.update({
          where: {
            id: applicantId,
          },
          data: {
            currentPhaseId: phaseN.phaseId,
          },
        });
      }
    }

    const uploadedDoc = await uploadDocument(
      file,
      applicantId,
      documentTypeCode
    );

    const quotaW = await prisma.allotment.findFirst({
      where: {
        applicantId,
      },

      orderBy: {
        allotment: "desc",
      },
      take: 1,
      select: {
        applicant: {
          select: {
            docsComplete: true,
          },
        },
        quota: true,
      },
    });

    if (!quotaW) {
      throw new Error("No quota");
    }
    const {
      quota,
      applicant: { docsComplete },
    } = quotaW;
    if (!docsComplete) {
      const documents = await prisma.phaseDocument.findMany({
        distinct: "documentTypeCode",
        select: {
          documentTypeCode: true,
        },
        where: {
          includedQuotas: {
            has: quota,
          },
        },
      });

      const types = documents.map((doc) => doc.documentTypeCode);
      const updates = await prisma.document.count({
        where: {
          applicantId,
          documentTypeCode: {
            in: types,
          },
        },
      });
      if ((documents.length = updates)) {
        await prisma.applicant.update({
          where: {
            id: applicantId,
          },
          data: {
            docsComplete: true,
          },
        });
      }
    }
    return { ...document, uploadedDocument: uploadedDoc };
  } catch (error) {
    throw error;
  }
};

export const uploadDocumentToPhase = async (
  file: Express.Multer.File,
  applicantId: number,
  documentTypeCode: string,
  phaseId: number,
  verifierId: string
) => {
  try {
    const document = await prisma.documentUpdate.create({
      data: {
        Document: {
          create: {
            applicantId,
            documentTypeCode,
            filename: `/${applicantId}/${documentTypeCode}.${file.mimetype}`,
            url: `/${applicantId}/${documentTypeCode}.${file.mimetype}`,
          },
        },
        Applicant: {
          connect: {
            id: applicantId,
          },
        },
        DocumentType: {
          connect: {
            code: documentTypeCode,
          },
        },
        VerifiedBy: {
          connect: {
            id: verifierId,
          },
        },
        Phase: {
          connect: {
            order: phaseId,
          },
        },
        PhaseDocument: {
          connect: {
            phaseId_documentTypeCode: {
              phaseId,
              documentTypeCode,
            },
          },
        },
      },
    });
    const uploadedDoc = await uploadDocument(
      file,
      applicantId,
      documentTypeCode
    );
    return { ...document, uploadedDocument: uploadedDoc };
  } catch (error) {
    throw error;
  }
};

export const createVerificationWithoutReupload = async (
  applicantId: number,
  documentTypeCode: string,
  verifierId: string,
  phaseId: number,
  verification: boolean,
  remark?: string
) => {
  try {
    const document = await prisma.documentUpdate.upsert({
      where: {
        applicantId_verifierId_phaseId_documentTypeCode: {
          applicantId,
          documentTypeCode,
          phaseId,
          verifierId,
        },
      },
      create: {
        applicantId,
        documentTypeCode,
        phaseId,
        verifierId,
        verification,
        remark,
      },
      update: {
        verification,
        remark,
      },
    });

    const quotaW = await prisma.allotment.findFirst({
      where: {
        applicantId,
      },
      orderBy: {
        allotment: "desc",
      },
      take: 1,
      select: {
        quota: true,
      },
    });
    if (!quotaW) {
      throw new Error("No quota");
    }
    const { quota } = quotaW;
    const documents = await prisma.phaseDocument.findMany({
      select: {
        documentTypeCode: true,
      },
      where: {
        phaseId,
        includedQuotas: {
          has: quota,
        },
      },
    });
    const types = documents.map((doc) => doc.documentTypeCode);
    const updates = await prisma.documentUpdate.findMany({
      where: {
        applicantId,
        phaseId,
        verification: true,
        documentTypeCode: {
          in: types,
        },
      },
    });
    if (updates.length == types.length) {
      await prisma.applicant.update({
        where: {
          id: applicantId,
        },
        data: {
          currentPhaseId: phaseId + 1,
        },
      });
    }
    const count = await prisma.documentUpdate.count({
      where: {
        applicantId: applicantId,
        verification: true,
        phaseId: phaseId,
      },
    });
    return document;
  } catch (error) {
    throw error;
  }
};

export const getDocumentByApplicantId = async (
  applicantId: number
): Promise<Document[]> => {
  try {
    const documents = await prisma.document.findMany({
      where: {
        applicantId,
      },
    });
    return documents;
  } catch (error) {
    throw error;
  }
};

export const getVerificationForApplicantId = async (applicantId: number) => {
  try {
    const documentUpdates = await prisma.documentUpdate.findMany({
      where: {
        applicantId,
      },
      include: {
        Document: true,
      },
    });
    return documentUpdates;
  } catch (error) {
    throw error;
  }
};

export const updateMemo = async ({
  file,
  applicantId,
  allotment,
  course,
  quota,
}: {
  file: Express.Multer.File;
  applicantId: number;
  allotment: number;
  course: Course;
  quota: Quota;
}): Promise<any> => {
  try {
    const mimeTypes = file.mimetype.split("/");
    const extension = mimeTypes[mimeTypes.length - 1];
    const updatedAllotment = await prisma.allotment.upsert({
      where: {
        applicantId_allotment: {
          applicantId,
          allotment,
        },
      },
      update: {
        course,
        quota: quota,
      },
      create: {
        course,
        quota,
        applicantId,
        allotment,
        allotmentMemoLink: `/${applicantId}/allotment/${allotment}/memo.${extension}`,
      },
    });
    const uploadedDoc = await uploadMemoFile(file, applicantId, allotment);
    return { ...updatedAllotment, uploadedDocument: uploadedDoc };
  } catch (error) {
    throw error;
  }
};

export default {
  updateMemo,
  createDocument,
  createVerificationWithoutReupload,
  getDocumentByApplicantId,
  getVerificationForApplicantId,
  uploadDocumentToPhase,
};
