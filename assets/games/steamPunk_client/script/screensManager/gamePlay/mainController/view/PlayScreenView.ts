import { _decorator, Component, Node, tween, Vec3 } from "cc";
import { IPlayScreenView } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { EventBus } from "../../../../../../../framework/common/EventBus";
const { ccclass, property } = _decorator;

@ccclass("PlayScreenView")
export class PlayScreenView extends Component implements IPlayScreenView {
  @property(Node)
  destination: Node = null;
  @property(Node)
  startPoint: Node = null;
  @property(Node)
  betGroup: Node = null;
  duration: number = 1;

  start() {
    this.setBetGroupToStartPoint();
  }
  setBetGroupToStartPoint() {
    let startPoint = this.startPoint.getWorldPosition();
    this.betGroup.setWorldPosition(startPoint.x, startPoint.y, 0);
  }
  betGroupToUp() {
    this.moveToTaget(this.betGroup, this.destination);
  }
  moveToTaget(cutrainNode: Node, nodeTaget: Node) {
    tween(cutrainNode)
      .to(this.duration, { position: new Vec3(nodeTaget.position.x, nodeTaget.position.y) }, { easing: "backOut" })
      .call(() => {
        EventBus.dispatchEvent(GAME_EVENT.BET_LAYER_TO_UP_END);
      })
      .start();
  }
}
