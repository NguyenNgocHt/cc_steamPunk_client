export type BetResultsData = {
  balance: number;
  betLines: number;
  freeSpins: number;
  jackpot: number;
  paylines: number;
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
