import { Router } from "express";
import asyncHandler from "express-async-handler";
import { SheetController } from "../../../controllers/sheet.controller";

const router = Router();
const ctrl = new SheetController();

router
  .route("/")
  .get(asyncHandler(ctrl.getSheets.bind(ctrl)))
  .post(asyncHandler(ctrl.createSheet.bind(ctrl)));

router
  .route("/:_id")
  .get(asyncHandler(ctrl.getSheetById.bind(ctrl)))
  .put(asyncHandler(ctrl.updateSheet.bind(ctrl)))
  .patch(asyncHandler(ctrl.updateSheet.bind(ctrl)))
  .delete(asyncHandler(ctrl.deleteSheet.bind(ctrl)));

export default router;
