import { Request, Response, NextFunction } from "express";
import { LogService } from "../services/log.service";
import { logger } from "../utils/logger";

/**
 * LogController handles HTTP requests related to student log entries.
 * It provides endpoints to retrieve and manage logs of students signing into classrooms.
 *
 * Methods:
 *   - getLogs: Retrieves all log entries.
 *   - (other methods may be present for creating, updating, or deleting logs)
 *
 * Dependencies:
 *   - LogService: Contains business logic for log management.
 */

export class LogController {
  /**
   * An instance of log service
   * @private service holds the business logic of logging students into a class
   */
  private service = new LogService();

  /**
   * Get all logs
   * @param req
   * @param res
   * @param next
   */
  async getLogs(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Fetching all logs");
      const logs = await this.service.getLogs();
      logger.info(`Fetched ${logs.length} logs`);
      res.json(logs);
    } catch (err) {
      logger.error("Error fetching logs", err);
      next(err);
    }
  }

  /**
   * Creating a log (student sign-in form)
   * @param req
   * @param res
   * @param next
   */
  async createLog(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Creating a new log entry", { body: req.body });
      const log = await this.service.createLog(req.body);
      logger.info("Log entry created", { log });
      res.status(201).json(log);
    } catch (err) {
      logger.error("Error creating log entry", err);
      next(err);
    }
  }
}
