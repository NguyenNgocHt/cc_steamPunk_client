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
export type PendingData = {
  freeSpins: number;
  refId: string;
  roundId: string;
  stake: number;
};
export type SettingsData = {
  Denominations: number[];
  MaxBet: number;
  MinBet: number;
  currency: string;
};
export type gameData = {
  api: string;
  currency: string;
  env: string;
  gameCode: string;
  ip: string;
  language: string;
  operator: string;
  playmode: string;
  server: string;
  signature: string;
  staticUrl: string;
  subpath: string;
  timestamp: string;
  token: string;
  username: string;
};
