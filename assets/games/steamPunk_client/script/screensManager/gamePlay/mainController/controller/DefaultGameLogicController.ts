import { _decorator } from "cc";
import { LogUtil } from "../../../../../../../framework/utils/LogUtil";
import Utils from "../../../../../../../framework/utils/Utils";
import { SocketIoClient } from "../../../../../../../framework/network/SocketIoClient";
import { GAME_EVENT, SOCKET_EVENT } from "../../../../network/networkDefine";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { IGameLogicController } from "../../../../interfaces/gamePlay/GamePlayInterfaces";
const { ccclass, property } = _decorator;

@ccclass("DefaultGameLogicController")
export class DefaultGameLogicController implements IGameLogicController {
  initGameStart() {
    this.registerEvent();
    this.connectServer();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.ON_PLACE_BET, this.onPlaceBet.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.ON_PLACE_BET, this.onPlaceBet.bind(this));
  }

  connectServer() {
    console.log("connect to sever");
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

  getAuthLogin(url_string: string) {
    let dataDecode = Utils.parseUrlData(url_string);
    if (!dataDecode) {
      return;
    }
    LogUtil.ENV = dataDecode.env;
    return dataDecode;
  }

  initEventNetwork() {
    SocketIoClient.instance.on(SOCKET_EVENT.CONNECTION, this.onConnection.bind(this), true);
    SocketIoClient.instance.on(SOCKET_EVENT.CONNECT, this.onConnect.bind(this), true);
    SocketIoClient.instance.on(SOCKET_EVENT.DISCONNECT, this.ondisconnect.bind(this), true);
    SocketIoClient.instance.on(SOCKET_EVENT.CONNECT_ERROR, this.onConnectError.bind(this), true);

    SocketIoClient.instance.on(SOCKET_EVENT.UPDATE_COIN, this.onUpdateCoin.bind(this), true);
    SocketIoClient.instance.on(SOCKET_EVENT.BALANCE, this.onUpdateBalance.bind(this), true);
    SocketIoClient.instance.on(SOCKET_EVENT.GAME_INFO, this.onGameInfo.bind(this), true);
    SocketIoClient.instance.on(SOCKET_EVENT.LOGIN, this.onLogin.bind(this), true);
    SocketIoClient.instance.on(SOCKET_EVENT.BET, this.onPlaceBetResponseHandle.bind(this), true);
  }

  onPlaceBetResponseHandle(msg) {
    console.log("msg", msg);
    if (msg) {
      EventBus.dispatchEvent(GAME_EVENT.SEND_BET_RESULT_DATA_TO_GAME_CONTROLLER, msg);
    }
  }

  onGameInfo(data) {
    if (data) {
      EventBus.dispatchEvent(GAME_EVENT.SEND_GAME_INFO_DATA_TO_GAME_CONTROLLER, data);
    }
  }

  onPlaceBet(data: any): void {
    SocketIoClient.instance.emit(SOCKET_EVENT.BET, data);
  }

  onLogin(msg) {
    console.log("come in onLogin", msg);
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
