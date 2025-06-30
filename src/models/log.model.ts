import mongoose, { Model } from "mongoose";
import { Logs } from "../types";

const LogSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  sheetId: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  secretKey: {
    secret: { type: String, required: true },
    location: {
      lat: { type: Number, required: false },
      lon: { type: Number, required: false },
    },
  },
});
export const LogModel: Model<Logs> = mongoose.model<Logs>("Logs", LogSchema);
