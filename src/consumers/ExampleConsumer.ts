import { type ConsumeMessage } from 'amqplib'
import { dependencyLocator } from '../di-container'
import { injectable } from 'inversify'

@injectable()
class ExampleConsumer {
  private rabbitMqConnection: any
  private channel: any
  private readonly logger = dependencyLocator.getLoggerService()

  async initialize (): Promise<void> {
    try {
      this.rabbitMqConnection = await dependencyLocator.getRabbitMqConnection()
      this.channel = await this.rabbitMqConnection.getChannel()

      if (this.channel) {
        await this.channel.assertQueue('q-queue1', { durable: true })
        this.channel.consume('q-queue1', this.onMessage.bind(this))
      } else {
        this.logger.logInfo('RabbitMQ channel is null')
      }
    } catch (error) {
      this.logger.logError('Error getting channel:' + String(error))
    }
  }

  private onMessage (msg: ConsumeMessage | null): void {
    if (msg) {
      const messageContent = msg.content.toString()
      this.logger.logInfo('Received message from queue1:' + String(messageContent))
      this.channel.ack(msg)
    } else {
      this.logger.logError('RabbitMQ msg is null')
    }
  }
}

export default ExampleConsumer
