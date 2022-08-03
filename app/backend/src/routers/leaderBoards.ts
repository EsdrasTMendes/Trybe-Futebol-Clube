import { Router, Request, Response, NextFunction } from 'express';
import LeaderBoard from '../controllers/leaderBoard';

const routers: Router = Router();

const leaderBoard = new LeaderBoard();

routers.get('/leaderboard/home', (req: Request, res: Response, next: NextFunction) => {
  leaderBoard.createleaderboards(req, res, next);
});

export default routers;
