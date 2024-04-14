import { type ConsumeMessage } from 'amqplib'
import { dependencyLocator } from '../di-container'
import { injectable } from 'inversify'

@injectable()
class ExampleConsumer {
  private rabbitMqConnection: any;
  private channel: any;
  private controller: any;
  private readonly logger = dependencyLocator.getLoggerService();

  async initialize(): Promise<void> {
    try {
      this.rabbitMqConnection = await dependencyLocator.getRabbitMqConnection();
      this.channel = await this.rabbitMqConnection.getChannel();
      this.controller = await dependencyLocator.getController(
        "ExampleController"
      );

      if (this.channel) {
        await this.channel.assertQueue("q-queue1", { durable: true });
        this.channel.consume("q-queue1", this.onMessage.bind(this));
      } else {
        this.logger.logInfo("RabbitMQ channel is null");
      }
    } catch (error) {
      this.logger.logError("Error getting channel:" + String(error));
    }
  }

  private async onMessage(msg: ConsumeMessage | null): Promise<void> {
    if (msg) {
      const message_content = JSON.parse(msg.content.toString());
      this.logger.logInfo(
        "Received message from queue1:" +
          String(JSON.stringify(message_content))
      );
      const joiService = await dependencyLocator.getUtility("JoiService");
      const validator = await dependencyLocator.getValidator(
        "ExampleSchema"
      );
      const user_schema = validator.getUserSchema();
      const validationResult = joiService.validate(
        message_content,
        user_schema
      );
      if (validationResult.error) {
        this.logger.logError("consumers >> PassengerConsumers: " +
          String(validationResult.error.details[0]?.message)
        );
      } else {
        const result = await this.controller.getProtectedData(message_content);
        if (result) {
          this.channel.ack(msg);
        } else {
          this.logger.logError("something went wrong in passenger consumer");
        }
      }
    } else {
      this.logger.logError("RabbitMQ msg is null");
    }
  }
}

export default ExampleConsumer
