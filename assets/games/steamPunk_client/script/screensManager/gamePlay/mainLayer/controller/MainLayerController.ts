import { _decorator, Component, Node } from "cc";
import { GameLayerController } from "./GameLayerController";
import { EffectLayerController } from "./EffectLayerController";
const { ccclass, property } = _decorator;

@ccclass("MainLayerController")
export class MainLayerController extends Component {
  @property(GameLayerController)
  gameLayerControl: GameLayerController = null;
  @property(EffectLayerController)
  effectLayerControl: EffectLayerController = null;

  start() {
    this.init();
  }

  init() {}

  moveMetalgateToUp() {
    this.gameLayerControl.metalgateToUp();
  }

  startGameEffect() {
    this.effectLayerControl.onAllEffect();
  }
  handleBetResult(result) {
    this.gameLayerControl.handleBetResult(result);
  }
}
