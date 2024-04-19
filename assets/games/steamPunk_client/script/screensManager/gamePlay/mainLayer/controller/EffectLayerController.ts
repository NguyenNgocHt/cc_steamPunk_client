import { _decorator, Component, Node } from "cc";
import { IEffectLayerControl, IEffectLayerView } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
import { EffectLayerView } from "../view/EffectLayerView";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("EffectLayerController")
export class EffectLayerController extends Component implements IEffectLayerControl {
  @property(EffectLayerView)
  effectLayerView: EffectLayerView = null;

  _effectLayerView: IEffectLayerView = null;
  onLoad() {
    this.init();
  }
  init() {
    this.initEffectLayerView();
    this.registerEvent();
  }
  initEffectLayerView() {
    this._effectLayerView = this.effectLayerView;
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
    this._effectLayerView.initStartGame();
  }
  onAllEffect() {
    this._effectLayerView.openingEnding();
  }
  showBetLine(totalLines: number) {
    console.log("totalLines", totalLines);
    this._effectLayerView.showLineSelectView(totalLines);
  }
}
