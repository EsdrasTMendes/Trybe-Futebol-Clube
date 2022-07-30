import { Request, Response, NextFunction } from 'express';
import HttpError from '../utils/httpError';

const middlewareLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new HttpError(400, 'All fields must be filled');
  }
  return next();
};

export default middlewareLogin;
