import { _decorator, Component, Node, Vec3, Button, tween } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ButtonScale")
export class ButtonScale extends Component {
  @property(Number)
  pressedScale: number = 0.9;
  @property(Number)
  transDuration: number = 0.02;

  private scaleDefault: Vec3 = null;
  public isRun: boolean = true;

  start() {}

  onLoad() {
    this.scaleDefault = new Vec3(this.node.scale.x, this.node.scale.y, this.node.scale.z);
    this.node.on(Node.EventType.TOUCH_START, this.onTouchDown.bind(this), this.node);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchUp.bind(this), this.node);
    this.node.on(Node.EventType.TOUCH_END, this.onTouchUp.bind(this), this.node);
  }

  onTouchDown(event) {
    // tween(this.node).stop();
    let btn = this.node.getComponent(Button);
    if ((btn && !btn.interactable) || !this.isRun) {
      return;
    }
    tween(this.node)
      .to(this.transDuration, { scale: this.scaleDefault })
      .to(this.transDuration, { scale: new Vec3(this.scaleDefault.x * this.pressedScale, this.scaleDefault.y * this.pressedScale, this.scaleDefault.z) })
      .start();
  }

  onTouchUp(event) {
    let btn = this.node.getComponent(Button);
    if ((btn && !btn.interactable) || !this.isRun) {
      return;
    }
    tween(this.node).to(this.transDuration, { scale: this.node.scale }).to(this.transDuration, { scale: this.scaleDefault }).start();
  }
}
