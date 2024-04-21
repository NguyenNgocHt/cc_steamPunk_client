import { _decorator, Component, Node } from "cc";

import { GameLayerView } from "../view/GameLayerView";
import { SlotMachineController } from "./SlotMachineController";
const { ccclass, property } = _decorator;

@ccclass("GameLayerController")
export class GameLayerController extends Component {
  @property(GameLayerView)
  gameLayerView: GameLayerView = null;

  @property(SlotMachineController)
  slotMachingControl: SlotMachineController = null;

  metalgateToUp() {
    this.gameLayerView.metalgateToUp();
  }
  handleBetResult(result) {
    this.slotMachingControl.setBetResultData(result);
  }
}
