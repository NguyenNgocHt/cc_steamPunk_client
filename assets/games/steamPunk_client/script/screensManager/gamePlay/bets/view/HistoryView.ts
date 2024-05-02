import { _decorator, Component, Node, tween, Vec3 } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("HistoryView")
export class HistoryView extends Component {
  @property(Node)
  startNode: Node = null;

  @property(Node)
  tagetNode: Node = null;

  setNodeToStartPoint() {
    let startPos = this.startNode.getWorldPosition();
    this.node.setWorldPosition(startPos.x, startPos.y, 0);
  }

  moveNodeToTagetPoint() {
    let tagetPos = this.tagetNode.getWorldPosition();
    tween(this.node)
      .to(0.8, { worldPosition: new Vec3(tagetPos.x, tagetPos.y, 0) }, { easing: "backInOut" })
      .start();
  }
  onClickShowHistory() {
    EventBus.dispatchEvent(GAME_EVENT.ON_HISTORY_BUTTON);
  }
}
