import { Request, Response } from "express";

import applicantFns from "../services/applicant.services";
import { Applicant, ApplicantWithoutId } from "../types";

export async function createApplicantController(
  req: Request<{}, {}, Applicant>,
  res: Response
) {
  try {
    const application = req.body;
    const applicant = await applicantFns.createApplicant(application);
    res.json(applicant);
  } catch (error) {
    console.error("Error creating applicant:", error);
    res.status(500).json({ message: "Error creating applicant" });
  }
}

export async function deleteApplicantController(
  req: Request<{ id: number }>,
  res: Response
) {
  try {
    const { id } = req.params;
    await applicantFns.deleteApplicant(id);
    res.json({ message: "Applicant deleted successfully" });
  } catch (error) {
    console.error("Error deleting applicant:", error);
    res.status(500).json({ message: "Error deleting applicant" });
  }
}

export async function getApplicantsController(req: Request, res: Response) {
  try {
    const applicants = await applicantFns.getApplicants();
    res.json(applicants);
  } catch (error) {
    console.error("Error getting applicants:", error);
    res.status(500).json({ message: "Error getting applicants" });
  }
}

export async function getApplicantController(
  req: Request<{ id: number }>,
  res: Response
) {
  try {
    const { id } = req.params;
    const applicant = await applicantFns.getApplicant(id);
    res.json(applicant);
  } catch (error: any) {
    console.error("Error getting applicant:", error);
    if (error.message === "Applicant not found") {
      res.status(404).json({ message: "Applicant not found" });
    } else {
      res.status(500).json({ message: "Error getting applicant" });
    }
  }
}

export async function getDocumentsForApplicantController(
  req: Request<{ id: number }>,
  res: Response
) {
  try {
    const { id } = req.params;
    const applicant = await applicantFns.getDocumentsForApplicant(id);
    res.json(applicant);
  } catch (error: any) {
    console.error("Error getting applicant documents:", error);
    if (error.message === "Applicant not found") {
      res.status(404).json({ message: "Applicant not found" });
    } else {
      res.status(500).json({ message: "Error getting applicant documents" });
    }
  }
}

export async function updateApplicantController(
  req: Request<{ id: number }, {}, Applicant>,
  res: Response
) {
  try {
    const { id } = req.params;
    const application = req.body;
    const applicant = await applicantFns.updateApplicant(id, application);
    res.json(applicant);
  } catch (error: any) {
    console.error("Error updating applicant:", error);
    if (error.message === "Applicant not found") {
      res.status(404).json({ message: "Applicant not found" });
    } else {
      res.status(500).json({ message: "Error updating applicant" });
    }
  }
}

export default {
  createApplicantController,
  deleteApplicantController,
  getApplicantsController,
  getApplicantController,
  getDocumentsForApplicantController,
  updateApplicantController,
};
