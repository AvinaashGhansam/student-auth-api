import { Router } from "express";
import asyncHandler from "express-async-handler";
import { LogController } from "../../../controllers/log.controller";

/**
 * Routes for student forms
 */
const router = Router();
const ctrl = new LogController();

router
  .route("/")
  .get(asyncHandler(ctrl.getLogs.bind(ctrl)))
  .post(asyncHandler(ctrl.createLog.bind(ctrl)));

export default router;
