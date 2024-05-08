import { _decorator, Component, Node, Tween, labelAssembler, Label, tween, Vec3 } from "cc";
import { ISpiningAnim } from "../interfaces/Common_interfaces";
import { CCInteger } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SpiningAnim")
export class SpiningAnim extends Component implements ISpiningAnim {
  private tweenSpin!: Tween<Node>;
  @property(CCInteger)
  timeLoopSpinning: number = 0;
  onLoad() {
    this.initSpinningGear();
  }

  initSpinningGear() {
    let moving = tween(this.node)
      .by(this.timeLoopSpinning, { eulerAngles: new Vec3(0, 0, -360) })
      .repeatForever();
    this.tweenSpin = tween(this.node).then(moving);
  }

  spinningStop() {
    this.tweenSpin.stop();
  }

  spinningStart() {
    this.scheduleOnce(function () {
      this.tweenSpin.start();
    }, 0.1);
  }

  changeTimeLoopSpinning(newTimeLoop: number) {
    this.timeLoopSpinning = newTimeLoop;
    this.initSpinningGear();
    this.spinningStart();
  }
}
