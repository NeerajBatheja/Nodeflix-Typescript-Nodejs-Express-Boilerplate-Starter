import { Request, Response } from 'express';

interface ExampleServiceInterface {
  getProtectedData(req: Request, res: Response): Promise<void>
}

export default ExampleServiceInterface;
