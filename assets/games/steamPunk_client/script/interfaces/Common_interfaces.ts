import { SettingsData } from "./../dataModel/GameInfoDataType";
import { playerInfo } from "../dataModel/PlayerDataType";
import { GameInfoData } from "../dataModel/GameInfoDataType";
import { PendingData } from "../dataModel/GameInfoDataType";

export interface IPLayerInfo {
  init();
  handlePlayerInfo(data);
  getPlayerInfo(): playerInfo;
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
