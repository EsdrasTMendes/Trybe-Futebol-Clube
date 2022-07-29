import { Request, Response, NextFunction } from 'express';
import HttpError from '../utils/httpError';

const middlewareErro = (error: HttpError, _req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 400;
  const message = error.message || 'Algo errado não parece certo.';
  if (error) return res.status(status).json(message);
  return next();
};

export default middlewareErro;
