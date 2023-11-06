import app from './app'
import 'dotenv/config'
import { dependencyLocator } from './di-container'

const PORT = process.env.PORT ?? 3002
const logger = dependencyLocator.getLoggerService()

app.listen(PORT, () => {
  logger.logInfo(`Server is running on port ${PORT} ✅`)
})
