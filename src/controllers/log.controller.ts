import { Request, Response, NextFunction } from "express";
import { LogService } from "../services/log.service";

export class LogController {
  private service = new LogService();

  async getLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const logs = await this.service.getLogs();
      res.json(logs);
    } catch (err) {
      next(err);
    }
  }

  async createLog(req: Request, res: Response, next: NextFunction) {
    try {
      const log = await this.service.createLog(req.body);
      res.status(201).json(log);
    } catch (err) {
      next(err);
    }
  }
}
