import SheetModel, { ISheet } from "../models/sheet.model";

export class SheetService {
  createSheet(data: Partial<ISheet>) {
    return SheetModel.create(data);
  }

  getSheets() {
    return SheetModel.find().lean().exec();
  }

  getSheetById(id: string) {
    return SheetModel.findById(id).lean().exec();
  }

  updateSheet(id: string, data: Partial<ISheet>) {
    return SheetModel.findByIdAndUpdate(id, data, { new: true }).lean().exec();
  }

  deleteSheet(id: string) {
    return SheetModel.findByIdAndDelete(id).exec();
  }
}
