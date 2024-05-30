import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";
import { Error as MongooseError } from "mongoose"; // Aliasing the import

export const errorHandler = (
  err: MongooseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MongooseError.ValidationError) {
    return res.status(400).json({
      message: err.message,
      error: err.message,
    });
  }

  // Custom app errors
  if (err instanceof AppError) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({
      message,
    });
  }

  // Unknown errors
  res.status(500).json({
    message: err.message ?? "Internal Server Error",
  });
};
``;
