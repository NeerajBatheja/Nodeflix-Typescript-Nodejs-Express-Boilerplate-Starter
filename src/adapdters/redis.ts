import Redis from 'ioredis'
import { dependencyLocator } from '../di-container'
import dotenv from 'dotenv'
dotenv.config()

class RedisService {
  private readonly client: Redis
  private readonly logger = dependencyLocator.getLoggerService()

  constructor () {
    const {REDIS_HOST,REDIS_PORT} = process.env
    this.client = new Redis({
      host: REDIS_HOST ?? 'localhost',
      port: Number(REDIS_PORT) ?? 6379,
      connectTimeout: 100000,
    })
    this.client.on('connect', () => {
      this.logger.logInfo('Redis connection established ✅')
    })

    this.client.on('error', (error) => {
      this.logger.logError('Redis connection error ❌:' + String(error))
    })
  }

  async getClient (): Promise<Redis> {
    return this.client
  }

  async setValue (key: string, value: string): Promise<void> {
    await this.client.set(key, value)
  }

  async getValue (key: string): Promise<string | null> {
    return await this.client.get(key)
  }
}

export default RedisService
