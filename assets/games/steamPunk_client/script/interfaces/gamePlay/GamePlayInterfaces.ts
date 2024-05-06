import { BetData } from "../../dataModel/BetDataType";
import { BetResultsData } from "../../dataModel/BetDataType";
import { PayLinesDaTa } from "../../dataModel/BetDataType";
import { playerInfo } from "../../dataModel/PlayerDataType";

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

export interface IGameLogicController {
  initGameStart();
}

export interface IPlayerInfoService {
  handlePlayerInfo(data: playerInfo);

  getPlayerInfo(): playerInfo;

  getPlayerName(): string;

  getCurrentMoney(): number;

  getCurrency(): string;

  updateCurrentMoney(currentMoney: number);
}
