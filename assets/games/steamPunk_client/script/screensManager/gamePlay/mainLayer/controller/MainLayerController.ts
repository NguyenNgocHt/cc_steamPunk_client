import { gamePlayController } from "./../../mainController/controller/GamePlayController";
import { IEffectLayerControl, IGameLayerControl, IMainLayerControl } from "./../../../../interfaces/gamePlay/MainLayer_interfaces";
import { _decorator, Component, Node } from "cc";
import { GameLayerController } from "./GameLayerController";
import { EffectLayerController } from "./EffectLayerController";
const { ccclass, property } = _decorator;

@ccclass("MainLayerController")
export class MainLayerController extends Component implements IMainLayerControl {
  @property(GameLayerController)
  gameLayerControl: GameLayerController = null;
  @property(EffectLayerController)
  effectLayerControl: EffectLayerController = null;
  _gameLayerControl: IGameLayerControl = null;
  _effectLayerControl: IEffectLayerControl = null;
  start() {
    this.init();
  }
  init() {
    this._gameLayerControl = this.gameLayerControl;
    this._effectLayerControl = this.effectLayerControl;
  }
  moveMetalgateToUp() {
    this._gameLayerControl.metalgateToUp();
  }
  startGameEffect() {
    this._effectLayerControl.onAllEffect();
  }
}
