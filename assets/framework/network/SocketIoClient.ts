import { _decorator, Component, Node } from "cc";
import { LogUtil } from "../utils/LogUtil";
import io from "./socket.io.min.js";
import { NotifyUtil } from "../utils/NotifyUtil";
import { BNotifyType } from "../../games/steamPunk_client/script/common/Enum";
const { ccclass, property } = _decorator;
const LOGS_SKIPS = ["move", "balance", "update-x-y", "gameevent", "xmove"];
@ccclass("SocketIoClient")
export class SocketIoClient {
  private static _instance: SocketIoClient | null = null;
  public static get instance(): SocketIoClient {
    if (this._instance == null) {
      this._instance = new SocketIoClient();
    }
    return this._instance;
  }
  private socket: any = null;

  private _isConnected: boolean = false;
  public set isConnected(val: boolean) {
    this._isConnected = val;
  }
  public get isConnected() {
    return this.socket && this.socket.connected && this._isConnected;
  }
  public async setup() {
    LogUtil.log("SocketIoClient setup");
  }

  public connectServer(linkServer: string, auth) {
    LogUtil.logS("%c" + `connectServer->>>>>: ${linkServer}`, "color: #bada55");
    if (this.socket) {
      this.socket.disconnect();
    }
    if (auth) {
      this.socket = io(linkServer, auth);
    } else {
      this.socket = io(linkServer);
    }
  }

  public on(socketEvent: string, callbackData: Function, isOff: boolean = true) {
    if (this.socket) {
      if (isOff) {
        this.socket.off(socketEvent);
      }
      this.socket.on(socketEvent, (msg) => {
        if (!LOGS_SKIPS.includes(socketEvent)) {
          LogUtil.logS("%c" + `-->>socket recive: ${socketEvent}: ${JSON.stringify(msg)}`, "color:#ffe000");
        }
        callbackData(msg);
      });
    }
  }

  public off(socketEvent: string, listen) {
    this.socket && this.socket.off(socketEvent, listen);
  }

  public emit(socketEvent: string, data?: any) {
    if (!LOGS_SKIPS.includes(socketEvent)) {
      LogUtil.logS("%c" + `-->>socket send: ${socketEvent}: ${JSON.stringify(data)}`, "color:#00ff0c");
    }
    if (!this.isConnected) {
      NotifyUtil.instance.emit(BNotifyType.SHOW_DISCONNECT);
      return;
    }
    this.socket && this.socket.emit(socketEvent, data);
  }

  public close() {
    LogUtil.logS("%c" + `-->>socket colose:`, "color:#f70707");
    this.socket && this.socket.disconnect();
  }
}
