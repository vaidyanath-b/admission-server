import {
  getActiveApplications,
  getAllotmentCount,
} from "../services/admin.services";
import { Request, Response } from "express";
export const getActiveApplicationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const activeApplications = await getActiveApplications();
    res.status(200).json(activeApplications);
  } catch (error) {
    console.error("Error getting active applications:", error);
    res.status(500).json({ message: "Error getting active applications" });
  }
};

export const getAllotmentCountController = async (
  req: Request,
  res: Response
) => {
  try {
    const allotmentCount = await getAllotmentCount();
    res.status(200).json(allotmentCount);
  } catch (error) {
    console.error("Error getting allotment count:", error);
    res.status(500).json({ message: "Error getting allotment count" });
  }
};
