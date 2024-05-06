import { _decorator, Component, Node } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("TuboView")
export class TuboView extends Component {
  @property(Node)
  offTubo: Node = null;

  @property(Node)
  onTubo: Node = null;

  setOffTubo() {
    this.offTubo.active = true;
    this.onTubo.active = false;
  }

  setOnTubo() {
    this.offTubo.active = false;
    this.onTubo.active = true;
  }

  onClickTuboBtn(event: Event, data: string) {
    let value = parseInt(data);
    console.log("data", value);
    EventBus.dispatchEvent(GAME_EVENT.ON_CLICK_TUBO_BUTTON, value);
  }
}
