import { Router } from "express";
import applicantRouter from "./routes/applicant.route";
import documentRouter from "./routes/document.route";
import documentTypeRouter from "./routes/documentType.route";
import phaseRouter from "./routes/phase.route";
import adminRouter from "./routes/admin.route";
import { getMetaData } from "./services/phase.services";

const router = Router();

router.get("/meta", async (req, res) => {
  res.json(await getMetaData());
});
router.use("/applicant", applicantRouter);
router.use("/document", documentRouter);
router.use("/document-type", documentTypeRouter);
router.use("/phase", phaseRouter);
router.use("/admin", adminRouter);
export default router;
