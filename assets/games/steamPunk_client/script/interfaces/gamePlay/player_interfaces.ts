import { playerInfo } from "../../dataModel/PlayerDataType";
export interface IPlayerController {
  setPlayerInfo(data: playerInfo);
}
export interface IPlayerInfoController {
  setPlayerInfo(data: playerInfo);
}
export interface ITrendHidtoryController {}
export interface IPlayerInfoView {
  setPlayerInfo(data: playerInfo);
}
export interface ITrendHistoryView {}
