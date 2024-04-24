import { _decorator, Component, Node } from "cc";
import { LampView } from "./LampView";
import { GearView } from "./GearView";
import { LineSelectView } from "./LineSelectView";
import { LightView } from "./LightView";
import { LineWinView } from "./LineWinView";
import { WinGameBonusView } from "./WinGameBonusView";
import { sp } from "cc";
const { ccclass, property } = _decorator;

@ccclass("EffectLayerView")
export class EffectLayerView extends Component {
  @property(LightView)
  lightRightView: LightView = null;
  @property(LightView)
  lightLeftView: LightView = null;

  @property(LampView)
  lampLeft: LampView = null;
  @property(LampView)
  lampRight: LampView = null;

  @property(GearView)
  gearView: GearView = null;

  @property(LineSelectView)
  lineSelectView: LineSelectView = null;

  @property(LineWinView)
  lineWinView: LineWinView = null;

  @property(WinGameBonusView)
  winGameBonusView: WinGameBonusView = null;

  @property(sp.Skeleton)
  spinEffectV1: sp.Skeleton = null;

  @property(sp.Skeleton)
  spinEffectV2: sp.Skeleton = null;

  protected start(): void {
    this.spinEffectV1.node.active = false;
    this.spinEffectV2.node.active = false;
    this.spinEffectV1.setCompleteListener(() => {
      this.spinEffectV1.node.active = false;
    });

    this.spinEffectV2.setCompleteListener(() => {
      this.spinEffectV2.node.active = false;
    });
  }
  //common

  initStartGame() {
    this.offLamp_leftRight();

    this.offSpinGear();

    this.offLightStart();

    this.offLbWinStatus();

    this.offAllLines();
  }

  openingEnding() {
    this.onLamp_leftRight();
    this.onLightStart();
    this.scheduleOnce(function () {
      this.offLightStart();
      this.onSpinGear();
      this.onLightContinuously();
    }, 0.5);
  }

  //Lamp View

  offLamp_leftRight() {
    this.lampLeft.offLamp();
    this.lampRight.offLamp();
  }

  onLamp_leftRight() {
    this.lampLeft.onLamp();
    this.lampRight.onLamp();
  }

  //Gear View

  offSpinGear() {
    this.gearView.offSpinAnimGear();
  }

  onSpinGear() {
    this.gearView.onSpinAnimGear();
  }

  offLightStart() {
    this.gearView.offLightStart();
  }

  onLightStart() {
    this.gearView.onLightStart();
  }

  offLbWinStatus() {
    this.gearView.offLbWinStatus();
  }

  onLbWinStatus() {
    this.gearView.onLbWinStatus();
  }
  //line select view

  showLineSelectView(totalLines: number) {
    this.lineSelectView.showLineSelect(totalLines);
  }

  offAllLines() {
    this.lineSelectView.offAllLines();
  }

  //light left right view

  onLightContinuously() {
    this.lightLeftView.turnsOnLightContinuously();
    this.lightRightView.turnsOnLightContinuously();
  }

  onEffectWinGame(effectIndex: number) {
    this.lineWinView.onEffect(effectIndex);
    this.lightLeftView.onLight(effectIndex, 1.0);
    this.lightRightView.onLight(effectIndex, 1.0);
  }
  //show bonus
  showWinGameBonus(coinBonus: number, multiplier: number, tagetNode: Node) {
    let tagetPos = tagetNode.getWorldPosition();
    this.winGameBonusView.updateCoinAndMultiplier(coinBonus, multiplier);
    this.winGameBonusView.showEffectMoneyWin(tagetPos, 0.5, 0.3);
  }
  //spinEffect
  onSpinEffectV1() {
    this.spinEffectV1.node.active = true;
    this.spinEffectV1.setAnimation(0, "Sprite", false);
  }
  onSpinEffectV2() {
    this.spinEffectV2.node.active = true;
    this.spinEffectV2.setAnimation(0, "Sprite", false);
  }
}
