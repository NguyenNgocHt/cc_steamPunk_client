import { _decorator, Component, Node } from "cc";

import { GameLayerView } from "../view/GameLayerView";
import { SlotMachineController } from "./SlotMachineController";
import { EffectLayerController } from "./EffectLayerController";
const { ccclass, property } = _decorator;

@ccclass("GameLayerController")
export class GameLayerController extends Component {
  @property(GameLayerView)
  gameLayerView: GameLayerView = null;

  @property(SlotMachineController)
  slotMachineControl: SlotMachineController = null;

  @property(EffectLayerController)
  effectLayerControl: EffectLayerController = null;

  metalgateMoveUp() {
    this.gameLayerView.metalgateMoveUp();
  }

  handleBetResult(result) {
    this.slotMachineControl.setBetResultData(result);
  }

  startGame() {
    this.effectLayerControl.onAllEffect();
  }

  showWinGameBonus(coinBonus: number, multiplier: number, tagetNode: Node) {
    this.effectLayerControl.showWinGameBonus(coinBonus, multiplier, tagetNode);
  }

  showFreeSpineAnim() {
    this.gameLayerView.showFreeSpineAnim();
  }

  showJackpotAnim() {
    this.gameLayerView.showJackpotAnim();
  }
}
