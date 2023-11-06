import { type Request, type Response } from 'express'
import { dependencyLocator } from '../di-container'
import { injectable } from 'inversify'
import ExampleServiceInterface from '../interfaces/services/ExampleServiceInterface'

@injectable()
export class ExampleService implements ExampleServiceInterface {
  private readonly logger = dependencyLocator.getLoggerService()
  private db: any

  private async initializeAsync (): Promise<void> {
    try {
      this.db = await dependencyLocator.getDatabaseConnection()     
    } catch (error) {
      this.logger.logError('Error during the initializing:'+ String(error))
    }
  }

  getProtectedData = async (req: Request, res: Response): Promise<any> => {
    try {
      await this.initializeAsync()
      const result = await this.db.any('SELECT * FROM test_table')
      this.logger.logInfo(JSON.stringify(result))
      return result
    } catch (error) {
      this.logger.logError('An error occurred: ' + String(error))
      res.json({ error: 'Internal Server Error' })
    }
  }
}
export default ExampleService
