import express, { Application } from "express";
import http from "http";
import mongoose from "mongoose";
import expressWinston from "express-winston";
import { config } from "./config/config";
import { logger } from "./utils/logger";
import sheetsRouter from "./routes/v1/sheet.route";
import { errorHandler } from "./middleware/ErrorHandler";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const app: Application = express();
const server = http.createServer(app);

app.use(express.json());

// serve JSON or YAML spec
const specPath = path.resolve(__dirname, "./docs/openapi.yaml");
const openapiDocument = yaml.load(fs.readFileSync(specPath, "utf8")) as Record<
  string,
  unknown
>;

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiDocument, { explorer: true }),
);

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  }),
);

// Connect to MongoDB, then start
mongoose
  .connect(config.dbUri ?? "")
  .then(() => {
    logger.info("MongoDB connected");
    const mountPath = `${config.apiPrefix}/${config.apiVersion}/sheets`;
    app.use(mountPath, sheetsRouter);

    server.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error("Mongo connection error:", err);
    process.exit(1);
  });

// Graceful shutdown
const shutdown = () => {
  logger.info("SIGTERM received, closing server...");
  server.close(() => {
    mongoose.disconnect().then(() => {
      logger.warning("Mongo disconnected, exiting.");
      process.exit(0);
    });
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// Error handling (after all routes)
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => errorHandler.handle(err, req, res, next),
);
