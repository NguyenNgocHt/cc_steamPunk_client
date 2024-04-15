import { playerInfo } from "../dataModel/PlayerDataType";
export interface IPLayerInfo {
  init();
  handlePlayerInfo(data);
  getPlayerInfo(): playerInfo;
}
