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
    >`Select * from active_allotments`;
    console.log(activeAllotments);
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
    console.log(allotmentCount);
    return allotmentCount;
  } catch (error) {
    console.error("Error getting count:", error);
    throw error;
  }
}
