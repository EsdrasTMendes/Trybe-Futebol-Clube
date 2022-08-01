import { NextFunction, Request, Response } from 'express';
import ServiceUser from '../services/servicesUsers';

class controllerUser {
  private serviceUser: ServiceUser;

  constructor() {
    this.serviceUser = new ServiceUser();
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this.serviceUser.login(req.body);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  };

  loginValidate = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    try {
      const { role } = await this.serviceUser.verifyAutentication(authorization as string);
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
}

export default controllerUser;
