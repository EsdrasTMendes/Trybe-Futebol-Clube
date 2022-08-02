import HttpError from '../utils/httpError';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import IMatchCreate from '../Interfaces/IMatchCreate';
// import findTeamByPk from '../utils/findTeamById';

class serviceMatches {
  findAllMatches = async () => {
    try {
      const matches = await Matches.findAll({
        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
      return matches;
    } catch (error) {
      throw new HttpError(400, 'nenhuma partida encontrada');
    }
  };

  createMatche = async (newMatch: IMatchCreate): Promise<Matches> => {
    const hTeam = await Teams.findByPk(newMatch.homeTeam);
    const aTeam = await Teams.findByPk(newMatch.awayTeam);
    if (!hTeam || !aTeam) throw new HttpError(404, 'There is no team with such id!');
    if (newMatch.homeTeam === newMatch.awayTeam) {
      throw new HttpError(401, 'It is not possible to create a match with two equal teams');
    }
    const createdMatch = await Matches.create(newMatch);
    return createdMatch;
  };

  updateMatche = async (id: number) => {
    const ismatch = await Matches.findByPk(id);
    if (ismatch?.inProgress === true) {
      await Matches.update({
        inProgress: false,
      }, {
        where: { id },
      });
    }
    return { message: 'Finished' };
  };
}

export default serviceMatches;
