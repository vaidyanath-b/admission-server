import prisma from "../../prisma/prisma.client";
import {
  Applicant,
  ApplicantPhaseDocuments,
  ApplicantWithoutId,
} from "../types";

export async function createApplicant(
  application: Applicant
): Promise<ApplicantWithoutId> {
  try {
    const applicant: Applicant = await prisma.applicant.create({
      data: application,
    });
    return applicant;
  } catch (error) {
    console.error("Error creating applicant:", error);
    throw error;
  }
}

export async function deleteApplicant(id: number): Promise<void> {
  try {
    await prisma.applicant.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting applicant:", error);
    throw error;
  }
}

export async function getApplicants(): Promise<Applicant[]> {
  try {
    const applicants = await prisma.applicant.findMany();
    return applicants;
  } catch (error) {
    console.error("Error getting applicants:", error);
    throw error;
  }
}

export async function getApplicant(id: number): Promise<Applicant> {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: { id },
    });
    if (!applicant) {
      throw new Error("Applicant not found");
    }
    return applicant;
  } catch (error) {
    console.error("Error getting applicant:", error);
    throw error;
  }
}

export async function getDocumentsForApplicant(
  id: number
): Promise<ApplicantPhaseDocuments> {
  try {
    const applicant: ApplicantPhaseDocuments =
      await prisma.applicant.findUnique({
        where: { id },
        include: {
          DocumentUpdate: { include: { DocumentType: true, Document: true } },
        },
      });
    if (!applicant) {
      throw new Error("Applicant not found");
    }
    return applicant;
  } catch (error) {
    console.error("Error getting applicant:", error);
    throw error;
  }
}

export async function updateApplicant(
  id: number,
  application: Applicant
): Promise<Applicant> {
  try {
    const applicant: Applicant = await prisma.applicant.update({
      where: { id },
      data: application,
    });
    return applicant;
  } catch (error) {
    console.error("Error updating applicant:", error);
    throw error;
  }
}

