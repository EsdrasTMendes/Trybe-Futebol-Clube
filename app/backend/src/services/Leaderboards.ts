import ILeaderboards from '../Interfaces/ILeaderboards';
import ILeaderBoardReturn from '../Interfaces/ILeaderBoardReturn';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamsModel';
import utils from '../utils/leaderboard';

class LeaderBoards {
  arrayLeaderBoard = async () => {
    const allMatches = await MatchesModel.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    }) as any[];
    const result = utils.expectLeaderBoard(allMatches);
    const arrayTeams = result.map((match: ILeaderboards) => match.nome);
    return {
      arrayMatches: result,
      arrayNomeTimes: arrayTeams
        .filter((ele: string, pos: string) => arrayTeams.indexOf(ele) === pos),
    };
  };

  totalJogos = (matches: any[]) => matches
    .reduce((acc:number, match: ILeaderboards) => acc + match.jogos, 0);

  totalVitorias = (matches: any[]) => matches
    .reduce((acc:number, match: ILeaderboards) => acc + match.vitorias, 0);

  totalEmpates = (matches: any[]) => matches
    .reduce((acc:number, match: ILeaderboards) => acc + match.empates, 0);

  totalDerrotas = (matches: any[]) => matches
    .reduce((acc:number, match: ILeaderboards) => acc + match.derrotas, 0);

  totalGolsMarcados = (matches: any[]) => matches
    .reduce((acc:number, match: ILeaderboards) => acc + match.golsMarcados, 0);

  totalGolsSofridos = (matches: any[]) => matches
    .reduce((acc:number, match: ILeaderboards) => acc + match.golsSofridos, 0);

  totalSaldoGols = (matches: any[]) => matches
    .reduce((acc:number, match: ILeaderboards) => acc + match.saldoTotalGols, 0);

  totalPontos = (matches: any[]) => matches
    .reduce((acc:number, match: ILeaderboards) => acc + match.pontos, 0);

  totalAproveitamento = (matches: ILeaderBoardReturn) => Number(
    (+matches.totalPoints / (+matches.totalGames * 3)) * 100,
  ).toFixed(2);

  sortLeaderboard = (theLeaderBoard: ILeaderBoardReturn[]) => theLeaderBoard
    .sort((aTeam: ILeaderBoardReturn, bTeam: ILeaderBoardReturn) => bTeam.totalPoints - aTeam
      .totalPoints || bTeam.totalVictories - aTeam.totalVictories
      || bTeam.goalsBalance - aTeam.goalsBalance || bTeam.goalsFavor - aTeam.goalsFavor);

  createLeaderBoard = async () => {
    const arraytimesAndResults = await this.arrayLeaderBoard();
    const theLeaderBoard = arraytimesAndResults
      .arrayNomeTimes.map((time: string) => {
        const teamResults = arraytimesAndResults.arrayMatches
          .filter((matches: ILeaderboards) => matches.nome === time);
        return {
          name: time,
          totalPoints: this.totalPontos(teamResults),
          totalGames: this.totalJogos(teamResults),
          totalVictories: this.totalVitorias(teamResults),
          totalDraws: this.totalEmpates(teamResults),
          totalLosses: this.totalDerrotas(teamResults),
          goalsFavor: this.totalGolsMarcados(teamResults),
          goalsOwn: this.totalGolsSofridos(teamResults),
          goalsBalance: this.totalSaldoGols(teamResults),
        };
      }); return theLeaderBoard;
  };

  theFinalLeaderBoard = async () => {
    const temporaryBoard = await this.createLeaderBoard();
    const finalLeaderBoard = temporaryBoard.map((theLeaderBoard: ILeaderBoardReturn) => ({
      ...theLeaderBoard,
      efficiency: this.totalAproveitamento(theLeaderBoard),
    }));
    return this.sortLeaderboard(finalLeaderBoard);
  };
}

export default LeaderBoards;
