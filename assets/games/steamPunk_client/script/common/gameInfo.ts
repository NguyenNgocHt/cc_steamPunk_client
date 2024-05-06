import { _decorator } from "cc";
import { EventBus } from "../../../../framework/common/EventBus";
import { GAME_EVENT } from "../network/networkDefine";
import { GameInfoData } from "../dataModel/GameInfoDataType";
import { sys } from "cc";
import { LOCAL_STORAGE_KEY_WORD } from "./Path";
import { JsonAsset } from "cc";
import { IGameInfo } from "../interfaces/Common_interfaces";
const { ccclass, property } = _decorator;

export type PendingConfig = {
  currentAccumulatedMultiplier: number;
  currentStake: number;
  logs: number[];
  stake?: number;
  multiplier?: number;
  cashoutMultiplier?: number;
  position?: number;
};
@ccclass("GameInfo")
export default class GameInfo implements IGameInfo {
  init() {
    this.registerEvent();
  }
  registerEvent() {
    EventBus.on(GAME_EVENT.SEND_TO_GAME_INFO, this.setGameInfo.bind(this));
  }
  unRegisterEvent() {
    EventBus.off(GAME_EVENT.SEND_TO_GAME_INFO, this.setGameInfo.bind(this));
  }
  setGameInfo(data: GameInfoData) {
    console.log("come in game info", data);
    let gameInfo: GameInfoData = null;
    gameInfo = {
      balance: data.balance,
      betlines: data.betlines,
      currency: data.currency,
      settings: data.settings,
      pending: data.pending,
      denominations: data.denominations,
      username: data.username,
    };
    sys.localStorage.setItem(LOCAL_STORAGE_KEY_WORD.GAME_INFO, JSON.stringify(gameInfo));
  }
}
