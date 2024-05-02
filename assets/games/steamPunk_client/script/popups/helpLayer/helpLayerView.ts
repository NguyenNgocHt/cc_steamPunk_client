import { Vec3 } from "cc";
import { WebView } from "cc";
import { tween } from "cc";
import { _decorator, Component, Node } from "cc";
import { IGameData } from "../../interfaces/Common_interfaces";
import { GameData } from "../../common/GameData";
import { game } from "cc";
const { ccclass, property } = _decorator;

@ccclass("helpLayerView")
export class helpLayerView extends Component {
  @property(Node)
  webView: Node = null;
  _gameData: IGameData = null;

  start() {
    console.log(this.webView);
    this.initGameData();
    this.node.setScale(0, 0, 0);
    this.upScale();
    // this.setUrl();
  }

  initGameData() {
    this._gameData = new GameData();
  }

  upScale() {
    tween(this.node)
      .to(0.3, { scale: new Vec3(1, 1, 1) })
      .call(() => {
        this.setUrl();
      })
      .start();
  }

  setUrl() {
    let gameData = this._gameData.getGameData();
    if (gameData) {1 
      let url = `${gameData.server}${gameData.subpath}/guide?language=${gameData.language}`;
      console.log("webview info", url);
    }
  }
}
