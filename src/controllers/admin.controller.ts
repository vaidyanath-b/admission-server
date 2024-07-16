import {
  getActiveApplications,
  getAllotmentCount,
  getApplicantsWithPhaseStatus,
} from "../services/admin.services";
import { Request, Response } from "express";
import { DocumentWithFile, IApplicationUpdate } from "../types";
import prisma from "../../prisma/prisma.client";
import { updateApplication } from "../services/applicant.services";
import { Course, Quota } from "@prisma/client";
import documentFns from "../services/document.services";
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
  req: Request<{ applicantId: number }, {}, IApplicationUpdate>,
  res: Response
) => {
  const userId = req.user_id;
  if (!userId) {
    return res.status(401).json("Not authorized");
  }
  const { applicantId } = req.params;
  const applicantInfo = await prisma.applicant.findUnique({
    where: {
      id: Number(applicantId),
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

export async function updateMemoByIDController(
  req: Request<
    any,
    {},
    {
      course: Course;
      quota: Quota;
      allotment: string;
    }
  >,
  res: Response
) {
  try {
    const userId = req.user_id;
    if (!userId) {
      return res.status(401).json({ message: "User ID not found in request" });
    }
    const file = req.file;
    const { applicantId } = req.params;
    if (!file) {
      return res.status(400).json({ message: "Missing document file" });
    }

    const { course, quota, allotment } = req.body;

    const document = await documentFns.updateMemo({
      file,
      applicantId: Number(applicantId),
      course,
      allotment: Number(allotment),
      quota,
    });
    res.json(document);
  } catch (error) {
    console.error("Error updating memo:", error);
    res.status(500).json({ message: "Error updating memo" });
  }
}

export async function createDocumentByIDController(
  req: Request,
  res: Response
) {
  try {
    const userId = req.user_id;
    if (!userId) {
      return res.status(401).json({ message: "User ID not found in request" });
    }

    // if (user.id !== req.body.applicantId) {
    //   return res.status(401).json({
    //     message: "User not authorized to create document for this applicant",
    //   });
    // }
    const { code, applicantId } = req.params;
    const file = req.file;

    if (!file) {
      "file", file);
      return res.status(400).json({ message: "Missing document file" });
    }

    const document: DocumentWithFile = await documentFns.createDocument(
      file,
      Number(applicantId),
      code
    );
    res.json(document);
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ message: "Error creating document" });
  }
}
