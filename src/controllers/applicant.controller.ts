import { Request, Response } from "express";

import applicantFns from "../services/applicant.services";
import { Applicant, ApplicantWithoutId, IApplicationUpdate } from "../types";
import { ApplicantDetails } from "@prisma/client";

export async function getApplicationController(req: Request, res: Response) {
  try {
    console.log("req.user_id", req.user_id);
    const id = req.user_id;
    if (!id) {
      throw new Error("User ID not found in request");
    }
    const application = await applicantFns.getApplicationForm(id);
    res.json(application).status(200);
  } catch (error: any) {
    console.error("Error getting application:", error);
    if (error.message === "Application not found") {
      res.status(404).json({ message: "Application not found" });
    } else {
      res.status(500).json({ message: "Error getting application" });
    }
  }
}
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

export async function updateApplicationController(
  req: Request<{}, {}, IApplicationUpdate>,
  res: Response
) {
  try {
    console.log("req.user_id", req.user_id);
    const { user_id } = req;
    if (!user_id) {
      throw new Error("User ID not found in request");
    }
    const application = req.body;
    const applicant = await applicantFns.updateApplication(
      user_id,
      application
    );
    res.json(applicant);
  } catch (error: any) {
    console.error("Error updating application:", error);
    if (error.message === "Application not found") {
      res.status(404).json({ message: "Application not found" });
    } else {
      res.status(500).json({ message: "Error updating application" });
    }
  }
}

export default {
  updateApplicationController,
  createApplicantController,
  deleteApplicantController,
  getApplicantsController,
  getApplicantController,
  getDocumentsForApplicantController,
  updateApplicantController,
  getApplicationController,
};
