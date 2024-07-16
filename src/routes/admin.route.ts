import { Router } from "express";
import {
  createDocumentByIDController,
  getActiveApplicationsController,
  getAllotmentCountController,
  getApplicantsWithPhaseStatusController,
  updateApplicationByIDController,
  updateMemoByIDController,
} from "../controllers/admin.controller";
import { getApplicationByIDController } from "../controllers/applicant.controller";
import upload from "../middleware/multer.middleware";
import { parseApplicantId } from "../middleware/parse.middleware";
const router = Router();

router.get("/", (req, res) => {
  res.send("admin page !");
});

router.get("/applications", getActiveApplicationsController);
router.get("/allotment-count", getAllotmentCountController);
router.get("/verification-list", getApplicantsWithPhaseStatusController);
router.get("/applicant/:applicantId", getApplicationByIDController);
router.post("/applicant/:applicantId", updateApplicationByIDController);
router.post(
  "/document/:code/:applicantId",
  upload.single("file"),
  createDocumentByIDController
);
router.post(
  "/document/allotment/memo/:applicantId",
  upload.single("file"),
  updateMemoByIDController
);

export default router;
