import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LampView")
export class LampView extends Component {
  @property(Node)
  lampOn: Node = null;
  @property(Node)
  lampOff: Node = null;

  offLamp() {
    this.lampOff.active = true;
    this.lampOn.active = false;
  }
  
  onLamp() {
    this.lampOn.active = true;
    this.lampOff.active = false;
  }
}
