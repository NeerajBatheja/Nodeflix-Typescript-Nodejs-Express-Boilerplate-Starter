import { type Request, type Response } from 'express'
import { dependencyLocator } from '../di-container'
import { injectable } from 'inversify'
import ExampleControllerInterface from '../interfaces/controllers/ExampleControllerInterface'

@injectable()
export class ExampleController implements ExampleControllerInterface {
  private readonly logger = dependencyLocator.getLoggerService()
  private readonly responseDecorator = dependencyLocator.getResponseDecorator()
  private service: any

  private async initializeASync (): Promise<void> {
    try {
      this.service = await dependencyLocator.getService('ExampleService')
    } catch (error) {
      this.logger.logError('Error during the initializing:'+ String(error))
    }
  }

  getProtectedData = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.initializeASync()
      const result = await this.service.getProtectedData(req,res)
      this.responseDecorator.success(res, result)
    } catch (error) {
      this.logger.logError('An error occurred: ' + String(error))
      res.json({ error: 'Internal Server Error' })
    }
  }
}
export default ExampleController
