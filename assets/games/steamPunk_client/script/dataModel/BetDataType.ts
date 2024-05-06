export type BetResultsData = {
  balance: number;
  betLines: number;
  freeSpins: number;
  jackpot: number;
  paylines: any[];
  payout: number;
  result: {};
  stake: number;
  winLose: number;
};

export type BetData = {
  code: number;
  msg: string;
  result: {};
  status: number;
};

export type NewBetResultList = {
  reel1: number[];
  reel2: number[];
  reel3: number[];
};

export type PayLinesDaTa = {
  payline: number;
  playoutRate: number;
  symbols: number[];
  winType: string;
};

export type paylineConvert = {
  rowIndex: number;
  symbols: number[];
  winType: string;
};

export type SendBet = {
  stake: number;
  betLines: number;
};

export type BetResult = {
  code: number;
  msg: string;
  results: Results;
  status: number;
};

export type Results = {
  balance: number;
  betLines: number;
  betTime: string;
  freeSpins: number;
  id: string;
  jackpot: number;
  paylines: Paylines;
  payout: number;
  playType: string;
  processedTime: string;
  refId: string;
  result: Result;
  roundId: string;
  settledTime: string;
  stake: number;
  winlose: number;
};

export type Paylines = Payline[];

export type Payline = {
  payline: number;
  payoutRate: number;
  symbols: number[];
  winType: string;
};

export type Result = {
  reel1: number[];
  reel2: number[];
  reel3: number[];
};
