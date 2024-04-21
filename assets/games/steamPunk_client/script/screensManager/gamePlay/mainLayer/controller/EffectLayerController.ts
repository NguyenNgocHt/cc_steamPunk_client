import { _decorator, Component, Node } from "cc";
import { EffectLayerView } from "../view/EffectLayerView";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("EffectLayerController")
export class EffectLayerController extends Component {
  @property(EffectLayerView)
  effectLayerView: EffectLayerView = null;

  onLoad() {
    this.init();
  }

  init() {
    this.registerEvent();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.SEND_CURRENT_BET_LINE, this.showBetLine.bind(this));
  }

  offEvent() {
    EventBus.off(GAME_EVENT.ONCLICK_ADD_LINE, this.showBetLine.bind(this));
  }

  start() {
    this.initEffectStartGame();
  }

  initEffectStartGame() {
    this.effectLayerView.initStartGame();
  }

  onAllEffect() {
    this.effectLayerView.openingEnding();
  }

  showBetLine(totalLines: number) {
    console.log("totalLines", totalLines);
    this.effectLayerView.showLineSelectView(totalLines);
  }
}
