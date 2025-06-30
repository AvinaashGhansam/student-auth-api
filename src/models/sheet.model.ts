import mongoose, { Schema, Document, Model } from "mongoose";
import { Sheet } from "../types";

const SheetSchema = new Schema<Sheet>({
  professorId: { type: String, required: true },
  professorFirstName: { type: String, required: true },
  professorLastName: { type: String, required: true },
  sheetId: { type: String, required: true },
  className: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  secretKey: {
    secret: { type: String, required: true },
    location: {
      lat: { type: Number, required: false },
      lon: { type: Number, required: false },
    },
  },
  isActive: { type: Boolean, default: false },
});
export const SheetModel: Model<Sheet> = mongoose.model<Sheet>(
  "Sheet",
  SheetSchema,
);
