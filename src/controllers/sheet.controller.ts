import { Request, Response, NextFunction } from "express";
import { SheetService } from "../services/sheet.service";

export class SheetController {
  private service = new SheetService();

  async getSheets(req: Request, res: Response, next: NextFunction) {
    try {
      const sheets = await this.service.getSheets();
      res.json(sheets);
    } catch (err) {
      next(err);
    }
  }

  async getSheetById(req: Request, res: Response, next: NextFunction) {
    try {
      const sheet = await this.service.getSheetById(req.params._id);
      if (!sheet) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(sheet);
    } catch (err) {
      next(err);
    }
  }

  async createSheet(req: Request, res: Response, next: NextFunction) {
    try {
      const sheet = await this.service.createSheet(req.body);
      res.status(201).json(sheet);
    } catch (err) {
      next(err);
    }
  }

  async updateSheet(req: Request, res: Response, next: NextFunction) {
    try {
      const sheet = await this.service.updateSheet(req.params._id, req.body);
      if (!sheet) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(sheet);
    } catch (err) {
      next(err);
    }
  }

  async deleteSheet(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.deleteSheet(req.params._id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}
