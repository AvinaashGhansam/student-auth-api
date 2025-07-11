import { Request, Response, NextFunction } from "express";
import { SheetService } from "../services/sheet.service";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError";
import { logger } from "../utils/logger";

export class SheetController {
  /**
   * An instance of SheetService to handle business logic for sheets.
   */
  private service = new SheetService();

  /**
   * Retrieves attendance sheets, optionally filtered by professorId or sheetId.
   *
   * @param req - Express request object, expects optional query params: professorId, sheetId
   * @param res - Express response object
   * @param next - Express next middleware function
   */
  async getSheets(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Fetching attendance sheets", { query: req.query });
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
      logger.info(`Fetched ${sheets.length} sheets`);
      res.json(sheets);
    } catch (err) {
      logger.error("Error fetching sheets", err);
      next(err);
    }
  }

  /**
   * Get attendance sheet by id
   * @param req - Express request object, expects optional query params: professorId, sheetId
   * @param res - Express response object
   * @param next - Express next middleware function
   */
  async getSheetById(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Fetching sheet by id", { params: req.params });
      const { _id } = req.params;
      let sheet;
      if (mongoose.Types.ObjectId.isValid(_id)) {
        sheet = await this.service.getSheetById(_id);
      } else {
        sheet = await this.service.getSheetByReportId(_id);
      }
      if (!sheet) {
        logger.warn("Sheet not found", { id: _id });
        throw new ApiError(404, "Sheet not found", { id: _id });
      }
      logger.info("Sheet found", { sheet });
      res.json(sheet);
    } catch (err) {
      logger.error("Error fetching sheet by id", err);
      next(err);
    }
  }

  /**
   * Create an attendance sheet
   * @param req - Express request object, expects optional query params: professorId, sheetId
   * @param res - Express response object
   * @param next - Express next middleware function
   */
  async createSheet(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Creating a new sheet", { body: req.body });
      const sheet = await this.service.createSheet(req.body);
      logger.info("Sheet created", { sheet });
      res.status(201).json(sheet);
    } catch (err) {
      logger.error("Error creating sheet", err);
      next(err);
    }
  }

  /**
   * Update the attendance sheet
   * @param req - Express request object, expects optional query params: professorId, sheetId
   * @param res - Express response object
   * @param next - Express next middleware function
   */
  async updateSheet(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Updating sheet", { id: req.params._id, body: req.body });
      const sheet = await this.service.updateSheet(req.params._id, req.body);
      if (!sheet) {
        logger.warn("Sheet not found for update", { id: req.params._id });
        throw new ApiError(404, "Sheet not found", { id: req.params._id });
      }
      logger.info("Sheet updated", { sheet });
      res.json(sheet);
    } catch (err) {
      logger.error("Error updating sheet", err);
      next(err);
    }
  }

  /**
   * Delete the attendance sheet
   * @param req - Express request object, expects optional query params: professorId, sheetId
   * @param res - Express response object
   * @param next - Express next middleware function
   */
  async deleteSheet(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Deleting sheet", { id: req.params._id });
      const { _id } = req.params;
      let result;
      if (mongoose.Types.ObjectId.isValid(_id)) {
        result = await this.service.deleteSheet(_id);
      } else {
        result = await this.service.deleteSheetByReportId(_id);
      }
      if (!result) {
        logger.warn("Sheet not found for deletion", { id: _id });
        throw new ApiError(404, "Sheet not found", { id: _id });
      }
      logger.info("Sheet deleted", { id: _id });
      res.status(204).end();
    } catch (err) {
      logger.error("Error deleting sheet", err);
      next(err);
    }
  }
}
