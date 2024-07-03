import { Router } from "express";
const router = Router();
import documentTypeController from "../controllers/documentType.controller";

router.get("/", documentTypeController.getDocumentTypesController);
router.get("/:code", documentTypeController.getDocumentTypeController);
router.post("/", documentTypeController.createDocumentTypeController);
router.delete("/:code", documentTypeController.deleteDocumentTypeController);
router.put("/:code", documentTypeController.updateDocumentTypeController);


export default router;
