import { _decorator, Component, Node } from "cc";
import { LampView } from "./LampView";
import { GearView } from "./GearView";
import { LineSelectView } from "./LineSelectView";
import { LightView } from "./LightView";
const { ccclass, property } = _decorator;

@ccclass("EffectLayerView")
export class EffectLayerView extends Component {
  @property(Node)
  lineSelect: Node[] = [];

  @property(Node)
  lineWin: Node[] = [];

  @property(LightView)
  lightRightView: LightView = null;
  @property(LightView)
  lightLeftView: LightView = null;

  @property(Node)
  lightRightOn: Node[] = [];

  @property(LampView)
  lampLeft: LampView = null;
  @property(LampView)
  lampRight: LampView = null;

  @property(GearView)
  gearView: GearView = null;

  @property(LineSelectView)
  lineSelectView: LineSelectView = null;

  onLoad() {
    this.init();
  }

  init() {}

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
}
