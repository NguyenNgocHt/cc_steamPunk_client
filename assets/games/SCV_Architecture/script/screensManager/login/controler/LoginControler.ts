import { _decorator, Component, Prefab, instantiate, sp } from "cc";
import { EventListener } from "../../../../../../framework/common/EventListener";
import { GAME_EVENT } from "../../../network/networkDefine";
import ScreenManager from "../../../../../../framework/ui/ScreenManager";
import BaseScreen from "../../../../../../framework/ui/BaseScreen";
import { MESSENGER_DEFINE, Path, SKELETON_KEY_WORK } from "../../../common/Path";
import { IMockAuthenticationService, ILoginController, ILoginModel, ILoginSevice, ILoginView } from "../../../interfaces/Login_interfaces";
import { LoginSevice } from "../sevice/LoginSevice";
import { LoginModel } from "../model/LoginModel";
import { MockAuthenticationService } from "../sevice/MockAuthenticationService";
import { IPLayerInfo } from "../../../interfaces/Common_interfaces";
import { PlayerInfo } from "../../../common/PlayerInfo";
import { LoginView } from "../view/LoginView";
import { loginData } from "../../../dataModel/LoginDataType_sendToSever";
const { ccclass, property } = _decorator;

@ccclass("LoginController")
export class LoginController extends Component implements ILoginController {
  @property(LoginView)
  LoginView: LoginView = null;

  private _loginView: ILoginView = null;
  private _loginSevice: ILoginSevice = null;
  private _loginModel: ILoginModel = null;
  private _mockAuthenTicationSevice: IMockAuthenticationService = null;
  private _playerInfo: IPLayerInfo = null;
  onLoad() {
    this.init();
  }
  init() {
    this.initLoginView(this.LoginView);

    this.initMockAuthenTicationService();

    this.initLoginService();

    this.initLoginModel();

    this.init_playerInfo();

    this.registerEvents();
  }

  //init
  initLoginView(loginView: ILoginView) {
    this._loginView = loginView;
  }

  initLoginService() {
    this._loginSevice = new LoginSevice(this);
  }

  initMockAuthenTicationService() {
    this._mockAuthenTicationSevice = new MockAuthenticationService();
  }

  initLoginModel() {
    this._loginModel = new LoginModel(this._loginSevice);
  }

  init_playerInfo() {
    this._playerInfo = new PlayerInfo();
  }

  //registerEvent
  registerEvents() {
    this._loginView.init(this);
    this._playerInfo.init();
  }

  onLogin(data: loginData) {
    let loginResult = this._mockAuthenTicationSevice.process(data.userName, data.password);

    let playerInfo = this._mockAuthenTicationSevice.getPlayerInfoPackage(data.userName, data.password);

    EventListener.dispatchEvent(GAME_EVENT.SEND_LOGIN_RESULT_TO_LOGIN_MODEL, loginResult);

    EventListener.dispatchEvent(GAME_EVENT.SEND_TO_PLAYER_INFO, playerInfo);
  }

  switchToTheHomeScreen() {
    this.resetShowMessenger();
    let pfFxCloud = ScreenManager.instance.assetBundle.get(Path.TRANSITION_CLOUD, Prefab)!;
    let nodeCloud = instantiate(pfFxCloud);

    ScreenManager.instance.showEffect(nodeCloud);

    let spineCloud = nodeCloud.getComponent(sp.Skeleton);

    let entry = spineCloud.setAnimation(0, SKELETON_KEY_WORK.TRANSITION_TO_LUCKY, false);

    spineCloud.setTrackCompleteListener(entry, (x: any, ev: any) => {
      ScreenManager.instance.removeAllEffects();
    });

    spineCloud.setTrackEventListener(entry, (x: any, ev: any) => {
      if (ev && ev.data && ev.data.name && ev.data.name == SKELETON_KEY_WORK.NAME_OF_RETURN_EVENT) {
        let play_screen = ScreenManager.instance.assetBundle.get(Path.HOME_SCREEN, Prefab)!;

        ScreenManager.instance.pushScreen(play_screen, (screen: BaseScreen) => {}, true);
      }
    });
  }
  //loginView show message
  resetShowMessenger() {
    this._loginView.showUserNameWrong("");

    this._loginView.showPasswordWrong("");
  }

  showUserNameError() {
    this._loginView.showUserNameWrong(MESSENGER_DEFINE.USER_NAME_WRONG);

    this._loginView.showPasswordWrong("");
  }

  showPasswordError() {
    this._loginView.showPasswordWrong(MESSENGER_DEFINE.PASSWORD_WRONG);

    this._loginView.showUserNameWrong("");
  }

  showUserNameAndPasswordError() {
    this._loginView.showUserNameWrong(MESSENGER_DEFINE.USER_NAME_WRONG);

    this._loginView.showPasswordWrong(MESSENGER_DEFINE.PASSWORD_WRONG);
  }
}
