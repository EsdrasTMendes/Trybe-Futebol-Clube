import HttpError from '../utils/httpError';
import Team from '../database/models/TeamsModel';

class serviceTeam {
  findAllteams = async () => {
    try {
      const teams = await Team.findAll({
        attributes: ['id', 'teamName'],
      });
      return teams;
    } catch (error) {
      throw new HttpError(400, 'erro ao buscar todos os times');
    }
  };

  findTeamById = async (id: number) => {
    try {
      const team = await Team.findByPk(id);
      return team;
    } catch (error) {
      throw new HttpError(400, 'nenhum time encontrado');
    }
  };
}

export default serviceTeam;
