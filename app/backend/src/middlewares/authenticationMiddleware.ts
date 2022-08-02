import { Request, Response, NextFunction } from 'express';
import GenerateToken from '../utils/authentication';

const validateToken = new GenerateToken();

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    const validate = await validateToken.authenticateToken(authorization);
    res.locals.payload = validate;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticationMiddleware;
