import { GameInfoMock } from "../dataModel/MockConfigData";
import { betResultMock } from "../dataModel/MockConfigData";

export interface ISocketIOClient {
  on(socketEvent: string, callbackData: Function, isOff: boolean);
  emit(socketEvent: string, data?: any);
  connectServer(linkServer: string, auth);
}

export interface IConnectSeverServiceMock {}

export interface IGameInfoServiceMock {
  init();
  getGameInfo(): GameInfoMock;
}

export interface IBetResultsServiceMock {
  init();
  getBetResults(data): betResultMock;
}
