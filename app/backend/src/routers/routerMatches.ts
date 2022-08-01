import { Router, Request, Response, NextFunction } from 'express';
import MatchesController from '../controllers/controller.Matches';

const routers: Router = Router();

const matchController = new MatchesController();

routers.get('/matches', (req: Request, res: Response, next: NextFunction) => {
  matchController.getAllMatches(req, res, next);
});

// routers.get('/teams/:id', (req: Request, res: Response, next: NextFunction) => {
//   teamController.getTeambyId(req, res, next);
// });

export default routers;
