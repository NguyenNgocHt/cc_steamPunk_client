import { GameInfoMock, PendingMock, SettingsMock } from "./../dataModel/MockConfigData";
import { _decorator, Component, Node } from "cc";
import { IGameInfoServiceMock } from "../interfaces/Mock_interfaces";
const { ccclass, property } = _decorator;

@ccclass("GameInfoServiceMock")
export class GameInfoServiceMock implements IGameInfoServiceMock {
    denomination = [0.05, 0.1, 0.15, 0.25, 0.4, 0.5, 1, 2.5, 5, 10, 15, 20, 25, 35, 50];
    
  getGameInfo(): GameInfoMock {
    let pendingData: PendingMock = {
      freeSpins: 0,
      refId: "",
      roundId: "",
      stake: 0.05,
    };

    let settingsData: SettingsMock = {
      Denominations: this.denomination,
      MaxBet: 50,
      MinBet: 0.05,
      currency: "USD",
    };

    let gameInfo: GameInfoMock = null;
    gameInfo = {
      balance: 4520,
      betlines: 1,
      currency: "USD",
      Denominations: this.denomination,
      pending: pendingData,
      settings: settingsData,
      username: "ngocdev",
    };
    return gameInfo;
  }
}
