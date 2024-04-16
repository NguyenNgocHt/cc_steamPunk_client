import { _decorator } from "cc";
import { EventListener } from "../../../../framework/common/EventListener";
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
    EventListener.on(GAME_EVENT.SEND_TO_GAME_INFO, this.setGameInfo.bind(this));
  }
  offEvent() {
    EventListener.off(GAME_EVENT.SEND_TO_GAME_INFO, this.setGameInfo.bind(this));
  }
  setGameInfo(data: GameInfoData) {
    console.log("come in game info", data);
    let gameInfo: GameInfoData = null;
    gameInfo = {
      min_bet: data.min_bet,
      max_bet: data.max_bet,
      client_seed: data.client_seed,
      server_seed_hash: data.server_seed_hash,
      PayoutRates: data.PayoutRates,
      server_seed: data.server_seed,
      settings: data.settings,
      pending: data.pending,
      denominations: data.denominations,
    };
    let dataJson = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.GAME_INFO));
    if (dataJson == null) {
      sys.localStorage.setItem(LOCAL_STORAGE_KEY_WORD.GAME_INFO, JSON.stringify(gameInfo));
    }
  }
  getGameInfo(): GameInfoData {
    let gameInfo = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.GAME_INFO));
    if (gameInfo) {
      return gameInfo;
    }
  }
}
