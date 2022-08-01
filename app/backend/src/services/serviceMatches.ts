import HttpError from '../utils/httpError';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
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
}

export default serviceMatches;
