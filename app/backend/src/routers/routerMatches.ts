import { Router, Request, Response, NextFunction } from 'express';
import MatchesController from '../controllers/controller.Matches';
import authenticationMiddleware from '../middlewares/authenticationMiddleware';

const routers: Router = Router();

const matchController = new MatchesController();

routers.get('/matches', (req: Request, res: Response, next: NextFunction) => {
  matchController.getAllMatches(req, res, next);
});

routers.post(
  '/matches',
  authenticationMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    matchController.createMatches(req, res, next);
  },
);
routers.patch('/matches/:id/finish', (req: Request, res: Response, next: NextFunction) => {
  matchController.updateMatche(req, res, next);
});

routers.patch('/matches/:id', (req: Request, res: Response, next: NextFunction) => {
  matchController.updateMatchById(req, res, next);
});

export default routers;
