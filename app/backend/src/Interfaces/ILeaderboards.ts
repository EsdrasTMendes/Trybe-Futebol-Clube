interface ILeaderboards {
  classificação?: number;
  time?: string;
  nome?: string;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  golsMarcados: number;
  golsSofridos: number;
  saldoTotalGols: number;
  aproveitamentoTime: number;
}

export default ILeaderboards;
