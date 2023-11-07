import app,{startBooting} from './app'
import 'dotenv/config'
import { dependencyLocator } from './di-container'

const PORT = process.env.PORT ?? 3002
const logger = dependencyLocator.getLoggerService()

startBooting()
  .then(() => {
    logger.logInfo("bootstrap initiated successfully ✅");
  })
  .catch((error) => {
    logger.logError("Error during bootstrap:" + String(error));
  });

app.listen(PORT, () => {
  logger.logInfo(`Server is running on port ${PORT} ✅`)
})

export default app;
