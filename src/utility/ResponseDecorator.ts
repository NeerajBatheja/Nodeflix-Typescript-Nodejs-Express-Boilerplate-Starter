// responseDecorator.ts

import { type Response } from 'express'

class ResponseDecorator {
  public success (res: Response, data: any, status = 200): void {
    res.status(status).json({
      success: true,
      status,
      data
    })
  }

  public noContent (res: Response, status = 204): void {
    res.status(status).end()
  }

  public badRequest (res: Response, message: string, status = 400): void {
    res.status(status).json({
      success: false,
      status,
      error: message
    })
  }

  public error (res: Response, message: string, status = 500): void {
    res.status(status).json({
      success: false,
      status,
      error: message
    })
  }
}

export default ResponseDecorator
