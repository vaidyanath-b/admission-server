import { Request, Response, NextFunction } from "express";

export const parseApplicantId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { applicantId } = req.params;
  const parsedId = Number(applicantId);
  if (isNaN(parsedId)) {
    return res.status(400).json({ message: "Invalid applicantId" });
  }
  req.params.applicantId = parsedId as any; // Type assertion to any, to be handled by the controller
  next();
};
