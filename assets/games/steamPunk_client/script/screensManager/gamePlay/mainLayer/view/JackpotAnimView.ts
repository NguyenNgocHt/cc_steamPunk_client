import { tween } from "cc";
import { _decorator, Component, Node, sp } from "cc";
const { ccclass, property } = _decorator;

@ccclass("JackpotAnimView")
export class JackpotAnimView extends Component {
  @property(sp.Skeleton)
  jackpotAnim: sp.Skeleton = null;

  @property(Node)
  objTextNode: Node = null;

  start() {
    this.offAllAnim();
  }
  offAllAnim() {
    this.jackpotAnim.node.active = false;
    this.objTextNode.active = false;
    this.jackpotAnim.setCompleteListener(() => {
      this.jackpotAnim.node.active = false;
    });
  }

  startJackpotAnim() {
    this.jackpotAnim.node.active = true;
    this.jackpotAnim.setAnimation(0, "animtion0", false);
    this.showJackpotText();
  }

  showJackpotText() {
    tween(this.node)
      .delay(0.7)
      .call(() => {
        this.objTextNode.active = true;
      })
      .delay(1.8)
      .call(() => {
        this.objTextNode.active = false;
      })
      .start();
  }
}
