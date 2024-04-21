import { _decorator, Component, Node, tween, Vec3 } from "cc";

const { ccclass, property } = _decorator;

@ccclass("GameLayerView")
export class GameLayerView extends Component {
  @property(Node)
  metalgate1: Node = null;
  @property(Node)
  metalgate2: Node = null;
  @property(Node)
  destinationUp: Node = null;
  duration: number = 2;

  metalgateToUp() {
    this.moveMetalgate1();
    this.moveMetalgate2();
  }

  moveMetalgate1() {
    this.moveMetalgateToTaget(this.metalgate1, this.destinationUp);
  }

  moveMetalgate2() {
    this.moveMetalgateToTaget(this.metalgate2, this.destinationUp);
  }

  moveMetalgateToTaget(cutrainNode: Node, nodeTaget: Node) {
    tween(cutrainNode)
      .to(this.duration, { position: new Vec3(nodeTaget.position.x, nodeTaget.position.y) }, { easing: "sineIn" })
      .start();
  }
}
