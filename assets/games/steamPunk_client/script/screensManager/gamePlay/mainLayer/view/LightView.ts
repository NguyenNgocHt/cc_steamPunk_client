import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LightView")
export class LightView extends Component {
  @property(Node)
  lightOff: Node[] = [];

  @property(Node)
  lightOn: Node[] = [];
}
