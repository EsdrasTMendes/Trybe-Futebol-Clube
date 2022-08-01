import Teams from '../database/models/TeamsModel';

const findTeamByPk = async (id: number) => Teams.findByPk(id).then((team) => team?.teamName);

export default findTeamByPk;
