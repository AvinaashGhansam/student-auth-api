// src/services/sheet.service.ts
import { SheetModel } from "../models/sheet.model";
import { Sheet } from "../types";

export class SheetService {
  /**
   * Create a new sheet
   */
  public async createSheet(data: Sheet): Promise<Sheet> {
    return SheetModel.create(data);
  }

  /**
   * Retrieve sheets matching any combination of filters.
   * If filter is empty, returns all sheets.
   */
  public async getSheets(
    filter: Partial<Pick<Sheet, "professorId" | "sheetId">>,
  ): Promise<Sheet[]> {
    return SheetModel.find(filter).sort({ dateCreated: -1 }).lean().exec();
  }

  /**
   * Lookup by Mongo document _id
   */
  public async getSheetById(id: string): Promise<Sheet | null> {
    return SheetModel.findById(id).lean().exec();
  }

  /**
   * Update an existing sheet by _id
   */
  public async updateSheet(
    id: string,
    data: Partial<Sheet>,
  ): Promise<Sheet | null> {
    return SheetModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
  }
}
