import prisma from "../../prisma/prisma.client";

interface IActiveApplications {
  name: string;
  applicantId: number;
  course: string;
  quota: string;
  allotment: number;
}

interface IAllotmentCount {
  course: string;
  quota: string;
  count: number;
  seats: number;
}
export async function getActiveApplications(): Promise<IActiveApplications[]> {
  try {
    const activeAllotments = await prisma.$queryRaw<
      IActiveApplications[]
    >`Select *  from active_allotments`;

    return activeAllotments;
  } catch (error) {
    console.error("Error getting count:", error);
    throw error;
  }
}

export async function getAllotmentCount(): Promise<IAllotmentCount[]> {
  try {
    const allotmentCount = await prisma.$queryRaw<IAllotmentCount[]>`
        SELECT course, quota, CAST(count AS VARCHAR) as count from allotmentCount`;

    return allotmentCount;
  } catch (error) {
    console.error("Error getting count:", error);
    throw error;
  }
}

export async function getApplicantsWithPhaseStatus(): Promise<any> {
  try {
    const phaseDocuments = await prisma.phaseDocument.findMany();
    const applicantsWithVerifiedDocs = await prisma.applicant.findMany({
      select: {
        id: true,
        currentPhaseId: true,
        firstName: true,
        lastName: true,
        Allotment: {
          select: {
            course: true,
            quota: true,
            allotmentMemoLink: true,
            verified: true,
          },
          orderBy: {
            allotment: "desc",
          },
          take: 1,
        },
        Document: {
          select: {
            documentTypeCode: true,
            filename: true,
            DocumentUpdate: {
              select: {
                verification: true,
                phaseId: true,
              },
            },
          },
        },
      },
    });

    return { phaseDocuments, applicantsData: applicantsWithVerifiedDocs };
  } catch (error) {
    console.error("Error getting count:", error);
    throw error;
  }
}
