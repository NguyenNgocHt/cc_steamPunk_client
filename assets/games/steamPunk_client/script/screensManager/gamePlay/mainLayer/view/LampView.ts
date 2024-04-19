import { _decorator, Component, Node } from "cc";
import { ILampView } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
const { ccclass, property } = _decorator;

@ccclass("LampView")
export class LampView extends Component implements ILampView {
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
