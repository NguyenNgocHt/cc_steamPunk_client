import { _decorator, Component, Node } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { TrendHistoryView } from "../view/TrendHistoryView";
const { ccclass, property } = _decorator;

@ccclass("TrendHistoryController")
export class TrendHistoryController extends Component {
  @property(TrendHistoryView)
  trendHistoryView: TrendHistoryView = null;

  start() {
    this.registerEvent();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.SEND_POOL_MODEL, this.handlePoolControl.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.SEND_POOL_MODEL, this.handlePoolControl.bind(this));
  }

  handlePoolControl(boolControl) {
    this.trendHistoryView.handlePoolControl(boolControl);
  }

  checkIconValue(value: number) {
    console.log("value", value);
    if (value == 0) {
      this.trendHistoryView.pushGreenIconInConten(value);
    } else if (value > 0) {
      this.trendHistoryView.pushBlueIconInConten(value);
    }
  }
}
