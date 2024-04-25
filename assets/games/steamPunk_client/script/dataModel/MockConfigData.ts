export type AuthMock = {
  api: "https://gamedev.bnw.ventures/api";
  currency: "USD";
  env: "dev";
  gameCode: "STEAMPUNK";
  ip: "127.0.0.1";
  language: "en";
  operator: "nfgusd";
  playmode: "free";
  server: "https://gamedev.bnw.ventures";
  signature: "796cccd5afb7d24817fd55ef1740145faa1c30423efe189694ee0267d2fbbdd7";
  staticUrl: "https://gamedev.bnw.ventures/static/steampunk";
  subpath: "/steampunk/api";
  timestamp: "1713544918";
  token: "ee1a23ab-dbc8-4713-8e7e-3e536907939a";
  username: "ngocdev";
};
//game info data
export type PendingMock = {
  freeSpins: number;
  refId: string;
  roundId: string;
  stake: number;
};

export type SettingsMock = {
  Denominations: number[];
  MaxBet: number;
  MinBet: number;
  currency: string;
};

export type GameInfoMock = {
  balance: number;
  betlines: number;
  currency: string;
  Denominations: number[];
  pending: PendingMock;
  settings: SettingsMock;
  username: string;
};
//BetResult data

export type PaylinesMock = PaylineMock[];

export type PaylineMock = {
  payline: number;
  payoutRate: number;
  symbols: number[];
  winType: string;
};

export type ResultMock = {
  reel1: number[];
  reel2: number[];
  reel3: number[];
};

export type ResultsMock = {
  balance: number;
  betLines: number;
  betTime: string;
  freeSpins: number;
  id: string;
  jackpot: number;
  paylines: PaylinesMock;
  payout: number;
  playType: string;
  processedTime: string;
  refId: string;
  result: ResultMock;
  roundId: string;
  settledTime: string;
  stake: number;
  winlose: number;
};

export type betResultMock = {
  code: number;
  msg: string;
  result: ResultsMock;
  status: number;
};
