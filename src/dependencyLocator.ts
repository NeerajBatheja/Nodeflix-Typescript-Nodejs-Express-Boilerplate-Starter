import { type Container } from 'inversify'
import { LoggerService } from './utility/LoggerService'
import { type IDatabase } from 'pg-promise'
import RabbitMQService from './adapdters/rabbitmq'
import RedisService from './adapdters/redis'
import JoiService from './utility/JoiService'
import path from 'path'
import ResponseDecorator from './utility/ResponseDecorator'

class DependencyLocator {
  private readonly container: Container

  constructor (container: Container) {
    this.container = container
  }

  createDependency<T>(className: string): T {
    const dependency = this.container.get<T>(className)
    return dependency
  }

  getLoggerService (): LoggerService {
    return this.container.get<LoggerService>(LoggerService)
  }

  async getDatabaseConnection (): Promise<IDatabase<Record<string, unknown>>> {
    return this.container.get<IDatabase<Record<string, unknown>>>('DatabaseConnection')
  }

  async getRabbitMqConnection (): Promise<RabbitMQService> {
    return this.container.get<RabbitMQService>(RabbitMQService)
  }

  async getRedisConnection (): Promise<RedisService> {
    return this.container.get<RedisService>(RedisService)
  }

  getJoiService (): JoiService {
    return this.container.get<JoiService>(JoiService)
  }

  getResponseDecorator (): ResponseDecorator {
    return this.container.get<ResponseDecorator>(ResponseDecorator)
  }

  getValidator (dependencyName: string): any {
    const ValidatorClass = import(path.join(__dirname, 'validators', dependencyName))
    return this.createDependency<typeof ValidatorClass>(dependencyName)
  }

  async getService (dependencyName: string): Promise<any> {
    const ValidatorClass = import(path.join(__dirname, 'services', dependencyName))
    return this.createDependency<typeof ValidatorClass>(dependencyName)
  }

  async getController (dependencyName: string): Promise<any> {
    const ValidatorClass = await import(path.join(__dirname, 'controllers', dependencyName))
    return this.createDependency<typeof ValidatorClass>(dependencyName)
  }

  async getConsumer (dependencyName: string): Promise<any> {
    const ValidatorClass = await import(path.join(__dirname, 'consumers', dependencyName))
    return this.createDependency<typeof ValidatorClass>(dependencyName)
  }
}

export default DependencyLocator
