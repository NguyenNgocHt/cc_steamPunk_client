import { _decorator, Component, Node } from "cc";
import { IGearView } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
import { SpiningAnim } from "../../../../animControl/SpiningAnim";
import { TERRAIN_SOUTH_INDEX } from "cc";
import { ISpiningAnim } from "../../../../interfaces/Common_interfaces";
import { tween } from "cc";
import { Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GearView")
export class GearView extends Component implements IGearView {
  @property(Node)
  lightStart: Node = null;

  @property(SpiningAnim)
  GearBig: SpiningAnim = null;
  @property(SpiningAnim)
  GearSmall: SpiningAnim = null;

  @property(Node)
  lbWinStatus: Node = null;

  _spinAnimGearBig: ISpiningAnim = null;
  _spinAnimGearSmall: ISpiningAnim = null;
  onLoad() {
    this.init();
  }
  init() {
    this.initSpinAnimGear();
  }

  initSpinAnimGear() {
    this._spinAnimGearBig = this.GearBig;
    this._spinAnimGearSmall = this.GearSmall;
  }

  onSpinAnimGear() {
    this.GearBig.node.active = true;
    this.GearSmall.node.active = true;
    this._spinAnimGearBig.spinningStart();
    this._spinAnimGearSmall.spinningStart();
  }

  offSpinAnimGear() {
    this._spinAnimGearBig.spinningStop();
    this._spinAnimGearSmall.spinningStop();
    this.GearBig.node.active = false;
    this.GearSmall.node.active = false;
  }

  offLbWinStatus() {
    this.lbWinStatus.active = false;
  }

  onLbWinStatus() {
    this.lbWinStatus.active = true;
  }

  onLightStart() {
    this.lightStart.active = true;
    this.lightStart.setScale(0, 0, 0);
    tween(this.lightStart)
      .to(0.5, { scale: new Vec3(2, 2, 2) })
      .start();
  }

  offLightStart() {
    this.lightStart.setScale(0, 0, 0);
    this.lightStart.active = false;
  }
}
