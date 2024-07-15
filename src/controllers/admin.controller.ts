import {
  getActiveApplications,
  getAllotmentCount,
  getApplicantsWithPhaseStatus,
} from "../services/admin.services";
import { Request, Response } from "express";
import { IApplicationUpdate } from "../types";
import prisma from "../../prisma/prisma.client";
import { updateApplication } from "../services/applicant.services";
export const getActiveApplicationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const activeApplications = await getActiveApplications();
    res.status(200).json(activeApplications);
  } catch (error) {
    console.error("Error getting active applications:", error);
    res.status(500).json({ message: "Error getting active applications" });
  }
};

export const getAllotmentCountController = async (
  req: Request,
  res: Response
) => {
  try {
    const allotmentCount = await getAllotmentCount();
    res.status(200).json(allotmentCount);
  } catch (error) {
    console.error("Error getting allotment count:", error);
    res.status(500).json({ message: "Error getting allotment count" });
  }
};

export const updateApplicationByIDController = async (
  req: Request<{}, {}, IApplicationUpdate>,
  res: Response
) => {
  const userId = req.user_id;
  if (!userId) {
    return res.status(401).json("Not authorized");
  }
  const applicantInfo = await prisma.applicant.findUnique({
    where: {
      userId,
    },
  });
  if (!applicantInfo) {
    return res.status(401).json("No applicant found");
  }

  const application = req.body;

  const updatedApplicant = await updateApplication(
    applicantInfo.id,
    application
  );
  return res.status(200).json(updatedApplicant);
};

export const getApplicantsWithPhaseStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getApplicantsWithPhaseStatus();
    res.status(200).json(data);
  } catch (err) {
    console.error("error getting phasestatus", err);
    res.status(500).json({ message: "error getting data" });
  }
};
