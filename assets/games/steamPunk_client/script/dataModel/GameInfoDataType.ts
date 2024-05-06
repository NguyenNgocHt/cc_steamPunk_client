export type GameInfoData = {
  balance: number;
  betlines: number;
  currency: string;
  pending?: any;
  settings?: any;
  denominations?: number[];
  username: string;
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
