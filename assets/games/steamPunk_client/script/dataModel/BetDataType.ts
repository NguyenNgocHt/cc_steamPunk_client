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
