// src/middleware/auth/roleMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const requireSellerRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req as AuthRequest;

  if (user?.role !== "seller") {
    return res.status(403).send("Only sellers can perform this action.");
  }

  next();
};
