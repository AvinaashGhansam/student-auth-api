import { Router } from "express";
import asyncHandler from "express-async-handler";
import { SheetController } from "../../controllers/sheet.controller";
import listEndpoints from "express-list-endpoints";
import { logger } from "../../utils/logger";

const router = Router();
const ctrl = new SheetController();

router
  .route("/")
  .get(asyncHandler(ctrl.getSheets.bind(ctrl)))
  .post(asyncHandler(ctrl.createSheet.bind(ctrl)));

router
  .route("/:id")
  .get(asyncHandler(ctrl.getSheetById.bind(ctrl)))
  .put(asyncHandler(ctrl.updateSheet.bind(ctrl)));

logger.info("Registered routes:", { router });
console.table(
  listEndpoints(router).map((ep) => ({
    path: ep.path,
    methods: ep.methods.join(", "),
  })),
);

export default router;
