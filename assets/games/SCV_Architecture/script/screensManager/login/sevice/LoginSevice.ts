import { _decorator } from "cc";
import { loginResult } from "../../../dataModel/LoginDataType_sendToClient";
import { ILoginController, ILoginSevice } from "../../../interfaces/Login_interfaces";
const { ccclass, property } = _decorator;

@ccclass("LoginSevice")
export class LoginSevice implements ILoginSevice {
  private _loginController: ILoginController = null;

  constructor(loginController: ILoginController) {
    this._loginController = loginController;
  }

  checkLoginResultData(loginResult: loginResult) {
    let checkLoginResult = loginResult;

    if (checkLoginResult.isLogin) {
      console.log(this._loginController);
      this._loginController.switchToTheHomeScreen();
    } else {
      if (!checkLoginResult.isUserName) {
        this._loginController.showUserNameError();
      }
      if (!checkLoginResult.isPassword) {
        this._loginController.showPasswordError();
      }
      if (!checkLoginResult.isUserName && !checkLoginResult.isPassword) {
        this._loginController.showUserNameAndPasswordError();
      }
    }
  }
}
