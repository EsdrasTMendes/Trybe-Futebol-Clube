import { NextFunction, Request, Response } from 'express';
import ServiceTeams from '../services/serviceTeams';

class ControllerTeams {
  private serviceTeams: ServiceTeams;

  constructor() {
    this.serviceTeams = new ServiceTeams();
  }

  getAllTeams = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.serviceTeams.findAllteams();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };

  getTeambyId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const team = await this.serviceTeams.findTeamById(+id);
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  };
}

export default ControllerTeams;
