import { _decorator, Component, Node } from "cc";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { EventBus, EventBusName } from "../../../../../../../framework/common/EventBus";
import { Tween } from "cc";
import { tween } from "cc";
import { Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MenuView")
export class MenuView extends Component {
  @property(Node)
  listIcon: Node = null;

  @property(Node)
  iconMusic: Node = null;
  @property(Node)
  iconSound: Node = null;
  @property(Node)
  iconHelp: Node = null;

  @property(Node)
  startNode: Node = null;
  @property(Node)
  stopNode: Node = null;

  @property(Node)
  parrentHelpNode: Node = null;

  originIndex: number = 0;
 
  protected start(): void {
    let startPos = this.startNode.getWorldPosition();
    this.listIcon.setWorldPosition(startPos.x, startPos.y, 0);
    this.originIndex = this.node.parent.getSiblingIndex();
  }

  onClickMenuBtn() {
    EventBus.dispatchEvent(GAME_EVENT.ON_MENU_ICON);
  }

  moveDownListIcon() {
    this.moveIconList(this.stopNode);
  }

  moveUpListIcon() {
    this.moveIconList(this.startNode);
  }

  moveIconList(tagetNode: Node) {
    let tagetPos = tagetNode.getWorldPosition();
    Tween.stopAllByTarget(this.listIcon);
    tween(this.listIcon)
      .to(0.5, { worldPosition: new Vec3(tagetPos.x, tagetPos.y, 0) }, { easing: "backInOut" })
      .start();
  }

  onClickHelpBtn() {
    EventBus.dispatchEvent(GAME_EVENT.ON_HELP_VIEW);
  }

  showHelpView(helpNode: Node) {
    this.parrentHelpNode.addChild(helpNode);
    this.parrentHelpNode.parent.setSiblingIndex(9);
  }

  setOriginIndex() {
    this.parrentHelpNode.parent.setSiblingIndex(this.originIndex);
  }
}
