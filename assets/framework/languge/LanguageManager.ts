import { _decorator, Component, Node } from "cc";
import { EDITOR } from "cc/env";
import { LANGUAGE_MAP } from "../../games/steamPunk_client/script/common/Enum";
import { StorageUtil } from "../utils/StorageUtil";
import { BStorageKey } from "../../games/steamPunk_client/script/common/Enum";
import { HttpClient } from "../network/HttpClient";
import { LogUtil } from "../utils/LogUtil";
import { NotifyUtil } from "../utils/NotifyUtil";
import { BNotifyType } from "../../games/steamPunk_client/script/common/Enum";
import { EventBus } from "../common/EventBus";
import { GAME_EVENT } from "../../games/steamPunk_client/script/network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("LanguageManager")
export class LanguageManager extends Component {
  public static _data: any = {};
  public static getText(key: string): string {
    let s = LanguageManager._data[key];
    if (!s) {
      s = "";
    }
    return s;
  }
  public async getLanguage2(dataGame: any, callback: Function = null) {
    if (!dataGame) {
      callback && callback(false);
      return;
    }
    let language = dataGame.language;
    let version = dataGame.version;

    if (!language) {
      language = LANGUAGE_MAP.English;
    }
    if (!version) {
      version = "0.01";
    }
    let urlLang = `${dataGame.server}${dataGame.subpath}/setting`;
    let cachedData = null;
    let cachedHash = null;
    if (!EDITOR) {
      cachedData = StorageUtil.instance.read(BStorageKey.LANGUAGE_DATA);
      cachedHash = StorageUtil.instance.read(BStorageKey.LANGUAGE_CACHE);
    }

    let self = this;
    let hashCheck = version + language;
    if (!EDITOR && cachedData && cachedHash == hashCheck) {
      this._handleData(JSON.parse(cachedData), callback);
    } else {
      let data = await HttpClient.instance.post(urlLang, dataGame);
      if (data && data.status === 1) {
        self._updateCache(data.result.language, hashCheck);
        this._handleData(data.result.language, callback);
        console.log("language data", data);
      } else {
        // this._handleData(JSON.parse(cachedData));
        callback && callback(false);
      }
    }
  }
  private _handleData(data: any, callback: Function) {
    LanguageManager._data = data;
    EventBus.dispatchEvent(GAME_EVENT.LANGUAGE_CHANGED);
    LogUtil.log(JSON.stringify(data));
    console.log("data", data);
    callback && callback(true);
  }
  private _updateCache(data, hash: string) {
    if (!EDITOR) {
      StorageUtil.instance.write(BStorageKey.LANGUAGE_DATA, JSON.stringify(data));
      StorageUtil.instance.write(BStorageKey.LANGUAGE_CACHE, hash);
    }
    // this._handleData(data);
  }
}
