import { GameInfoData } from "./../../../../dataModel/GameInfoDataType";
import { _decorator } from "cc";
import BaseScreen from "../../../../../../../framework/ui/BaseScreen";
import Utils from "../../../../../../../framework/utils/Utils";
import { LogUtil } from "../../../../../../../framework/utils/LogUtil";
import { SocketIoClient } from "../../../../../../../framework/network/SocketIoClient";
import { GAME_EVENT, SOCKET_EVENT } from "../../../../network/networkDefine";
import { PlayerController } from "../../player/controller/PlayerController";
import GameInfo from "../../../../common/gameInfo";
import { playerInfo } from "../../../../dataModel/PlayerDataType";
import { PlayerInfo } from "../../../../common/PlayerInfo";
import { IGameInfo, IPLayerInfo } from "../../../../interfaces/Common_interfaces";
import { EventListener } from "../../../../../../../framework/common/EventListener";
import { IPlayerController } from "../../../../interfaces/gamePlay/player_interfaces";
import { landingController } from "../../landing/controller/LandingController";

const { ccclass, property } = _decorator;

@ccclass("gamePlayController")
export class gamePlayController extends BaseScreen {
  @property(PlayerController)
  PlayerControl: PlayerController = null;

  @property(landingController)
  landingGroup: landingController = null;

  gameInfoData: GameInfoData = null;
  playerInfoData: playerInfo = null;

  _playerInfo: IPLayerInfo = null;
  _gameInfo: IGameInfo = null;
  _playerController: IPlayerController = null;
  onLoad() {
    this.landingGroup.node.active = true;
  }
  start() {
    this.connectServer();
    this.init();
    this.registerPlayerInfo();
    this.registerGameInfo();
  }
  init() {
    this._playerInfo = new PlayerInfo();
    this._gameInfo = new GameInfo();
    this._playerController = this.PlayerControl;
  }

  registerPlayerInfo() {
    this._playerInfo.init();
  }

  registerGameInfo() {
    this._gameInfo.init();
  }

  protected connectServer() {
    let auth = this.getAuthLogin(window.location.href);
    if (!auth || !auth.server) {
      LogUtil.log("Server not found!");
      return;
    }

    SocketIoClient.instance.connectServer(auth.server, { auth: auth, path: auth.subpath });
    this.initEventNetwork();
    this.resetUi();
    if (auth) {
      console.log("auth", auth);
    }
  }
  protected initEventNetwork() {
    LogUtil.log("Game info command:");
    SocketIoClient.instance.on(SOCKET_EVENT.CONNECTION, this.onConnection.bind(this));
    SocketIoClient.instance.on(SOCKET_EVENT.CONNECT, this.onConnect.bind(this));
    SocketIoClient.instance.on(SOCKET_EVENT.DISCONNECT, this.ondisconnect.bind(this));
    SocketIoClient.instance.on(SOCKET_EVENT.CONNECT_ERROR, this.onConnectError.bind(this));

    SocketIoClient.instance.on(SOCKET_EVENT.UPDATE_COIN, this.onUpdateCoin.bind(this));
    SocketIoClient.instance.on(SOCKET_EVENT.BALANCE, this.onUpdateBalance.bind(this));
    SocketIoClient.instance.on(SOCKET_EVENT.GAME_INFO, this.onGameInfo.bind(this));
    SocketIoClient.instance.on(SOCKET_EVENT.LOGIN, this.onLogin.bind(this));
    SocketIoClient.instance.on(SOCKET_EVENT.BET, this.onBetHandler.bind(this));
  }
  protected getAuthLogin(url_string: string) {
    let dataDecode = Utils.parseUrlData(url_string);
    if (!dataDecode) {
      return;
    }
    LogUtil.ENV = dataDecode.env;
    return dataDecode;
  }
  resetUi() {}

  onBetHandler() {}

  onLogin(msg) {
    console.log("come in onLogin", msg);
  }
  onGameInfo(data) {
    this.gameInfoData = data as GameInfoData;
    this.playerInfoData = {
      userName: data.username,
      money: data.balance,
      currency: data.currency,
    };
    console.log("game info", this.gameInfoData);
    console.log("player info", this.playerInfoData);
    EventListener.dispatchEvent(GAME_EVENT.SEND_TO_PLAYER_INFO, this.playerInfoData);
    EventListener.dispatchEvent(GAME_EVENT.SEND_TO_GAME_INFO, this.gameInfoData);
    this._playerController.setPlayerInfo(this.playerInfoData);
  }
  onUpdateBalance() {}

  onUpdateCoin() {}

  onConnectError() {}

  ondisconnect() {}

  onConnect() {
    console.log("come in onConnect");
  }

  onConnection() {
    console.log();
  }
}
