import { BetResultsData } from "./../../dataModel/BetDataType";
import { Vec3 } from "cc";
import { Tween } from "cc";
import { tween } from "cc";
import { _decorator, Component, Node } from "cc";
import { BetLineGroupView } from "../../screensManager/gamePlay/bets/view/BetLineGroupView";
import { EventBus } from "../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("SelectLayoutView")
export class SelectLayoutView extends Component {
  @property(Node)
  listNumberNode: Node[] = [];

  @property(Node)
  btnSelect: Node = null;

  selectNumber: number = 0;

  onClickNumberNode(event: Event, data: string) {
    let numberPosIndex = 0;

    let value = parseInt(data);

    switch (value) {
      case 10:
        numberPosIndex = 0;
        this.selectNumber = value;
        break;

      case 30:
        numberPosIndex = 1;
        this.selectNumber = value;
        break;

      case 50:
        numberPosIndex = 2;
        this.selectNumber = value;
        break;

      case 80:
        numberPosIndex = 3;
        this.selectNumber = value;
        break;

      case 100:
        numberPosIndex = 4;
        this.selectNumber = value;
        break;
    }
    let tagetPos = this.listNumberNode[numberPosIndex].getWorldPosition();

    Tween.stopAllByTarget(this.btnSelect);

    tween(this.btnSelect)
      .to(0.4, { worldPosition: new Vec3(tagetPos.x, tagetPos.y, 0) }, { easing: "backOut" })
      .call(() => {
        EventBus.dispatchEvent(GAME_EVENT.SELECTED_NUMBER, this.selectNumber);
      })
      .start();
  }
}
