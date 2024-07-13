import { Router } from "express";

import documentController from "../controllers/document.controller";
import upload from "../middleware/multer.middleware";

const router = Router();

router.post(
  "/memo",
  upload.single("file"),
  documentController.updateMemoController
);
router.post(
  "/:documentTypeCode",
  upload.single("file"),
  documentController.createDocumentController
);

router.post("/upload", documentController.uploadDocumentToPhaseController);
router.post(
  "/verification",
  documentController.createVerificationWithoutReuploadController
);

router.get(
  "/verification/:applicantId",
  documentController.getVerificationForApplicantIdController
);

router.get(
  "/:applicantId",
  documentController.getDocumentByApplicantIdController
);

export default router;
