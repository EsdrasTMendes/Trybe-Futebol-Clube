import ILeaderboards from '../Interfaces/ILeaderboards';
import IMatch from '../Interfaces/IMatches';

const saldoDeGols = (matches: IMatch, team: string) => {
  const { homeTeamGoals, awayTeamGoals } = matches;
  if (team === 'awayTeam') {
    return Number(Number(awayTeamGoals) - Number(homeTeamGoals));
  }
  return Number(Number(homeTeamGoals) - Number(awayTeamGoals));
};

const vitorias = (awayTeamGoals: number, homeTeamGoals: number, team: string) => {
  if (team === 'awayTeam') {
    return Number(awayTeamGoals) > Number(homeTeamGoals) ? 1 : 0;
  }
  return Number(homeTeamGoals) > Number(awayTeamGoals) ? 1 : 0;
};

const derrotas = (awayTeamGoals: number, homeTeamGoals: number, team: string) => {
  if (team === 'awayTeam') {
    return Number(awayTeamGoals) >= Number(homeTeamGoals) ? 0 : 1;
  }
  return Number(homeTeamGoals) >= Number(awayTeamGoals) ? 0 : 1;
};

const empates = (awayTeamGoals: number, homeTeamGoals: number) => {
  if (awayTeamGoals === homeTeamGoals) return 1;
  return 0;
};

const leaderBoard = (match: IMatch, team: string):ILeaderboards => {
  const placar = {
    pontos: 0,
    jogos: 1,
    vitorias: vitorias(match.awayTeamGoals, match.homeTeamGoals, team),
    empates: empates(match.awayTeamGoals, match.homeTeamGoals),
    derrotas: derrotas(match.awayTeamGoals, match.homeTeamGoals, team),
    golsMarcados: team === 'awayTeam' ? +match.awayTeamGoals : +match.homeTeamGoals,
    golsSofridos: team === 'awayTeam' ? +match.homeTeamGoals : +match.awayTeamGoals,
    saldoTotalGols: saldoDeGols(match, team),
    aproveitamentoTime: 0,
  };
  placar.pontos = Number(placar.vitorias * 3) + Number(placar.empates);
  return placar;
};

const expectLeaderBoard = (match: any[]) => match.reduce((acc, matche) => (
  [...acc,

    {
      nome: matche.teamHome.teamName,
      ...leaderBoard(matche, 'homeTeam'),
    },
  ]
), []);

const expectLeaderBoardAllTeams = (match: any[]) => match.reduce((acc, matche) => (
  [...acc,

    {
      nome: matche.teamHome.teamName,
      ...leaderBoard(matche, 'homeTeam'),
    },

    {
      nome: matche.teamAway.teamName,
      ...leaderBoard(matche, 'awayTeam'),
    },

  ]
), []);

const expectLeaderBoardAwayTeams = (match: any[]) => match.reduce((acc, matche) => (
  [...acc,

    {
      nome: matche.teamAway.teamName,
      ...leaderBoard(matche, 'awayTeam'),
    },

  ]
), []);

export default {
  leaderBoard,
  expectLeaderBoard,
  expectLeaderBoardAllTeams,
  expectLeaderBoardAwayTeams,

};
