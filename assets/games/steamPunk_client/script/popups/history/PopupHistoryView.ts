import { HistoryContentView } from "./HistoryContentView";
import { _decorator, Component, Node, tween, Vec3 } from "cc";
import { EventBus } from "../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../network/networkDefine";
import { HistoryData } from "../../dataModel/HistoryDataType";
import { Prefab } from "cc";
import { instantiate } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PopupHistoryView")
export class PopupHistoryView extends Component {
  @property(Node)
  riskLevelNode: Node = null;

  @property(Prefab)
  historyConten: Prefab = null;

  @property(Node)
  content: Node = null;

  setNodeToStartPoint(startNode: Node) {
    let startPos = startNode.getWorldPosition();
    this.node.setWorldPosition(startPos.x, startPos.y, 0);
  }

  moveNodeToTagetPoint(tagetNode: Node, timeMove: number) {
    let tagetPos = tagetNode.getWorldPosition();
    tween(this.node)
      .to(timeMove, { worldPosition: new Vec3(tagetPos.x, tagetPos.y, 0) })
      .start();
  }

  onClickClosePopup() {
    EventBus.dispatchEvent(GAME_EVENT.ON_CLOSE_HISTORY_POPUP);
  }

  showHistoryContent(dataList) {
    let historyDataList = dataList as HistoryData[];
    let contentlength = this.content.children.length;
    console.log("contentlength", contentlength);
    if (contentlength == 30) {
      this.content.children.shift();
      contentlength = this.content.children.length;
    }
    for (let i = 0; i < historyDataList.length; i++) {
      if (!historyDataList[i].risk) {
        this.riskLevelNode.active = false;
      } else {
        this.riskLevelNode.active = true;
      }
      if (i >= contentlength) {
        let historyContentNode = instantiate(this.historyConten);

        if (historyContentNode) {
          let historyContentView = historyContentNode.getComponent(HistoryContentView);
          historyContentView.updateHistoryContent(historyDataList[i]);
          this.content.addChild(historyContentNode);
        }
      }
    }
  }
}
