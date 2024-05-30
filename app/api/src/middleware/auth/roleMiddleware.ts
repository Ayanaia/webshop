import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const requireSellerRole = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  if (user && user.role === "seller") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Forbidden: Only sellers can perform this action" });
  }
};
