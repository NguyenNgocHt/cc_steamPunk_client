import { SOCKET_EVENT } from "./../network/networkDefine";
import { _decorator } from "cc";
import { IBetResultsServiceMock, IConnectSeverServiceMock, IGameInfoServiceMock, ISocketIOClient } from "../interfaces/Mock_interfaces";
import { ConnectSeverServiceMock } from "./ConnectSeverServiceMock";
import { GameInfoServiceMock } from "./GameInfoServiceMock";
import { BetResultsServiceMock } from "./BetResultsServiceMock";
const { ccclass, property } = _decorator;

@ccclass("SocketIOMock")
export class SocketIOMock implements ISocketIOClient {
  connectServerService: IConnectSeverServiceMock = null;
  gameInfoService: IGameInfoServiceMock = null;
  betResultService: IBetResultsServiceMock = null;

  private static _instance: SocketIOMock | null = null;
  public static get instance(): SocketIOMock {
    if (this._instance == null) {
      this._instance = new SocketIOMock();
    }
    return this._instance;
  }

  init() {
    this.connectServerService = new ConnectSeverServiceMock();
    this.gameInfoService = new GameInfoServiceMock();
    this.betResultService = new BetResultsServiceMock();
    this.betResultService.init();
    this.gameInfoService.init();
  }

  connectServer(linkServer: string, auth) {
    this.init();
    setTimeout(() => {
      this.onSocket(SOCKET_EVENT.GAME_INFO, (msg) => {
        console.log(msg);
        if (this.events[SOCKET_EVENT.GAME_INFO]?.length > 0) {
          this.events[SOCKET_EVENT.GAME_INFO].forEach((callbackFunc) => {
            callbackFunc(msg);
          });
        }
      });
    }, 1);
  }

  events: { [key: string]: Function[] } = {};

  on(socketEvent: string, callbackData: Function, isOff: boolean = true) {
    if (!this.events[socketEvent]) {
      this.events[socketEvent] = [];
    }
    this.events[socketEvent].push(callbackData);
    console.log(this.events);
  }

  emit(socketEvent: string, data?: any) {
    this.onSocket(
      socketEvent,
      (msg) => {
        if (this.events[socketEvent]?.length > 0) {
          this.events[socketEvent].forEach((callbackFunc) => {
            callbackFunc(msg);
          });
        }
      },
      data
    );
  }

  onSocket(socketEvent: string, callback: Function, data?: any) {
    switch (socketEvent) {
      case SOCKET_EVENT.GAME_INFO:
        let gameInfo = this.gameInfoService.getGameInfo();
        callback(gameInfo);
        break;
      case SOCKET_EVENT.BET:
        let betResult = this.betResultService.getBetResults(data);
        callback(betResult);
        break;
    }
  }
}
