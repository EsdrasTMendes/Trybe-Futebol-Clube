import { NextFunction, Request, Response } from 'express';
import ServiceMatches from '../services/serviceMatches';

class ControllerMatches {
  private serviceMatches: ServiceMatches;

  constructor() {
    this.serviceMatches = new ServiceMatches();
  }

  getAllMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.serviceMatches.findAllMatches();
      res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  // getTeambyId = async (req: Request, res: Response, next: NextFunction) => {
  //   const { id } = req.params;
  //   try {
  //     const team = await this.serviceTeams.findTeamById(+id);
  //     res.status(200).json(team);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default ControllerMatches;
