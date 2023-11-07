import path from "path";
import { dependencyLocator } from "../di-container";
import fs from "fs";

export async function rabbitmqListeners(): Promise<void> {
  const rabbitMqConnection = await dependencyLocator.getRabbitMqConnection();
  await rabbitMqConnection.init();
  const directory = "consumers";
  const consumers = fs.readdirSync(path.join(__dirname, "..", directory));
  for (const file of consumers) {
    if (file.endsWith(".ts")) {
      const consumerModuleName = path.basename(file, path.extname(file));
      const consumerModule = await dependencyLocator.getConsumer(
        consumerModuleName
      );
      await consumerModule.initialize();
    }
  }
}
