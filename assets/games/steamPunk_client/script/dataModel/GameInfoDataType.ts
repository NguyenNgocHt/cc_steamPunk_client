export type GameInfoData = {
  min_bet: number;
  max_bet: number;
  client_seed: string;
  server_seed_hash: string;
  PayoutRates: number[];
  server_seed: string;
  settings?: any;
  pending?: any;
  denominations?: number[];
};
