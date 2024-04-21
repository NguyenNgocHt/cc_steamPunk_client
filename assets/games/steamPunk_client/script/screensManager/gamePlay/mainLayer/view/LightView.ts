import { UIOpacity } from "cc";
import { tween } from "cc";
import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LightView")
export class LightView extends Component {
  @property(Node)
  lightOff: Node[] = [];

  @property(Node)
  lightOn: Node[] = [];
  start() {
    this.turnOffAllLights();
  }

  turnsOnLightContinuously() {
    let delayAdd = 0.4;
    let timeStart = 0.1;
    for (let i = this.lightOn.length - 1; i >= 0; i--) {
      this.lightOn[i].active = true;
      this.lightOn[i].setOpacity(0);
      let uiOpacity = this.lightOn[i].getComponent(UIOpacity);
      tween(uiOpacity)
        .delay(timeStart)
        .to(0.1, { opacity: 255 })
        .delay(0.2)
        .to(0.1, { opacity: 0 })
        .call(() => {
          this.lightOn[i].active = false;
        })
        .start();
      timeStart += delayAdd;
    }
  }

  onLight(buldIndex: number, timeDelay: number) {
    for (let i = 0; i < this.lightOn.length; i++) {
      if (i == buldIndex) {
        this.lightOn[i].active = true;
        this.lightOn[i].setOpacity(0);
        let uiOpacity = this.lightOn[i].getComponent(UIOpacity);
        tween(uiOpacity)
          .delay(0.1)
          .to(0.1, { opacity: 255 })
          .delay(timeDelay)
          .to(0.1, { opacity: 0 })
          .call(() => {
            this.lightOn[i].active = false;
          })
          .start();
      }
    }
  }

  turnOffAllLights() {
    for (let i = 0; i < this.lightOff.length; i++) {
      this.lightOff[i].active = true;
      this.lightOn[i].active = false;
    }
  }
}
