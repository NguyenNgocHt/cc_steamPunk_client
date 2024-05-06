import { Vec3 } from "cc";
import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ToggleAutoView")
export class ToggleAutoView extends Component {
  @property(Node)
  lbAutoPlay: Node = null;

  @property(Node)
  onAutoPlay: Node = null;

  @property(Node)
  offAutoPlay: Node = null;

  originPosLbAutoPlay: Vec3 = new Vec3(0, 0, 0);

  protected start(): void {
    this.originPosLbAutoPlay = this.lbAutoPlay.getPosition();
  }

  setOnAutoPlay() {
    this.onAutoPlay.active = true;
    this.offAutoPlay.active = false;
    this.lbAutoPlay.setPosition(this.originPosLbAutoPlay.x - 50, this.originPosLbAutoPlay.y, 0);
  }
  setOffAutoPlay() {
    this.onAutoPlay.active = false;
    this.offAutoPlay.active = true;
    this.lbAutoPlay.setPosition(this.originPosLbAutoPlay);
  }
}
