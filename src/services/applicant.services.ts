import {
  ApplicantDetails,
  BankDetails,
  GuardianAddress,
  MatriculationDetails,
  ParentDetails,
  PermanentAddress,
  PresentAddress,
  PreviousInstitutionDetails,
  QualifyingExaminationDetails,
} from "@prisma/client";
import prisma from "../../prisma/prisma.client";
import {
  Applicant,
  ApplicantPhaseDocuments,
  ApplicantWithoutId,
  Document,
  IApplicationUpdate,
  Allotment,
} from "../types";

export async function updateApplication(
  applicantId: number,
  application: IApplicationUpdate
): Promise<Applicant> {
  try {
    application);

    const keys = [
      "ApplicantDetails",
      "parentDetails",
      "presentAddress",
      "permanentAddress",
      "guardianAddress",
      "matriculationDetails",
      "bankDetails",
      "qualifyingExaminationDetails",
      "previousInstitutionDetails",
      "Allotment",
    ];

    const toUpdate = Object.keys(application).reduce((acc: any, key) => {
      if (!keys.includes(key)) return acc;
      if (!acc[key]) acc[key] = { upsert: { create: {}, update: {} } }; // Initialize if not already
      if (application[key as keyof IApplicationUpdate]) {
        acc[key]["upsert"]["create"] =
          application[key as keyof IApplicationUpdate];
        acc[key]["upsert"]["update"] =
          application[key as keyof IApplicationUpdate];
      }
      return acc;
    }, {} as IApplicationUpdate);

    const updatedApplicant = await prisma.applicant.update({
      where: { id: Number(applicantId) },
      data: {
        ...toUpdate,
      },
    });
    updatedApplicant.infoComplete);
    if (!updatedApplicant.infoComplete) {
      const notNullCondition = keys.reduce((acc: any, key) => {
        if (key == "Allotment") {
          return acc;
        }
        acc[key] = {
          isNot: null,
        };
        return acc;
      }, {});

      const exists = await prisma.applicant.count({
        where: {
          id: applicantId,

          ...notNullCondition,
        },
      });
      if (exists > 0) {
        await prisma.applicant.update({
          where: {
            id: applicantId,
          },
          data: {
            infoComplete: true,
          },
        });
      }
    }
    return updatedApplicant;
  } catch (error) {
    console.error("Error updating applicant:", error);
    throw error;
  }
}

export async function createApplicant(
  application: Applicant
): Promise<ApplicantWithoutId> {
  try {
    const applicant: Applicant = await prisma.applicant.create({
      data: {
        ...application,
        id: Number(application.id),
      },
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

export async function getApplicationForm(id: number): Promise<
  | Applicant & {
      ApplicantDetails: ApplicantDetails | null;
      parentDetails: ParentDetails | null;
      permanentAddress: PermanentAddress | null;
      presentAddress: PresentAddress | null;
      Document: Document[];
      matriculationDetails: MatriculationDetails | null;
      guardianAddress: GuardianAddress | null;
      bankDetails: BankDetails | null;
      previousInstitutionDetails: PreviousInstitutionDetails | null;
      qualifyingExaminationDetails: QualifyingExaminationDetails | null;
      Allotment: Allotment[];
    }
> {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: { id: id },
      include: {
        ApplicantDetails: true,
        parentDetails: true,
        permanentAddress: true,
        presentAddress: true,
        Document: true,
        matriculationDetails: true,
        guardianAddress: true,
        bankDetails: true,
        previousInstitutionDetails: true,
        qualifyingExaminationDetails: true,
        Allotment: true,
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

export default {
  updateApplication,
  createApplicant,
  deleteApplicant,
  getApplicants,
  getApplicant,
  getDocumentsForApplicant,
  updateApplicant,
  getApplicationForm,
};
