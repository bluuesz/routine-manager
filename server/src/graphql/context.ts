import { Request, Response, NextFunction } from 'express';

export interface Context {
  req: Request;
  res: Response;
  next: NextFunction;
  userId?: string;
}
