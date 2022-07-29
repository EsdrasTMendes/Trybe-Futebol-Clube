import { Router, Request, Response } from 'express';
import UserController from '../controllers/controller.User';

const routers: Router = Router();

const usercontroller = new UserController();

routers.post('/login', (req: Request, res: Response) => {
  usercontroller.login(req, res);
});

export default routers;
