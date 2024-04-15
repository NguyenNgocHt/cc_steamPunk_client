import { loginResult } from "./../../../dataModel/LoginDataType_sendToClient";
import { _decorator } from "cc";
import { IMockAuthenticationService } from "../../../interfaces/Login_interfaces";
import { CLIENT_COMMAN_ID_IP, SEVER_COMMAN_ID_OP } from "../../../common/define";
import { playerInfoPackage } from "../../../dataModel/PlayerDataType";
const { ccclass, property } = _decorator;

@ccclass("MockAuthenticationService")
export class MockAuthenticationService implements IMockAuthenticationService {
  private _isStatusLogin: boolean = false;
  private _isStatusUseName: boolean = false;
  private _isStatusPassword: boolean = false;

  private _playerInfo: playerInfoPackage = null;
  process(username: string, password: string): loginResult {
    this._isStatusLogin = false;
    this._isStatusUseName = false;
    this._isStatusPassword = false;

    if (username === "ngocdev") {
      this._isStatusUseName = true;
    }

    if (password === "123456") {
      this._isStatusPassword = true;
    }

    return this.checkStatusLogin(this._isStatusUseName, this._isStatusPassword);
  }

  checkStatusLogin(isStatusUserName: boolean, isStatusPassword): loginResult {
    if (isStatusUserName && isStatusPassword) {
      this._isStatusLogin = true;

      return this.setLoginResultData();
    } else if (isStatusUserName && !isStatusPassword) {
      this._isStatusLogin = false;

      return this.setLoginResultData();
    } else if (!isStatusUserName && isStatusPassword) {
      this._isStatusLogin = false;

      return this.setLoginResultData();
    } else if (!isStatusUserName && !isStatusPassword) {
      this._isStatusLogin = false;

      return this.setLoginResultData();
    }
  }

  setLoginResultData(): loginResult {
    let loginResult: loginResult = null;

    loginResult = {
      ID: SEVER_COMMAN_ID_OP.LOGIN_RESULT_ID,
      isLogin: this._isStatusLogin,
      isUserName: this._isStatusUseName,
      isPassword: this._isStatusPassword,
    };

    return loginResult;
  }

  getPlayerInfoPackage(userName: string, password: string): playerInfoPackage {
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
