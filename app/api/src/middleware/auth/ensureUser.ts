import { Request, Response, NextFunction } from "express";

const ensureUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export default ensureUser;
