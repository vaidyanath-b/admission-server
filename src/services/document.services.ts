import prisma from "../../prisma/prisma.client";
import { Document } from "../types";
import { uploadDocument } from "./storage.services";
import { DocumentWithoutUrl, DocumentWithFile } from "../types";

export const createDocument = async (
  file: Express.Multer.File,
  applicantId: number,
  documentTypeCode: string
) => {
  try {
    const document = await prisma.document.create({
      data: {
        applicantId,
        documentTypeCode,
        filename: `/${applicantId}/${documentTypeCode}.${file.mimetype}`,
        url: `/${applicantId}/${documentTypeCode}.${file.mimetype}`,
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

export const uploadDocumentToPhase = async (
  file: Express.Multer.File,
  applicantId: number,
  documentTypeCode: string,
  phaseId: number,
  verifierId: number
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
  verifierId: number,
  phaseId: number,
  verification: boolean,
  remark?: string
) => {
  try {
    const document = await prisma.documentUpdate.create({
      data: {
        applicantId,
        documentTypeCode,
        phaseId,
        verifierId,
        verification,
        remark,
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

export default {
  createDocument,
  createVerificationWithoutReupload,
  getDocumentByApplicantId,
  getVerificationForApplicantId,
  uploadDocumentToPhase,
};
