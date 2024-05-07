import { Vec3 } from "cc";
import { WebView } from "cc";
import { tween } from "cc";
import { _decorator, Component, Node } from "cc";
import { IGameData } from "../../interfaces/Common_interfaces";
import { GameData } from "../../common/GameData";
import { game } from "cc";
import BasePopup from "../../../../../framework/ui/BasePopup";
import ScreenManager from "../../../../../framework/ui/ScreenManager";
import { EventBus } from "../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("helpLayerView")
export class helpLayerView extends BasePopup {
  @property(WebView)
  webView: WebView = null;
  _gameData: IGameData = null;

  start() {
    console.log(this.webView);
    this.initGameData();
    this.node.setScale(0, 0, 0);
    this.upScale();
    this.setUrl();
  }

  initGameData() {
    this._gameData = new GameData();
  }

  upScale() {
    tween(this.node)
      .to(0.2, { scale: new Vec3(1, 1, 1) })
      .start();
  }

  setUrl() {
    let gameData = this._gameData.getGameData();
    console.log("game data", gameData);
    if (gameData) {
      let url = `${gameData.server}${gameData.subpath}/guide?language=${gameData.language}`;
      console.log("url webview", url);
      this.webView.url = url;
    }
  }

  onClickCloseBtn() {
    this.hide();
  }

  hide() {
    EventBus.dispatchEvent(GAME_EVENT.ON_CLOSE_HELP_POPUP);
    this.node.removeFromParent();
    this.node.destroy();
  }
}
