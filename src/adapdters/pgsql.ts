import { dependencyLocator } from '../di-container'
import pgPromise, { type IMain, type IDatabase } from 'pg-promise'
import dotenv from 'dotenv'
dotenv.config()

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT
} = process.env

const connectionString = {
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT)
}

const pgp: IMain = pgPromise()
const db: IDatabase<Record<string, unknown>> = pgp({
  ...connectionString,
  max: 50,
  idleTimeoutMillis: 10000
})
const logger = dependencyLocator.getLoggerService()
void db.connect()
  .then((obj) => {
    obj.done()
    logger.logInfo('PostgreSQL connection established ✅')
  })
  .catch((error) => {
    logger.logError('PostgreSQL connection error ❌:' + String(error))
  })

export { db }