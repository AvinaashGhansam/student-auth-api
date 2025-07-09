import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import sheetsRouter from "./routes/api/v1/sheet.route";
import logsRouter from "./routes/api/v1/log.route";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// serve flat endpoints
app.use("/api/v1/sheets", sheetsRouter);
app.use("/api/v1/logs", logsRouter);

const swaggerDocument = YAML.load("./src/docs/openapi.yaml");
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log("\n==============================");
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("\nAvailable routes:");
      console.log(`  • Sheets: http://localhost:${PORT}/api/v1/sheets`);
      console.log(`  • Logs:   http://localhost:${PORT}/api/v1/logs`);
      console.log("\nSwagger docs:");
      console.log(`  • http://localhost:${PORT}/api/v1/docs`);
      console.log("==============================\n");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
