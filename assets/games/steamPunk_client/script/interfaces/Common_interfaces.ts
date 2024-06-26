import { SettingsData } from "./../dataModel/GameInfoDataType";
import { GameInfoData } from "../dataModel/GameInfoDataType";
import { PendingData } from "../dataModel/GameInfoDataType";
import { gameData } from "./../dataModel/GameInfoDataType";

export interface IPLayerInfo {
  init();
  handlePlayerInfo(data);
}

export interface IGameInfo {
  init();
}

export interface ISpiningAnim {
  spinningStart();
  spinningStop();
  changeTimeLoopSpinning(newTimeLoop: number);
}

export interface IGameInfoService {
  init();
  getGameInfo(): GameInfoData;
  getListDenominations(): number[];
  getListPending(): PendingData;
  getlistSettings(): SettingsData;
}
export interface IPoolController {
  init();
  getSymbolNode(symbolNumber: number): any;
  pushSymbolNode(symbolName, symbolNode);
}

export interface IGameData {
  init();
  setGameData(data: gameData);
  getGameData(): gameData;
}
