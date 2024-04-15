import { _decorator, Component, Node } from "cc";
import { loginData } from "../../../dataModel/LoginDataType_sendToSever";
import { EditBox } from "cc";
import { CLIENT_COMMAN_ID_OP } from "../../../common/define";
import { Label } from "cc";
import { ILoginController, ILoginView } from "../../../interfaces/Login_interfaces";
const { ccclass, property } = _decorator;
@ccclass("LoginView")
export class LoginView extends Component implements ILoginView {
  @property(EditBox)
  UserName: EditBox = null;
  @property(EditBox)
  Password: EditBox = null;

  @property(Label)
  NotifyForUserName: Label = null;
  @property(Label)
  NotifyForPassword: Label = null;

  private _loginController: ILoginController = null;

  init(loginControler: ILoginController) {
    this._loginController = loginControler;
  }

  onClickLoginBtn() {
    let loginData: loginData = null;
    loginData = {
      id: CLIENT_COMMAN_ID_OP.LOGIN_ID,

      userName: this.UserName.string,

      password: this.Password.string,
    };
    console.log("login data", loginData);
    this._loginController.onLogin(loginData);
  }

  showUserNameWrong(msg: string) {
    this.NotifyForUserName.string = msg;
  }

  showPasswordWrong(msg: string) {
    this.NotifyForPassword.string = msg;
  }

  resetAllMessenger() {
    this.NotifyForPassword.string = "";
    this.NotifyForUserName.string = "";
  }
}
