import { _decorator, Component, Node } from "cc";
import { IPlayerModel_Home, IPlayerSevice_home, IPlayerView, IHomeSevice } from "../../../interfaces/Home_interfaces";
import { Home_playerSevice } from "../sevice/Home_playerSvice";
import { Home_playerView } from "../view/Home_playerView";
import { EventListener } from "../../../../../../framework/common/EventListener";
import { GAME_EVENT } from "../../../network/networkDefine";
import { Player_ID } from "../../../dataModel/HomeDataType_sendToSever";
import { CLIENT_COMMAN_ID_OP } from "../../../common/define";
import { playerInfoPackage } from "../../../dataModel/PlayerDataType";
import { Home_playerModel } from "../model/Home_playerModel";
import { MockHomeSevice } from "../sevice/MockHomeSevice";
const { ccclass, property } = _decorator;

@ccclass("Home_playerControler")
export class Home_playerControler extends Component {
  @property(Home_playerView)
  PlayerView: Home_playerView = null;

  private _playerSevice: IPlayerSevice_home = null;
  private _playerView: IPlayerView = null;
  private _playerModel: IPlayerModel_Home = null;
  private _mockHomeSevice: IHomeSevice = null;

  onLoad() {
    this.initInterfaces(this.PlayerView);

    this.registerEvent();
  }

  registerEvent() {
    this._playerModel.registerEvent();

    this.registerEvent_playerControler();
  }

  registerEvent_playerControler() {
    EventListener.on(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_CONTROLER_IN_HOME, this.setPlayerView.bind(this));
  }

  offEvent() {
    EventListener.off(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_CONTROLER_IN_HOME, this.setPlayerView.bind(this));
  }

  start() {
    this.getPlayerIDFromPlayerSevice();
  }

  initInterfaces(iPlayerView: IPlayerView) {
    this._playerSevice = new Home_playerSevice();
    this._mockHomeSevice = new MockHomeSevice();

    this._playerModel = new Home_playerModel();

    this._playerView = iPlayerView;
  }
  getPlayerIDFromPlayerSevice() {
    let playerID = this._playerSevice.getPlayerID();

    let playerIDPackage: Player_ID = null;
    playerIDPackage = {
      id: CLIENT_COMMAN_ID_OP.SEND_PLAYERID_ID,
      playerID: playerID,
    };

    let playerInfo = this._mockHomeSevice.getPlayerInfoByPlayerID(playerID);

    EventListener.dispatchEvent(GAME_EVENT.SEND_PLAYER_INFO_TO_PLAYER_MODEL_IN_HOME, playerInfo);
  }

  setPlayerView(playerInfo: playerInfoPackage) {
    this._playerView.setAvatarByAvatarID(playerInfo.avatarID);

    this._playerView.setCoin(playerInfo.money);

    this._playerView.setUserName(playerInfo.playerName);
  }
}
