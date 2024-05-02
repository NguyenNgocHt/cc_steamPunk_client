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
  parrentView: Node = null;

  protected start(): void {
    let startPos = this.startNode.getWorldPosition();
    this.listIcon.setWorldPosition(startPos.x, startPos.y, 0);
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
    this.parrentView.addChild(helpNode);
    console.log(this.parrentView);
  }
}
