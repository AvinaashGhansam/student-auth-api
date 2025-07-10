import SheetModel, { ISheet } from "../models/sheet.model";

export class SheetService {
  createSheet(data: Partial<ISheet>) {
    return SheetModel.create(data);
  }

  getSheets(filters: any = {}) {
    return SheetModel.find(filters).lean().exec();
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

  deleteSheetByReportId(reportId: string) {
    return SheetModel.findOneAndDelete({ reportId }).exec();
  }

  getSheetByReportId(reportId: string) {
    return SheetModel.findOne({ reportId }).lean().exec();
  }
}
