import { dependencyLocator } from "./di-container";
import { rabbitmqListeners } from "./mediators/listeners";
import { loadModulesFromDirectory } from "./di-container";
const logger = dependencyLocator.getLoggerService();

export async function bootstrap(): Promise<void> {
  await loadModules();
  await rabbitmqListeners();
}

async function loadModules(): Promise<void> {
  const directories = ["validators", "controllers", "services", "consumers"];
  const promises = directories.map(async (dir) => {
    await loadModulesFromDirectory(dir);
  });
  Promise.all(promises)
    .then(() => {
      logger.logInfo("All modules loaded successfully ✅.");
    })
    .catch((error) => {
      logger.logError("Failed to load modules ❌:" + String(error));
    });
}
