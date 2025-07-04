import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

/**
 * This middleware will be used to handle errors
 */
export class ErrorHandler {
  public handle(err: any, req: Request, res: Response, next: NextFunction) {
    logger.error(err.stack);
    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong!";
    res.status(status).json({ error: message });
  }
}

export const errorHandler = new ErrorHandler();
