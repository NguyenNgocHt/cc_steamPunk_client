import { BetData } from "../../dataModel/BetDataType";
import { BetResultsData } from "../../dataModel/BetDataType";
import { PayLinesDaTa } from "../../dataModel/BetDataType";
export interface IBetResultService {
  handleBetResultData(betInfo: BetData);

  getBetResult(): BetResultsData;

  getPayLines(betResult: BetResultsData): PayLinesDaTa[];

  getBalance(): number;

  getMultiplierValue(): number;
}

export interface IHistoryService {
  initGameData();

  getHistory(gameData: any, callBack: Function);
}
