import { Request, Response, NextFunction } from "express";
import { SheetService } from "../services/sheet.service";
import { ApiError } from "../utils/ApiError";

/**
 * This sheet controller will be used to handle request and response from the server
 */
export class SheetController {
  private readonly sheetService = new SheetService();

  /**
   * GET /sheets?professorId=…&sheetId=…
   */
  public async getSheets(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { professorId, sheetId } = req.query as {
        professorId?: string;
        sheetId?: string;
      };

      let filter: any = {};
      if (professorId && sheetId) {
        // either professorId OR sheetId
        filter = {
          $or: [{ professorId }, { sheetId }],
        };
      } else if (professorId) {
        filter = { professorId };
      } else if (sheetId) {
        filter = { sheetId };
      }

      const sheets = await this.sheetService.getSheets(filter);
      res.json(sheets);
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /sheets/:id
   */
  public async getSheetById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const sheet = await this.sheetService.getSheetById(req.params.id);
      if (!sheet) {
        return next(new ApiError(404, "Sheet not found"));
      }
      res.json(sheet);
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /sheets
   */
  public async createSheet(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const newSheet = await this.sheetService.createSheet(req.body);
      res.status(201).json(newSheet);
    } catch (err: any) {
      if (err.name === "ValidationError") {
        res.status(400).json({ message: err.message, details: err.errors });
      }
      next(err);
    }
  }

  /**
   * PUT /sheets/:id
   */
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
        return next(new ApiError(404, "Sheet not found"));
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
}
