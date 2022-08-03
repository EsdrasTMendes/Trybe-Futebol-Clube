interface IMatch {
  id:number;
  homeTeam: string;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: { teamName: string };
  teamAway: { teamName: string };
}

export default IMatch;
