import { Request, Response } from "express";

import phaseFns from "../services/phase.services";
import { Phase, DocumentType } from "../types";

export async function createPhaseController(
  req: Request<{}, {}, Phase & { documentsRequired: DocumentType[] }>,
  res: Response
) {
  try {
    const { name, order, description, documentsRequired } = req.body;
    const phase = await phaseFns.createPhase(
      name,
      order,
      description,
      documentsRequired
    );
    res.json(phase);
  } catch (error) {
    console.error("Error creating phase:", error);
    res.status(500).json({ message: "Error creating phase" });
  }
}
export async function deletePhaseController(
  req: Request<{ order: number }>,
  res: Response
) {
  try {
    const { order } = req.params;
    await phaseFns.deletePhase(Number(order));
    res.json({ message: "Phase deleted successfully" });
  } catch (error) {
    console.error("Error deleting phase:", error);
    res.status(500).json({ message: "Error deleting phase" });
  }
}

export async function addDocumentToPhaseController(
  req: Request<{ order: number; documentType: string }>,
  res: Response
) {
  try {
    const { order, documentType } = req.params;
    await phaseFns.insertDocumentTypeToPhase(order, documentType);
    res.json({ message: "Document added to phase successfully" });
  } catch (error) {
    console.error("Error adding document to phase:", error);
    res.status(500).json({ message: "Error adding document to phase" });
  }
}

export async function getPhasesController(req: Request, res: Response) {
  try {
    const phases = await phaseFns.getPhases();
    res.json(phases);
  } catch (error) {
    console.error("Error getting phases:", error);
    res.status(500).json({ message: "Error getting phases" });
  }
}

export async function getPhaseController(
  req: Request<{ order: number }>,
  res: Response
) {
  try {
    const { order } = req.params;
    const phase = await phaseFns.getPhase(Number(order));
    res.json(phase);
  } catch (error) {
    console.error("Error getting phase:", error);
    res.status(500).json({ message: "Error getting phase" });
  }
}

export async function updatePhaseController(
  req: Request<
    { order: number },
    {},
    {
      name: string;
      description: string;
      documentsRequired: DocumentType[];
    }
  >,
  res: Response
) {
  try {
    const { order } = req.params;
    const { name, description, documentsRequired } = req.body;
    const phase = await phaseFns.updatePhase(
      Number(order),
      name,
      description,
      documentsRequired
    );
    res.json(phase);
  } catch (error) {
    console.error("Error updating phase:", error);

    res.status(500).json({ message: "Error updating phase" });
  }
}

export async function getApplicantsInCurrentPhaseController(
  req: Request<{ order: number }>,
  res: Response
) {
  try {
    const { order } = req.params;
    const phase = await phaseFns.getApplicantsInCurrentPhase(Number(order));
    res.json(phase);
  } catch (error) {
    console.error("Error getting applicants in phase:", error);

    res.status(500).json({ message: "Error getting applicants in phase" });
  }
}

export async function getApplicantPhaseDocumentsController(
  req: Request<{ order: number; applicantId: number }>,
  res: Response
) {
  try {
    const { order, applicantId } = req.params;
    const applicantPhaseDocs = await phaseFns.getApplicantPhaseDocuments(
      Number(order),
      Number(applicantId)
    );
    res.json(applicantPhaseDocs);
  } catch (error) {
    console.error("Error getting applicant phase documents:", error);

    res
      .status(500)
      .json({ message: "Error getting applicant phase documents" });
  }
}
export async function removeDocumentFromPhaseController(
  req: Request<{ order: number; documentType: string }>,
  res: Response
) {
  try {
    const { order, documentType } = req.params;
    await phaseFns.removeDocumentFromPhase(order, documentType);
    res.json({ message: "Document removed from phase successfully" });
  } catch (error) {
    console.error("Error removing document from phase:", error);
    res.status(500).json({ message: "Error removing document from phase" });
  }
}

export default {
  createPhaseController,
  deletePhaseController,
  getPhasesController,
  getPhaseController,
  updatePhaseController,
  getApplicantsInCurrentPhaseController,
  getApplicantPhaseDocumentsController,
  addDocumentToPhaseController,
  removeDocumentFromPhaseController,
};
