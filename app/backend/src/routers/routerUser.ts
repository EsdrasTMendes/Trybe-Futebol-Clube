import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/controller.User';
import middlewareLogin from '../middlewares/middlewareLogin';

const routers: Router = Router();

const usercontroller = new UserController();

routers.post('/login', middlewareLogin, (req: Request, res: Response, next: NextFunction) => {
  usercontroller.login(req, res, next);
});

routers.get('/login/validate', (req: Request, res: Response, next: NextFunction) => {
  usercontroller.loginValidate(req, res, next);
});

export default routers;
