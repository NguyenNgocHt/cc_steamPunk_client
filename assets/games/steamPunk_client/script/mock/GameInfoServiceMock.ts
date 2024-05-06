import { SettingsData } from "./../dataModel/GameInfoDataType";
import { GameInfoMock, PendingMock, SettingsMock } from "./../dataModel/MockConfigData";
import { _decorator, Component, Node } from "cc";
import { IGameInfoServiceMock } from "../interfaces/Mock_interfaces";
import { IGameInfoService, IPLayerInfo } from "../interfaces/Common_interfaces";
import { PlayerInfo } from "../common/PlayerInfo";
import GameInfo from "../common/GameInfo";
import { GameInfoData, PendingData } from "../dataModel/GameInfoDataType";
import { Settings } from "cc";

const { ccclass, property } = _decorator;

@ccclass("GameInfoServiceMock")
export class GameInfoServiceMock implements IGameInfoService {
  denomination = [0.05, 0.1, 0.15, 0.25, 0.4, 0.5, 1, 2.5, 5, 10, 15, 20, 25, 35, 50];
  currentMoney: IPLayerInfo = null;

  init() {
    this.currentMoney = new PlayerInfo();
  }
  getGameInfo(): GameInfoData {
    let pendingData: PendingData = {
      freeSpins: 0,
      refId: "",
      roundId: "",
      stake: 0.05,
    };

    let settingsData: SettingsData = {
      Denominations: this.denomination,
      MaxBet: 50,
      MinBet: 0.05,
      currency: "USD",
    };

    let gameInfo: GameInfoData = null;
    gameInfo = {
      balance: this.currentMoney.getCurrentMoney(),
      betlines: 1,
      currency: "USD",
      denominations: this.denomination,
      pending: pendingData,
      settings: settingsData,
      username: "ngocdev",
    };
    return gameInfo;
  }

  getListDenominations(): number[] {
    let listNumber: number[] = [];
    return listNumber;
  }

  getListPending(): PendingData {
    let pendingData: PendingData = null;
    return pendingData;
  }

  getlistSettings(): SettingsData {
    let settingData: SettingsData = null;
    return settingData;
  }
}
