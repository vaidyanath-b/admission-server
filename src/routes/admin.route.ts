import { Router } from "express";
import {
  getActiveApplicationsController,
  getAllotmentCountController,
  getApplicantsWithPhaseStatusController,
} from "../controllers/admin.controller";
import { getApplicationByIDController } from "../controllers/applicant.controller";
const router = Router();

router.get("/", (req, res) => {
  res.send("admin page !");
});

router.get("/applications", getActiveApplicationsController);
router.get("/allotment-count", getAllotmentCountController);
router.get("/verification-list", getApplicantsWithPhaseStatusController);
router.get("/applicant/:applicantId", getApplicationByIDController);

export default router;
