import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import sheetsRouter from "./routes/api/v1/sheet.route";
import logsRouter from "./routes/api/v1/log.route";
import { Config } from "./config/config";
import { errorHandler } from "./middleware/ErrorHandler";
import { logger } from "./utils/logger";

dotenv.config();

const config = new Config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(`${config.apiPrefix}/${config.apiVersion}/sheets`, sheetsRouter);
app.use(`${config.apiPrefix}/${config.apiVersion}/logs`, logsRouter);

const swaggerDocument = YAML.load("./src/docs/openapi.yaml");
app.use(
  `${config.apiPrefix}/${config.apiVersion}/docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

// Register error handler middleware as the last middleware
app.use(errorHandler.handle);

mongoose
  .connect(config.dbUri!)
  .then(() => {
    app.listen(config.port, () => {
      logger.info("==============================");
      logger.info(`Server running on port ${config.port}`);
      logger.info("Available routes:");
      logger.info(
        `Sheets: http://localhost:${config.port}${config.apiPrefix}/${config.apiVersion}/sheets`,
      );
      logger.info(
        `Logs:   http://localhost:${config.port}${config.apiPrefix}/${config.apiVersion}/logs`,
      );
      logger.info("Swagger docs:");
      logger.info(
        `http://localhost:${config.port}${config.apiPrefix}/${config.apiVersion}/docs`,
      );
      logger.info("==============================");
    });
  })
  .catch((err) => logger.error("MongoDB connection error:", err));
