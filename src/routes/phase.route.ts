import { Router } from "express";
import controller from "../controllers/phase.controller";

const router = Router();

router.get("/", controller.getPhasesController);
router.get("/:order", controller.getPhaseController);
router.post("/", controller.createPhaseController);
router.delete("/:order", controller.deletePhaseController);
router.put("/:order", controller.updatePhaseController);
router.get(
  "/:order/applicants",
  controller.getApplicantsInCurrentPhaseController
);

router.post("/:order/:documentType", controller.addDocumentToPhaseController);
router.delete(
  "/:order/:documentType",
  controller.removeDocumentFromPhaseController
);
router.get(
  "/:order/applicants/:applicantId",
  controller.getApplicantPhaseDocumentsController
);
export default router;
