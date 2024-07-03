import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { DecodedToken } from "../types";
import { JWT_SECRET_KEY } from "../utils/env";

import {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from "../utils/error";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    throw new UnauthorizedError("Missing authorization header");
  }

  const tokenParts = authorizationHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    throw new UnauthorizedError("Invalid authorization header format");
  }

  const token = tokenParts[1];
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    // req.userId = decodedToken.user_id;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new UnauthorizedError("Token expired");
    }

    throw new UnauthorizedError("Invalid token");
  }
}
