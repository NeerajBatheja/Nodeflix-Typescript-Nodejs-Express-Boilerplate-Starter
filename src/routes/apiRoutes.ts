import { Express, Router } from 'express';
import { authenticateUser } from '../middleware/athenticationMiddlewar';
import { dependencyLocator } from '../di-container';

export default function registerApiRoutes(app: Express) {
  const router = Router();
  const logger = dependencyLocator.getLoggerService();
  const joiService = dependencyLocator.getJoiService();
  const responseDecorator = dependencyLocator.getResponseDecorator();

  router.get('/protected-route', authenticateUser, async (req, res): Promise<void> => {
    try {
      const validator = dependencyLocator.getValidator('ExampleSchema');
      const userSchema = validator.getUserSchema();
      const validationResult = joiService.validate(req.body, userSchema);
      if (validationResult.error) {
        responseDecorator.badRequest(res, String(validationResult.error.details));
      } else {
        const controller = await dependencyLocator.getController('ExampleController');
        await controller.getProtectedData(req, res);
      }
    } catch (error) {
      logger.logError('Error in /protected-route:' + String(error));
      responseDecorator.badRequest(res, 'Internal Server Error');
    }
  });

  app.use('/api', router);
}
