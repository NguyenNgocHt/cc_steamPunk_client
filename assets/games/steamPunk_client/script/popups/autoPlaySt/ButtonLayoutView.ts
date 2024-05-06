import { _decorator, Component, Node } from "cc";
import { EventBus } from "../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("ButtonLayoutView")
export class ButtonLayoutView extends Component {
  @property(Node)
  cancelNode: Node = null;

  @property(Node)
  confirmNode: Node = null;

  @property(Node)
  stopNode: Node = null;

  startPopup() {
    this.confirmNode.active = true;
    this.stopNode.active = false;
  }

  changeToNodeStop() {
    this.confirmNode.active = false;
    this.stopNode.active = true;
  }

  onClickCancel() {
    EventBus.dispatchEvent(GAME_EVENT.ON_CLICK_CANCEL);
  }

  onClickConfirm() {
    EventBus.dispatchEvent(GAME_EVENT.ON_CLICK_CONFIRM);
  }

  onClickStop() {
    EventBus.dispatchEvent(GAME_EVENT.ON_CLICK_STOP);
  }
}
