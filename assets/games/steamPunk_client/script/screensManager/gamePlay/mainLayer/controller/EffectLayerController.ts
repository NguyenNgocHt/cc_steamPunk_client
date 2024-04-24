import { _decorator, Component, Node } from "cc";
import { EffectLayerView } from "../view/EffectLayerView";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { PayLinesDaTa } from "../../../../dataModel/BetDataType";
const { ccclass, property } = _decorator;

@ccclass("EffectLayerController")
export class EffectLayerController extends Component {
  @property(EffectLayerView)
  effectLayerView: EffectLayerView = null;

  onLoad() {
    this.registerEvent();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.SEND_CURRENT_BET_LINE, this.showBetLine.bind(this));
    EventBus.on(GAME_EVENT.ON_CLICK_BET_BUTTON, this.setEffectWhenOnClickBetBnt.bind(this));
    EventBus.on(GAME_EVENT.SHOW_EFFECT_WIN_GAME, this.setEffectWinGame.bind(this));
    EventBus.on(GAME_EVENT.ON_SPIN_EFFECT_VER2, this.setSpinEffectStop.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.ONCLICK_ADD_LINE, this.showBetLine.bind(this));
    EventBus.off(GAME_EVENT.ON_CLICK_BET_BUTTON, this.setEffectWhenOnClickBetBnt.bind(this));
    EventBus.off(GAME_EVENT.SHOW_EFFECT_WIN_GAME, this.setEffectWinGame.bind(this));
    EventBus.off(GAME_EVENT.ON_SPIN_EFFECT_VER2, this.setSpinEffectStop.bind(this));
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
    this.effectLayerView.showLineSelectView(totalLines);
  }

  setEffectWhenOnClickBetBnt() {
    this.offAllLine();
    this.onSpinEffectV1();
  }

  offAllLine() {
    this.effectLayerView.offAllLines();
  }
  setSpinEffectStop() {
    this.effectLayerView.onSpinEffectV2();
  }
  onSpinEffectV1() {
    this.scheduleOnce(function () {
      this.effectLayerView.onSpinEffectV1();
    }, 0.75);
  }

  onSpinEffectV2() {}

  setEffectWinGame(payLineList: any[]) {
    for (let i = 0; i < payLineList.length; i++) {
      let payline = payLineList[i] as PayLinesDaTa;
      if (payline) {
        this.effectLayerView.onEffectWinGame(payline.payline);
      }
    }
  }

  showWinGameBonus(coinBonus: number, multiplier: number, tagetNode: Node) {
    this.effectLayerView.showWinGameBonus(coinBonus, multiplier, tagetNode);
  }
}
