import { GameInfoData, PendingData } from "./../../../../dataModel/GameInfoDataType";
import { _decorator } from "cc";
import BaseScreen from "../../../../../../../framework/ui/BaseScreen";
import Utils from "../../../../../../../framework/utils/Utils";
import { LogUtil } from "../../../../../../../framework/utils/LogUtil";
import { SocketIoClient } from "../../../../../../../framework/network/SocketIoClient";
import { GAME_EVENT, SOCKET_EVENT } from "../../../../network/networkDefine";
import { PlayerController } from "../../player/controller/PlayerController";
import GameInfo from "../../../../common/GameInfo";
import { playerInfo } from "../../../../dataModel/PlayerDataType";
import { PlayerInfo } from "../../../../common/PlayerInfo";
import { IGameInfo, IPLayerInfo } from "../../../../interfaces/Common_interfaces";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { landingController } from "../../landing/controller/LandingController";
import { PlayScreenView } from "../view/PlayScreenView";
import { BetController } from "../../bets/controller/BetController";
import { BetData, BetResultsData } from "../../../../dataModel/BetDataType";
import { IBetResultService } from "../../../../interfaces/gamePlay/GamePlayInterfaces";
import { BetResultService } from "../service/BetResultService";
import { GameLayerController } from "../../mainLayer/controller/GameLayerController";

interface ISocketIO {
  on(event: string, cb: Function): void;
  emit(event: string);
}

class SocketIOMock implements ISocketIO {
  public static Instance: SocketIOMock;
  on(event: string, cb: Function) {}
  emit(event: string) {}
}

const { ccclass, property } = _decorator;

@ccclass("gamePlayController")
export class gamePlayController extends BaseScreen {
  @property(GameLayerController)
  gameLayerControl: GameLayerController = null;

  @property(PlayerController)
  PlayerControl: PlayerController = null;

  @property(landingController)
  landingGroup: landingController = null;

  @property(BetController)
  betControl: BetController = null;

  @property(PlayScreenView)
  playScreenView: PlayScreenView = null;

  gameInfoData: GameInfoData = null;
  playerInfoData: playerInfo = null;

  _playerInfo: IPLayerInfo = null;
  _gameInfo: IGameInfo = null;

  public betResulService: IBetResultService = null;
  public betInfoData: BetData = null;

  onLoad() {
    this.landingGroup.node.active = true;
  }

  start() {
    this.init();
    this.init1(new SocketIOMock());
    this.connectServer();
    this.registerPlayerInfo();
    this.registerGameInfo();
  }

  init() {
    this._playerInfo = new PlayerInfo();
    this._gameInfo = new GameInfo();

    this.betResulService = new BetResultService();
  }

  _socketIOInstance: ISocketIO;

  init1(socketIO: ISocketIO) {
    this._socketIOInstance = socketIO;
  }

  registerPlayerInfo() {
    this._playerInfo.init();
  }

  registerGameInfo() {
    this._gameInfo.init();
  }

  protected initEventNetwork() {
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

  protected connectServer() {
    let auth = this.getAuthLogin(window.location.href);
    if (!auth || !auth.server) {
      LogUtil.log("Server not found!");
      return;
    }

    SocketIoClient.instance.connectServer(auth.server, { auth: auth, path: auth.subpath });
    this.initEventNetwork();
    if (auth) {
      console.log("auth", auth);
    }
  }

  protected getAuthLogin(url_string: string) {
    let dataDecode = Utils.parseUrlData(url_string);
    if (!dataDecode) {
      return;
    }
    LogUtil.ENV = dataDecode.env;
    return dataDecode;
  }

  onBetHandler(msg) {
    console.log("msg bet", msg);
    let betData: BetData = null;
    betData = msg as BetData;
    this.betInfoData = betData;
    let betResultData = betData.result as BetResultsData;

    this.betResulService.handleBetResultData(betData);

    this.gameLayerControl.handleBetResult(betResultData);

    this.PlayerControl.minusMoneyBet(betResultData.stake);

    this.betControl.changeBetbtnSatus();
    EventBus.dispatchEvent(GAME_EVENT.SEND_BET_RESULT_DATA, betData);
  }

  onLogin(msg) {
    console.log("come in onLogin", msg);
  }

  onGameInfo(data) {
    this.gameInfoData = data as GameInfoData;
    let pendingData = this.gameInfoData.pending as PendingData;
    if (pendingData.freeSpins > 0) {
      EventBus.dispatchEvent(GAME_EVENT.PENDING_DATA, pendingData);
    }
    console.log(pendingData);
    this.playerInfoData = {
      userName: data.username,
      money: data.balance,
      currency: data.currency,
    };
    EventBus.dispatchEvent(GAME_EVENT.SEND_TO_PLAYER_INFO, this.playerInfoData);

    EventBus.dispatchEvent(GAME_EVENT.SEND_TO_GAME_INFO, this.gameInfoData);

    this.PlayerControl.setPlayerInfo(this.playerInfoData);
  }

  onUpdateBalance() {
    console.log("onUpdate balance");
  }

  onUpdateCoin(msg) {
    console.log("update coin");
  }

  onConnectError() {
    console.log("onConect err");
  }

  ondisconnect() {
    console.log("on disconect");
  }

  onConnect() {
    console.log("come in onConnect");
  }

  onConnection() {
    console.log("on connecttion");
  }
}
