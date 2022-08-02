import { NextFunction, Request, Response } from 'express';
import IMatchCreate from '../Interfaces/IMatchCreate';
import ServiceMatches from '../services/serviceMatches';

class ControllerMatches {
  private serviceMatches: ServiceMatches;

  constructor() {
    this.serviceMatches = new ServiceMatches();
  }

  getAllMatches = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.serviceMatches.findAllMatches();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  createMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match: IMatchCreate = req.body;
      const newMatch = await this.serviceMatches.createMatche({ ...match, inProgress: true });
      res.status(201).json(newMatch);
    } catch (error) {
      next(error);
    }
  };

  updateMatche = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const update = await this.serviceMatches.updateMatche(+id);
      res.status(200).json(update);
    } catch (error) {
      next(error);
    }
  };

  updateMatchById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    try {
      await this.serviceMatches.updateMatchesbyId(+id, homeTeamGoals, awayTeamGoals);
      res.status(200).json({ message: 'qualquer corpo huahuahua' });
    } catch (error) {
      next(error);
    }
  };
}

export default ControllerMatches;
