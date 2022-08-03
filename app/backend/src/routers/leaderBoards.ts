import { Router, Request, Response, NextFunction } from 'express';
import LeaderBoard from '../controllers/leaderBoard';

const routers: Router = Router();

const leaderBoard = new LeaderBoard();

routers.get('/leaderboard/home', (req: Request, res: Response, next: NextFunction) => {
  leaderBoard.createleaderboards(req, res, next);
});

routers.get('/leaderboard/away', (req: Request, res: Response, next: NextFunction) => {
  leaderBoard.createleaderboardAway(req, res, next);
});

routers.get('/leaderboard', (req: Request, res: Response, next: NextFunction) => {
  leaderBoard.createleaderboardAll(req, res, next);
});

export default routers;
