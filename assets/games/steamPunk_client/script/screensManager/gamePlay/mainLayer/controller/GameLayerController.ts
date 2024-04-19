import { IGameConfig } from "cc";
import { _decorator, Component, Node } from "cc";
import { IGameLayerControl, IGameLayerView } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
import { GameLayerView } from "../view/GameLayerView";
const { ccclass, property } = _decorator;

@ccclass("GameLayerController")
export class GameLayerController extends Component implements IGameLayerControl {
  @property(GameLayerView)
  gameLayerView: GameLayerView = null;
  _gameLayerView: IGameLayerView = null;
  protected start(): void {
    this.init();
  }
  init() {
    this.initGamePlayerView();
  }
  initGamePlayerView() {
    this._gameLayerView = this.gameLayerView;
  }
  metalgateToUp() {
    this._gameLayerView.metalgateToUp();
  }
}
