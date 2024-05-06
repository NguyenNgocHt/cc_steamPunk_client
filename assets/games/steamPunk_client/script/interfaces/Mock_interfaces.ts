import GameInfo from "../common/GameInfo";
import { GameInfoData } from "../dataModel/GameInfoDataType";
import { GameInfoMock } from "../dataModel/MockConfigData";
import { betResultMock } from "../dataModel/MockConfigData";
import { IGameInfo } from "./Common_interfaces";

export interface ISocketIOClient {
  on(socketEvent: string, callbackData: Function, isOff: boolean);
  emit(socketEvent: string, data?: any);
  connectServer(linkServer: string, auth);
}

export interface IConnectSeverServiceMock {}

export interface IGameInfoServiceMock {
  init();
  getGameInfo(): GameInfoData;
}

export interface IBetResultsServiceMock {
  init();
  getBetResults(data): betResultMock;
}
