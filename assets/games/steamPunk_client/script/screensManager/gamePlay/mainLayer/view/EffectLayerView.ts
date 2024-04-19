import { _decorator, Component, Node } from "cc";
import { LampView } from "./LampView";
import { IEffectLayerView, IGearView, ILampView, ILineSelectView } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
import { GearView } from "./GearView";
import { LineSelectView } from "./LineSelectView";
const { ccclass, property } = _decorator;

@ccclass("EffectLayerView")
export class EffectLayerView extends Component implements IEffectLayerView {
  @property(Node)
  lineSelect: Node[] = [];

  @property(Node)
  lineWin: Node[] = [];

  @property(Node)
  lightLeftOff: Node[] = [];
  @property(Node)
  lightLeftOn: Node[] = [];

  @property(Node)
  lightRightOff: Node[] = [];
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

  _lampLeftView: ILampView = null;
  _lampRightView: ILampView = null;
  _gearView: IGearView = null;
  _lineSelectView: ILineSelectView = null;
  onLoad() {
    this.init();
  }

  init() {
    this.initLampView();
    this.initGearView();
    this.initLineSelectView();
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
    }, 0.5);
  }
  //Lamp View
  initLampView() {
    this._lampLeftView = this.lampLeft;
    this._lampRightView = this.lampRight;
  }

  initGearView() {
    this._gearView = this.gearView;
  }

  initLineSelectView() {
    this._lineSelectView = this.lineSelectView;
  }

  offLamp_leftRight() {
    this._lampLeftView.offLamp();
    this._lampRightView.offLamp();
  }

  onLamp_leftRight() {
    this._lampLeftView.onLamp();
    this._lampRightView.onLamp();
  }
  //Gear View
  offSpinGear() {
    this._gearView.offSpinAnimGear();
  }

  onSpinGear() {
    this._gearView.onSpinAnimGear();
  }

  offLightStart() {
    this._gearView.offLightStart();
  }

  onLightStart() {
    this._gearView.onLightStart();
  }

  offLbWinStatus() {
    this._gearView.offLbWinStatus();
  }

  onLbWinStatus() {
    this._gearView.onLbWinStatus();
  }
  //line select view
  showLineSelectView(totalLines: number) {
    this._lineSelectView.showLineSelect(totalLines);
  }
  offAllLines() {
    console.log("off all line", this._lineSelectView);
    this._lineSelectView.offAllLines();
  }
}
