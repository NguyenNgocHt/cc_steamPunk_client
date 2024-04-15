import { loginResult } from "../dataModel/LoginDataType_sendToClient";
import { playerInfoPackage } from "../dataModel/PlayerDataType";
import { loginData } from "../dataModel/LoginDataType_sendToSever";

export interface IAuthView {
  NodeMovingToLeft(CenterNode, rightNode): void;
}

export interface IRegisterSevice {
  checkRegisterData(msgData): void;
}

export interface ILoginView {
  init(loginControler: ILoginController);
  showUserNameWrong(msg): void;

  showPasswordWrong(msg): void;

  resetAllMessenger(): void;

  onClickLoginBtn(): void;
}

export interface ILoginSevice {
  checkLoginResultData(loginResult: loginResult);
}

export interface ILoginModel {}

export interface IMockAuthenticationService {
  process(username: string, password: string): loginResult;

  getPlayerInfoPackage(userName: string, password: string): playerInfoPackage;
}

export interface ILoginController {
  onLogin(data: loginData);

  switchToTheHomeScreen();

  showUserNameError();

  showPasswordError();

  showUserNameAndPasswordError();
}
