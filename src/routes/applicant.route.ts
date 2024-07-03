import { Router } from "express";

import applicantController from "../controllers/applicant.controller";

const router = Router();

router.get("/", applicantController.getApplicantsController);
router.get("/:id", applicantController.getApplicantController);
router.post("/", applicantController.createApplicantController);
router.delete("/:id", applicantController.deleteApplicantController);
router.put("/:id", applicantController.updateApplicantController);
router.get(
  "/:id/documents",
  applicantController.getDocumentsForApplicantController
);

export default router;
