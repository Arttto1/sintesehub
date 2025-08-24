import { Request, Response } from 'express';

export interface SinteseContext {
  req: Request;
  res: Response;
}
