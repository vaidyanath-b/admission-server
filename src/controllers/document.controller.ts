import { Request, Response } from "express";

import documentFns from "../services/document.services";
import { DocumentWithFile } from "../types";
import prisma from "../../prisma/prisma.client";
import { Course, Quota } from "@prisma/client";

export async function createDocumentController(
  req: Request<{ documentTypeCode: string }>,
  res: Response
) {
  try {
    const userId = req.user_id;
    if (!userId) {
      return res.status(401).json({ message: "User ID not found in request" });
    }
    const user = await prisma.applicant.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // if (user.id !== req.body.applicantId) {
    //   return res.status(401).json({
    //     message: "User not authorized to create document for this applicant",
    //   });
    // }
    const applicantId = user.id;
    const { documentTypeCode } = req.params;
    const file = req.file;

    if (!file) {
      console.log("file", file);
      return res.status(400).json({ message: "Missing document file" });
    }

    const document: DocumentWithFile = await documentFns.createDocument(
      file,
      applicantId,
      documentTypeCode
    );
    res.json(document);
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ message: "Error creating document" });
  }
}

export async function uploadDocumentToPhaseController(
  req: Request<any>,
  res: Response
) {
  try {
    const { applicantId, documentTypeCode, phaseId, verifierId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Missing document file" });
    }

    const document = await documentFns.uploadDocumentToPhase(
      file,
      applicantId,
      documentTypeCode,
      phaseId,
      verifierId
    );
    res.json(document);
  } catch (error) {
    console.error("Error uploading document to phase:", error);
    res.status(500).json({ message: "Error uploading document to phase" });
  }
}
export async function updateMemoController(
  req: Request<
    {},
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
    const user = await prisma.applicant.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const applicantId = user.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Missing document file" });
    }

    const { course, quota, allotment } = req.body;

    const document = await documentFns.updateMemo({
      file,
      applicantId,
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

export async function createVerificationWithoutReuploadController(
  req: Request,
  res: Response
) {
  try {
    const verifierId = req.user_id;
    if (!verifierId) {
      return res.status(404).json("Unauthorized");
    }
    const { applicantId, documentTypeCode, phaseId, verification, remark } =
      req.body;
    const document = await documentFns.createVerificationWithoutReupload(
      applicantId,
      documentTypeCode,
      verifierId,
      phaseId,
      verification,
      remark
    );
    res.json(document);
  } catch (error) {
    console.error("Error creating verification:", error);
    res.status(500).json({ message: "Error creating verification" });
  }
}

export async function getDocumentByApplicantIdController(
  req: Request<{ applicantId: number }>,
  res: Response
) {
  try {
    const { applicantId } = req.params;
    const documents = await documentFns.getDocumentByApplicantId(applicantId);
    res.json(documents);
  } catch (error) {
    console.error("Error getting documents for applicant:", error);
    res.status(500).json({ message: "Error getting documents for applicant" });
  }
}

export async function getVerificationForApplicantIdController(
  req: Request<{ applicantId: number }>,
  res: Response
) {
  try {
    const { applicantId } = req.params;
    const verifications = await documentFns.getVerificationForApplicantId(
      applicantId
    );
    res.json(verifications);
  } catch (error) {
    console.error("Error getting verifications for applicant:", error);
    res
      .status(500)
      .json({ message: "Error getting verifications for applicant" });
  }
}

export default {
  createDocumentController,
  uploadDocumentToPhaseController,
  createVerificationWithoutReuploadController,
  getDocumentByApplicantIdController,
  getVerificationForApplicantIdController,
  updateMemoController,
};
