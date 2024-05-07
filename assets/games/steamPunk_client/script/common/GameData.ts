import { _decorator, Component, Node } from "cc";
import { IGameData } from "../interfaces/Common_interfaces";
import { EventBus } from "../../../../framework/common/EventBus";
import { GAME_EVENT } from "../network/networkDefine";
import { LOCAL_STORAGE_KEY_WORD } from "./Path";
import { sys } from "cc";
import { gameData } from "../dataModel/GameInfoDataType";
import { Layers } from "cc";
import { game } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameData")
export class GameData implements IGameData {
  init() {
    this.registerEvent();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.SEND_GAME_DATA, this.setGameData.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.SEND_GAME_DATA, this.setGameData.bind(this));
  }

  setGameData(data: gameData) {
    console.log("data game data", data );
    let v: gameData = null;
    v = {
      api: data.api,
      currency: data.currency,
      env: data.env,
      gameCode: data.gameCode,
      ip: data.ip,
      language: data.language,
      operator: data.operator,
      playmode: data.playmode,
      server: data.server,
      signature: data.signature,
      staticUrl: data.staticUrl,
      subpath: data.subpath,
      timestamp: data.timestamp,
      token: data.token,
      username: data.username,
    };
    sys.localStorage.setItem(LOCAL_STORAGE_KEY_WORD.GAME_DATA, JSON.stringify(v));
  }

  getGameData(): gameData {
    let gameData = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.GAME_DATA));
    return gameData ? gameData : null;
  }
}
