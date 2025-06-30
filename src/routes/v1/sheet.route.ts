import { Router } from "express";
import asyncHandler from "express-async-handler";
import { SheetController } from "../../controllers/sheet.controller";

const router = Router();
const ctrl = new SheetController();

router.get("/", asyncHandler(ctrl.getAllSheets.bind(ctrl)));
router.get("/:id", asyncHandler(ctrl.getSheetsByProfessorId.bind(ctrl)));
router.post("/", asyncHandler(ctrl.createSheet.bind(ctrl)));
router.get("/:id", asyncHandler(ctrl.getSheetById.bind(ctrl)));
router.put("/:id", asyncHandler(ctrl.updateSheet.bind(ctrl)));

export default router;
