import { Router } from "express";
import {
  getActiveApplicationsController,
  getAllotmentCountController,
} from "../controllers/admin.controller";
const router = Router();

router.get("/", (req, res) => {
  res.send("admin page !");
});

router.get("/applications", getActiveApplicationsController);
router.get("/allotment-count", getAllotmentCountController);

export default router;
