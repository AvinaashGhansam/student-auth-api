import { SheetModel } from "../models/sheet.model";
import { Sheet } from "../types";

export class SheetService {
  public async createSheet(data: Sheet): Promise<Sheet> {
    return SheetModel.create(data);
  }

  public async getAllSheet(): Promise<Sheet[]> {
    return SheetModel.find().sort({ dateCreated: -1 });
  }

  public async getSheetById(id: string): Promise<Sheet | null> {
    return SheetModel.findById(id);
  }

  public async getSheetByProfessorId(professorId: string): Promise<Sheet[]> {
    return SheetModel.find({ professorId });
  }

  public async updateSheet(
    id: string,
    data: Partial<Sheet>,
  ): Promise<Sheet | null> {
    return SheetModel.findByIdAndUpdate(id, data, { new: true });
  }
}
