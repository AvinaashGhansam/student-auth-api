import { Request, Response, NextFunction } from "express";
import { SheetService } from "../services/sheet.service";
import mongoose from "mongoose";

export class SheetController {
  private service = new SheetService();

  async getSheets(req: Request, res: Response, next: NextFunction) {
    try {
      const { professorId, sheetId } = req.query;
      const filters: any = {};
      if (professorId) filters.createdBy = professorId;
      if (sheetId) {
        if (mongoose.Types.ObjectId.isValid(sheetId as string)) {
          filters._id = sheetId;
        } else {
          filters.reportId = sheetId;
        }
      }
      const sheets = await this.service.getSheets(filters);
      res.json(sheets);
    } catch (err) {
      next(err);
    }
  }

  async getSheetById(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.params;
      let sheet;
      if (mongoose.Types.ObjectId.isValid(_id)) {
        sheet = await this.service.getSheetById(_id);
      } else {
        // Try to find by reportId if not a valid ObjectId
        sheet = await this.service.getSheetByReportId(_id);
      }
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
      const { _id } = req.params;
      let result;
      if (mongoose.Types.ObjectId.isValid(_id)) {
        result = await this.service.deleteSheet(_id);
      } else {
        // Try deleting by reportId if not a valid ObjectId
        result = await this.service.deleteSheetByReportId(_id);
      }
      if (!result) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}
