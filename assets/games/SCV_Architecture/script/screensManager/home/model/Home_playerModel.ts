import { _decorator } from "cc";
import { playerInfoPackage } from "../../../dataModel/PlayerDataType";
import { IPlayerModel_Home } from "../../../interfaces/Home_interfaces";
import { EventListener } from "../../../../../../framework/common/EventListener";
import { GAME_EVENT } from "../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("Home_playerModel")
export class Home_playerModel implements IPlayerModel_Home {
  private _playerInfo: playerInfoPackage = null;

  registerEvent() {
    EventListener.on(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_MODEL_IN_HOME, this.handlePlayerInfo.bind(this));
  }

  offEvent() {
    EventListener.off(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_MODEL_IN_HOME, this.handlePlayerInfo.bind(this));
  }

  handlePlayerInfo(playerInfo: playerInfoPackage) {
    console.log(playerInfo);

    EventListener.dispatchEvent(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_CONTROLER_IN_HOME, playerInfo);
  }

  setPlayerInfo(playerInfo: playerInfoPackage) {
    this._playerInfo = playerInfo;
  }

  getPlayerInfo(): playerInfoPackage {
    return this._playerInfo;
  }
}
