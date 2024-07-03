import { Router } from "express";
import applicantRouter from "./routes/applicant.route";
import documentRouter from "./routes/document.route";
import documentTypeRouter from "./routes/documenttype.route";
import phaseRouter from "./routes/phase.route";

const router = Router();

router.use("/applicant", applicantRouter);
router.use("/document", documentRouter);
router.use("/document-type", documentTypeRouter);
router.use("/phase", phaseRouter);

export default router;
