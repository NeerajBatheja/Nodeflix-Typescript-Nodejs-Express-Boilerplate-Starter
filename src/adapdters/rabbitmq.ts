import { connect, type Channel, type Connection, type Message } from 'amqplib'
import { dependencyLocator } from '../di-container'

class RabbitMQService {
  private connection: Connection | null = null
  private channel: Channel | null = null
  private readonly logger = dependencyLocator.getLoggerService()

  private async setupRabbitMQConnection (rabbitmqUrl: string): Promise<void> {
    try {
      this.connection = await connect(rabbitmqUrl)
      this.channel = await this.connection.createChannel()
      this.logger.logInfo('RabbitMQ connection established ✅')

      this.channel.on('error', (error) => {
        this.logger.logError('RabbitMQ channel error ❌:' + String(error))
      })

      this.connection.on('error', (error) => {
        this.logger.logInfo('RabbitMQ connection error ❌:' + String(error))
      })
    } catch (error) {
      this.logger.logError('RabbitMQ connection error ❌:' + String(error))
    }
  }

  public async getChannel (): Promise<Channel | null> {
    return this.channel
  }

  public async init (): Promise<void> {
    await this.setupRabbitMQConnection(process.env.RABBITMQ_URL ?? 'amqp://localhost')
  }

  public async publishMessage (exchange: string, routingKey: string, message: string): Promise<void> {
    if (this.channel) {
      await this.channel.assertExchange(exchange, 'direct', { durable: true })
      this.channel.publish(exchange, routingKey, Buffer.from(message))
    }
  }

  public async consumeFromQueue (queueName: string, onMessage: (msg: Message | null) => void): Promise<void> {
    if (this.channel) {
      await this.channel.assertQueue(queueName, { durable: true })
      await this.channel.consume(queueName, onMessage, { noAck: false })
    }
  }

  public async closeRabbitMQConnection (): Promise<void> {
    if (this.channel) {
      await this.channel.close()
    }
    if (this.connection) {
      await this.connection.close()
    }
  }
}
export default RabbitMQService
