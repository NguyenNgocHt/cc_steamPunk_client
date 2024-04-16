import { sys } from "cc";
import { playerInfo, playerInfoPackage } from "./../dataModel/PlayerDataType";
import { _decorator, Component, Node } from "cc";
import { LOCAL_STORAGE_KEY_WORD } from "./Path";
import { EventHandler } from "cc";
import { EventListener } from "../../../../framework/common/EventListener";
import { GAME_EVENT } from "../network/networkDefine";
import { IPLayerInfo } from "../interfaces/Common_interfaces";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfo")
export class PlayerInfo implements IPLayerInfo {
  playerInfo: playerInfo = null;
  init() {
    this.registerEvent();
  }
  registerEvent() {
    EventListener.on(GAME_EVENT.SEND_TO_PLAYER_INFO, this.handlePlayerInfo.bind(this));
  }
  offEvent() {
    EventListener.off(GAME_EVENT.SEND_TO_PLAYER_INFO, this.handlePlayerInfo.bind(this));
  }
  handlePlayerInfo(data: playerInfo) {
    console.log("come in player info", data);
    this.playerInfo = {
      userName: data.userName,
      money: data.money,
      currency: data.currency,
    };
    let playerInfo = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.PLAYER_INFO));
    if (playerInfo == null) {
      sys.localStorage.setItem(LOCAL_STORAGE_KEY_WORD.PLAYER_INFO, JSON.stringify(this.playerInfo));
    }
  }
  getPlayerInfo(): playerInfo {
    let playerInfo = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.PLAYER_INFO));
    if (playerInfo) {
      return playerInfo;
    }
  }
}
