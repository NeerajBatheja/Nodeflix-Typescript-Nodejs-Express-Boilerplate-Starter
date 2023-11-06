import { Request, Response } from 'express';

interface ExampleControllerInterface {
  getProtectedData(req: Request, res: Response): Promise<void>;
}

export default ExampleControllerInterface;
