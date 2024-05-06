import { _decorator, Component, Node } from "cc";
import { EventBus } from "../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("AutoPlayStView")
export class AutoPlayStView extends Component {
  onClickCloseBtn() {
    EventBus.dispatchEvent(GAME_EVENT.ON_CLICK_CLOSE_AUTO_PLAY_POPUP);
  }
}
