import { _decorator, Component, Node } from "cc";
import { SpiningAnim } from "../../../../animControl/SpiningAnim";
import { tween } from "cc";
import { Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GearView")
export class GearView extends Component {
  @property(Node)
  lightStart: Node = null;

  @property(SpiningAnim)
  GearBig: SpiningAnim = null;
  @property(SpiningAnim)
  GearSmall: SpiningAnim = null;

  @property(Node)
  lbWinStatus: Node = null;

  onLoad() {
    this.init();
  }
  init() {}

  onSpinAnimGear() {
    this.GearBig.node.active = true;
    this.GearSmall.node.active = true;

    this.GearBig.spinningStart();

    this.GearSmall.spinningStart();
  }

  offSpinAnimGear() {
    this.GearBig.spinningStop();

    this.GearSmall.spinningStop();

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
