import "reflect-metadata";
import { dependencyLocator } from "./di-container";
import express from "express";
import bodyParser from "body-parser";
import { bootstrap } from "./bootstrap";
import fs from "fs";
import path from "path";

const app = express();
app.use(bodyParser.json());
const logger = dependencyLocator.getLoggerService();

async function startBooting(): Promise<void> {
  await bootstrap();
  app.use(logger.requestLogger);
  registerRoutes(path.join(__dirname, "routes"));
}

async function registerRoutes(directory: string): Promise<void> {
  const routeFiles = fs.readdirSync(directory);
  for (const file of routeFiles) {
    if (file.endsWith(".ts")) {
      const route = await import(path.join(directory, file));
      if (route.default && typeof route.default === "function") {
        route.default(app);
      }
    }
  }
}

startBooting()
  .then(() => {
    logger.logInfo("bootstrap initiated successfully ✅");
  })
  .catch((error) => {
    logger.logError("Error during bootstrap:" + String(error));
  });
export default app;
