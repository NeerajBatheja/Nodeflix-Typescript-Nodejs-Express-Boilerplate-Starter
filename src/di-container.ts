import { Container } from "inversify";
import fs from "fs";
import path from "path";
import { LoggerService } from "./utility/LoggerService";
import DependencyLocator from "./dependencyLocator";
const container = new Container();
container.bind<LoggerService>(LoggerService).toSelf();
const dependencyLocator = new DependencyLocator(container);
import JoiService from "./utility/JoiService";
import ResponseDecorator from "./utility/ResponseDecorator";
import { db } from "./adapdters/pgsql";
import RabbitMQService from "./adapdters/rabbitmq";
import RedisService from "./adapdters/redis";
container.bind("DatabaseConnection").toConstantValue(db);
const redisService = new RedisService();
const rabbitMQService = new RabbitMQService();
container
  .bind<RabbitMQService>(RabbitMQService)
  .toConstantValue(rabbitMQService);
container.bind<RedisService>(RedisService).toConstantValue(redisService);

async function loadModulesFromDirectory(directory: string): Promise<void> {
  const validatorFiles = fs.readdirSync(path.join(__dirname, directory));
  for (const file of validatorFiles) {
    if (file.endsWith(".ts")) {
      const validatorClassName = path.basename(file, path.extname(file));
      const ValidatorClassModule = await import(
        path.join(__dirname, directory, file)
      );
      const validatorClass = ValidatorClassModule.default;
      if (typeof validatorClass === "function") {
        container
          .bind<typeof validatorClass>(validatorClassName)
          .to(validatorClass);
      }
    }
  }
}
container.bind<JoiService>(JoiService).toConstantValue(new JoiService());
container
  .bind<ResponseDecorator>(ResponseDecorator)
  .toConstantValue(new ResponseDecorator());

export { container, dependencyLocator, loadModulesFromDirectory };
