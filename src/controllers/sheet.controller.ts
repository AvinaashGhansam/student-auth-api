// src/controllers/sheet.controller.ts
import { Request, Response, NextFunction } from "express";
import { SheetService } from "../services/sheet.service";
import { ApiError } from "../utils/ApiError";

export class SheetController {
  private readonly sheetService = new SheetService();

  public async getAllSheets(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const sheets = await this.sheetService.getAllSheet();
      res.json(sheets);
    } catch (err) {
      next(err);
    }
  }

  public async getSheetById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const sheet = await this.sheetService.getSheetById(req.params.id);
      if (!sheet) {
        next(new ApiError(404, "Sheet not found"));
        return;
      }
      res.json(sheet);
    } catch (err) {
      next(err);
    }
  }

  public async createSheet(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const newSheet = await this.sheetService.createSheet(req.body);
      // TODO: Check for duplicates
      res.status(201).json(newSheet);
    } catch (err: any) {
      if (err.name === "ValidationError") {
        res.status(400).json({ message: err.message, details: err.errors });
        return;
      }
      next(err);
    }
  }

  public async updateSheet(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const updated = await this.sheetService.updateSheet(
        req.params.id,
        req.body,
      );
      if (!updated) {
        next(new ApiError(404, "Sheet not found"));
        return;
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  public async getSheetsByProfessorId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { professorId } = req.params;
      const sheets = await this.sheetService.getSheetByProfessorId(professorId);
      res.json(sheets);
    } catch (err) {
      next(err);
    }
  }
}
