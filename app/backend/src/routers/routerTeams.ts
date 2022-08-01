import { Router, Request, Response, NextFunction } from 'express';
import TeamController from '../controllers/controller.Teams';
// import middlewareLogin from '../middlewares/middlewareLogin';

const routers: Router = Router();

const teamController = new TeamController();

routers.get('/teams', (req: Request, res: Response, next: NextFunction) => {
  teamController.getAllTeams(req, res, next);
});

routers.get('/teams/:id', (req: Request, res: Response, next: NextFunction) => {
  teamController.getTeambyId(req, res, next);
});

export default routers;
