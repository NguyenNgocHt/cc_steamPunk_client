import { _decorator } from "cc";
import { EventListener } from "../../../../../../framework/common/EventListener";
import { GAME_EVENT } from "../../../network/networkDefine";
import { loginResult } from "../../../dataModel/LoginDataType_sendToClient";
import { ILoginModel, ILoginSevice } from "../../../interfaces/Login_interfaces";
const { ccclass, property } = _decorator;

@ccclass("LoginModel")
export class LoginModel implements ILoginModel {
  _loginResult: loginResult = null;
  _loginSevice: ILoginSevice = null;

  constructor(loginService: ILoginSevice) {
    this._loginSevice = loginService;
    this.registerEvent();
  }
  registerEvent() {
    EventListener.on(GAME_EVENT.SEND_LOGIN_RESULT_TO_LOGIN_MODEL, this.handleLoginResult.bind(this));
  }

  offEvent() {
    EventListener.off(GAME_EVENT.SEND_LOGIN_RESULT_TO_LOGIN_MODEL, this.handleLoginResult.bind(this));
  }

  handleLoginResult(loginResult: loginResult) {
    this.setLoginResul(loginResult);

    this._loginSevice.checkLoginResultData(loginResult);
  }

  setLoginResul(loginResult: loginResult) {
    this._loginResult = loginResult;

    console.log("login result", this._loginResult);
  }

  getLoginResult(): loginResult {
    return this._loginResult;
  }
}
