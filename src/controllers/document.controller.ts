import { Request, Response } from "express";

import documentFns from "../services/document.services";
import { DocumentWithFile } from "../types";

export async function createDocumentController(
  req: Request<{ applicantId: number; documentTypeCode: string }>,
  res: Response
) {
  try {
    const { applicantId, documentTypeCode } = req.body;
    const file = req.file;

    if (!file) {
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

export async function createVerificationWithoutReuploadController(
  req: Request<any>,
  res: Response
) {
  try {
    const {
      applicantId,
      documentTypeCode,
      verifierId,
      phaseId,
      verification,
      remark,
    } = req.body;
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
};
