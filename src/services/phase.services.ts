import { ApplicantPhaseDocuments, DocumentType } from "../types";
import { Phase } from "../types";
import prisma from "../../prisma/prisma.client";
import { PhaseWithApplicants, PhaseWithDocumentTypes } from "../types";
import { PhaseDocument } from "@prisma/client";
export async function createPhase(
  name: string,
  order: number,
  description: string,
  documentsRequired: DocumentType[]
): Promise<Phase & { DocumentsRequired: PhaseDocument[] }> {
  // changeRequired  -- maybe return an error if any documentType already exists in other phase
  try {
    const phase = await prisma.phase.create({
      data: {
        name,
        order,
        description,
        DocumentsRequired: {
          create: documentsRequired.map((documentType) => ({
            DocumentType: {
              connect: { code: documentType.code },
            },
          })),
        },
      },
      include: { DocumentsRequired: true },
    });
    return phase;
  } catch (error) {
    // Handle errors appropriately, like logging or throwing a specific error
    console.error("Error creating phase:", error);
    throw error;
  }
}
export async function deletePhase(order: number): Promise<void> {
  try {
    await prisma.phase.delete({ where: { order } });
  } catch (error) {
    // Handle errors appropriately
    console.error("Error deleting phase:", error);
    throw error;
  }
}
export async function getPhases(): Promise<Phase[]> {
  try {
    const phases = await prisma.phase.findMany();
    return phases;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error getting phases:", error);
    throw error;
  }
}
export async function getPhase(order: number): Promise<PhaseWithDocumentTypes> {
  try {
    const phase = await prisma.phase.findUnique({
      where: { order },
      include: { DocumentsRequired: { include: { DocumentType: true } } },
    });
    if (!phase) {
      throw new Error("Phase not found");
    }
    return phase;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error getting phase:", error);
    throw error;
  }
}
export async function updatePhase(
  order: number,
  name: string,
  description: string,
  documentsRequired: DocumentType[]
): Promise<PhaseWithDocumentTypes> {
  try {
    const phase = await prisma.phase.update({
      where: { order },
      data: {
        name,
        description,
        DocumentsRequired: {
          set: documentsRequired.map((documentType) => ({
            phaseId_documentTypeCode: {
              phaseId: order,
              documentTypeCode: documentType.code,
            },
          })),
        },
      },
      include: { DocumentsRequired: { include: { DocumentType: true } } },
    });
    return phase;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error updating phase:", error);
    throw error;
  }
}
export async function getApplicantsInCurrentPhase(
  order: number
): Promise<PhaseWithApplicants> {
  try {
    const phase: PhaseWithApplicants = await prisma.phase.findUnique({
      where: { order },
      include: {
        Applicant: {
          include: {
            DocumentUpdate: {
              select: {
                documentTypeCode: true,
                verification: true,
              },
              where: {
                phaseId: order,
              },
            },
          },
        },
      },
    });
    if (!phase) {
      throw new Error("Phase not found");
    }
    return phase;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error getting applicants in phase:", error);
    throw error;
  }
}
export async function getApplicantPhaseDocuments(
  order: number,
  applicantId: number
): Promise<ApplicantPhaseDocuments> {
  try {
    const applicantPhaseDocs: ApplicantPhaseDocuments =
      await prisma.applicant.findUnique({
        where: { id: applicantId },
        include: {
          DocumentUpdate: {
            include: {
              DocumentType: true,
              Document: true,
            },
            where: {
              phaseId: order,
            },
          },
        },
      });

    if (!applicantPhaseDocs) {
      throw new Error("No Applicant found in this phase");
    }
    return applicantPhaseDocs;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error getting applicant phase documents:", error);
    throw error;
  }
}

export default {
  createPhase,
  deletePhase,
  getPhases,
  getPhase,
  updatePhase,
  getApplicantsInCurrentPhase,
  getApplicantPhaseDocuments,
};
