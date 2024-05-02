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
import { IGameData, IGameInfo, IPLayerInfo } from "../../../../interfaces/Common_interfaces";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { landingController } from "../../landing/controller/LandingController";
import { PlayScreenView } from "../view/PlayScreenView";
import { BetController } from "../../bets/controller/BetController";
import { BetData, BetResultsData } from "../../../../dataModel/BetDataType";
import { IBetResultService } from "../../../../interfaces/gamePlay/GamePlayInterfaces";
import { BetResultService } from "../service/BetResultService";
import { GameLayerController } from "../../mainLayer/controller/GameLayerController";
import { ISocketIOClient } from "../../../../interfaces/Mock_interfaces";
import { SocketIOMock } from "../../../../mock/SocketIOMock";
import { GameData } from "../../../../common/GameData";

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
  _gameData: IGameData = null;

  public betResultService: IBetResultService = null;
  public betInfoData: BetData = null;
  _socketIOInstance: ISocketIOClient = null;

  onLoad() {
    this.landingGroup.node.active = true;
  }

  start() {
    this.init();
    this.initSocketIOClient();
    this.connectServer();
    this.registerPlayerInfo();
    this.registerGameInfo();
    this.registerGameData();
  }

  init() {
    this._playerInfo = new PlayerInfo();
    this._gameInfo = new GameInfo();
    this._gameData = new GameData();

    this.betResultService = new BetResultService();
  }

  initSocketIOClient() {
    // this._socketIOInstance = SocketIoClient.instance;
    this._socketIOInstance = SocketIOMock.instance;
  }

  registerPlayerInfo() {
    this._playerInfo.init();
  }

  registerGameInfo() {
    this._gameInfo.init();
  }
  registerGameData() {
    this._gameData.init();
  }
  protected initEventNetwork(socketIOClient: ISocketIOClient) {
    socketIOClient.on(SOCKET_EVENT.CONNECTION, this.onConnection.bind(this), true);
    socketIOClient.on(SOCKET_EVENT.CONNECT, this.onConnect.bind(this), true);
    socketIOClient.on(SOCKET_EVENT.DISCONNECT, this.ondisconnect.bind(this), true);
    socketIOClient.on(SOCKET_EVENT.CONNECT_ERROR, this.onConnectError.bind(this), true);

    socketIOClient.on(SOCKET_EVENT.UPDATE_COIN, this.onUpdateCoin.bind(this), true);
    socketIOClient.on(SOCKET_EVENT.BALANCE, this.onUpdateBalance.bind(this), true);
    socketIOClient.on(SOCKET_EVENT.GAME_INFO, this.onGameInfo.bind(this), true);
    socketIOClient.on(SOCKET_EVENT.LOGIN, this.onLogin.bind(this), true);
    socketIOClient.on(SOCKET_EVENT.BET, this.onBet.bind(this), true);
  }

  protected connectServer() {
    let auth = this.getAuthLogin(window.location.href);
    if (!auth || !auth.server) {
      LogUtil.log("Server not found!");
      return;
    }

    this._socketIOInstance.connectServer(auth.server, { auth: auth, path: auth.subpath });
    this.initEventNetwork(this._socketIOInstance);
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

  onBet(msg) {
    console.log("msg bet", msg);
    let betData: BetData = null;
    betData = msg as BetData;
    this.betInfoData = betData;
    let betResultData = betData.result as BetResultsData;

    this.betResultService.handleBetResultData(betData);

    this.gameLayerControl.handleBetResult(betResultData);

    this.PlayerControl.minusMoneyBet(betResultData.stake);

    this.betControl.onBet();
    EventBus.dispatchEvent(GAME_EVENT.SEND_BET_RESULT_DATA, betData);
  }

  onLogin(msg) {
    console.log("come in onLogin", msg);
  }

  onGameInfo(data) {
    console.log("game data", data);
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
