import { Vec3 } from "cc";
import { tween } from "cc";
import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AutoPlayView")
export class AutoPlayView extends Component {
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
}
