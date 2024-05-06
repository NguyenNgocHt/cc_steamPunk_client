import { Vec3 } from "cc";
import { tween } from "cc";
import { _decorator, Component, Node } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { AutoPlayStController } from "../../../../popups/autoPlaySt/AutoPlayStController";
import { ToggleAutoView } from "./ToggleAutoView";
const { ccclass, property } = _decorator;

@ccclass("AutoPlayView")
export class AutoPlayView extends Component {
  @property(Node)
  startNode: Node = null;

  @property(Node)
  tagetNode: Node = null;

  @property(Node)
  parentPopup: Node = null;

  @property(ToggleAutoView)
  toggleAutoView: ToggleAutoView = null;

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

  onClickAutoPlay() {
    EventBus.dispatchEvent(GAME_EVENT.ON_CLICK_AUTO_PLAY);
  }

  showPoupAutoPlaySt(nodeShow: Node) {
    if (this.parentPopup.children.length == 0) {
      this.parentPopup.addChild(nodeShow);
      this.onNode(nodeShow);
    } else {
      let childNode = this.parentPopup.children[0];
      this.onNode(childNode);
    }
  }

  onNode(nodeShow: Node) {
    let autoPlayStController = nodeShow.getComponent(AutoPlayStController);

    if (autoPlayStController) {
      autoPlayStController.onNode();
    }
  }

  onAutoPlay() {
    this.toggleAutoView.setOnAutoPlay();
  }

  offAutoPlay() {
    this.toggleAutoView.setOffAutoPlay();
  }
}
