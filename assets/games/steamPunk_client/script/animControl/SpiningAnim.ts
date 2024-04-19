import { StartScene } from "./../../../../boot/StartScene";
import { UIOpacity } from "cc";
import { _decorator, Component, Node, Tween, labelAssembler, Label, tween, Vec3 } from "cc";
import { ISpiningAnim } from "../interfaces/Common_interfaces";
const { ccclass, property } = _decorator;

@ccclass("SpiningAnim")
export class SpiningAnim extends Component implements ISpiningAnim {
  private tweenSpin!: Tween<Node>;
  @property(Number)
  timeLoopSpinning: number = 0;
  onLoad() {
    this.initSpinningGear();
  }
  initSpinningGear() {
    let moving = tween(this.node)
      .by(this.timeLoopSpinning, { eulerAngles: new Vec3(0, 0, -360) })
      .repeatForever();
    this.tweenSpin = tween(this.node).then(moving);
    console.log("init tween stop", this.tweenSpin);
  }
  spinningStop() {
    console.log("tween stop", this.tweenSpin);
    this.tweenSpin.stop();
  }
  spinningStart() {
    this.scheduleOnce(function () {
      this.tweenSpin.start();
    }, 0.1);
  }
}
