import { NextFunction, Request, Response } from 'express';
import LeaderBoards from '../services/Leaderboards';

class LeaderBoardsClass {
  private leaderBoards: LeaderBoards;

  constructor() {
    this.leaderBoards = new LeaderBoards();
  }

  createleaderboards = async (_req: Request, res: Response, _next: NextFunction) => {
    const result = await this.leaderBoards.theFinalLeaderBoard();
    res.status(200).json(result);
  };

  createleaderboardAway = async (_req: Request, res: Response, _next: NextFunction) => {
    const result = await this.leaderBoards.thefinalLeaderBoardAway();
    res.status(200).json(result);
  };
}

export default LeaderBoardsClass;
