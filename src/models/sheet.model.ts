import mongoose, { Schema, Document } from "mongoose";

export interface ISheet extends Document {
  className: string;
  dateCreated: string;
  secretKey?: string;
  isActive: boolean;
  location: {
    lat: string;
    lng: string;
  };
  maxRadius?: string;
  createdBy?: string;
  reportId?: string;
}

const SheetSchema = new Schema<ISheet>({
  className: { type: String, required: true },
  dateCreated: { type: String, required: true },
  secretKey: { type: String },
  isActive: { type: Boolean, default: false },
  location: {
    lat: { type: String },
    lng: { type: String },
  },
  maxRadius: { type: String },
  createdBy: { type: String },
  reportId: { type: String },
});

export default mongoose.model<ISheet>("Sheet", SheetSchema);
