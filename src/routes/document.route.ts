import { Router } from "express";

import documentController from "../controllers/document.controller";

const router = Router();

router.post("/document", documentController.createDocumentController);
router.post(
  "/document/upload",
  documentController.uploadDocumentToPhaseController
);
router.post(
  "/document/verification",
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