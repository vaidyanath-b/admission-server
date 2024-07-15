import { Router } from "express";

import applicantController from "../controllers/applicant.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const router = Router();

router.get("/", applicantController.getApplicationController);
router.post("/", applicantController.updateApplicationController);
router.get("/all", applicantController.getApplicantsController);
router.post("/new", applicantController.createApplicantController);
router.get("/:id", applicantController.getApplicantController);
router.delete("/:id", applicantController.deleteApplicantController);
router.put("/:id", applicantController.updateApplicantController);
router.get(
  "/:id/documents",
  applicantController.getDocumentsForApplicantController
);

export default router;
