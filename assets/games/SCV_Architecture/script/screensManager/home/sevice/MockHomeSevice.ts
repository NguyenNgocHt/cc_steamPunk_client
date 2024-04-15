import { _decorator } from "cc";
import { IHomeSevice } from "../../../interfaces/Home_interfaces";
import { playerInfoPackage } from "../../../dataModel/PlayerDataType";
import { CLIENT_COMMAN_ID_IP } from "../../../common/define";
CLIENT_COMMAN_ID_IP;
const { ccclass, property } = _decorator;

@ccclass("MockHomeSevice")
export class MockHomeSevice implements IHomeSevice {
  private _playerInfo: playerInfoPackage = null;

  getPlayerInfoByPlayerID(playerID: number): playerInfoPackage {
    this._playerInfo = {
      ID: CLIENT_COMMAN_ID_IP.PLAYER_INFO_ID,
      playerName: "ngocdev",
      avatarID: 21,
      playerID: 1034,
      money: 1000,
    };

    return this._playerInfo;
  }
}
