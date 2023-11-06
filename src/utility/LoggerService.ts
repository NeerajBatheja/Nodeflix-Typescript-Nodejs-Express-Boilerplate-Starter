import winston from 'winston'
import { format } from 'winston'
import { injectable } from 'inversify'
import { Request, Response, NextFunction } from 'express';


@injectable()
class LoggerService {
  private readonly logger: winston.Logger

  constructor () {
    this.logger = winston.createLogger({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
      ]
    })
    this.requestLogger = this.requestLogger.bind(this);
  }

  logInfo (message: string): void {
    this.logger.info(message)
  }

  logError (message: string): void {
    this.logger.error(message)
  }
  requestLogger(req: Request, res: Response, next: NextFunction) {
    const { method, url, ip } = req;
    this.logger.info(`[${method}] ${url} from ${ip}`);
    next();
  }
}

export { LoggerService }
