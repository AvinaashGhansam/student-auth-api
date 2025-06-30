import express, { Application } from "express";
import http from "http";
import mongoose from "mongoose";
import expressWinston from "express-winston";
import listEndpoints from "express-list-endpoints";
import { config } from "./config/config";
import { logger } from "./utils/logger";
import sheetsRouter from "./routes/v1/sheet.route";
import { errorHandler } from "./middleware/ErrorHandler";

const app: Application = express();
const server = http.createServer(app);

app.use(express.json());
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
    console.log("MongoDB connected");
    const mountPath = `${config.apiPrefix}/${config.apiVersion}/sheets`;
    app.use(mountPath, sheetsRouter);

    console.log("🛣️  Registered routes:");
    console.table(
      listEndpoints(app).map((ep) => ({
        path: ep.path,
        methods: ep.methods.join(", "),
      })),
    );

    server.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });

// Graceful shutdown
const shutdown = () => {
  console.log("SIGTERM received, closing server...");
  server.close(() => {
    mongoose.disconnect().then(() => {
      console.log("Mongo disconnected, exiting.");
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
