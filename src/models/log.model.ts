import mongoose, { Schema, Document } from "mongoose";

/**
 * Database Schema for Logging
 */
export interface ILog extends Document {
  sheetId: string;
  id: string;
  name?: string;
  studentId?: string;
  signedInAt?: string;
  className?: string;
  location?: {
    lat: number;
    lng: number;
  };
  locationDenied?: boolean;
  fingerprint?: string;
}

const LogSchema = new Schema<ILog>({
  sheetId: { type: String, required: true },
  id: { type: String, required: true },
  name: { type: String },
  studentId: { type: String },
  signedInAt: { type: String },
  className: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  locationDenied: { type: Boolean },
  fingerprint: { type: String },
});

export default mongoose.model<ILog>("Log", LogSchema);
