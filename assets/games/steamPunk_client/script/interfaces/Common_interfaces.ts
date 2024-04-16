import { playerInfo } from "../dataModel/PlayerDataType";
import { GameInfoData } from "../dataModel/GameInfoDataType";
export interface IPLayerInfo {
  init();
  handlePlayerInfo(data);
  getPlayerInfo(): playerInfo;
}
export interface IGameInfo {
  init();
  getGameInfo(): GameInfoData;
}
