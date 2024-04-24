import { UIOpacity } from "cc";
import { tween } from "cc";
import { _decorator, Component, Node } from "cc";
import { LIGHT_GROUP_NAME } from "../../../../common/define";
const { ccclass, property } = _decorator;

@ccclass("LightView")
export class LightView extends Component {
  @property(Node)
  lightOff: Node[] = [];

  @property(Node)
  lightOn: Node[] = [];

  @property(String)
  nameNode: String = "";
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

  onLight(bulbIndex: number, timeDelay: number) {
    if (bulbIndex <= 3) {
      for (let i = 0; i < this.lightOn.length; i++) {
        if (i == bulbIndex - 1) {
          this.setEffect(i, timeDelay);
        }
      }
    } else if (bulbIndex == 4) {
      if (this.nameNode == LIGHT_GROUP_NAME.LIGHT_LEFT) {
        this.setEffect(2, timeDelay);
      } else if (this.nameNode == LIGHT_GROUP_NAME.LIGHT_RIGHT) {
        this.setEffect(1, timeDelay);
      }
    } else if (bulbIndex == 5) {
      if (this.nameNode == LIGHT_GROUP_NAME.LIGHT_LEFT) {
        this.setEffect(1, timeDelay);
      } else if (this.nameNode == LIGHT_GROUP_NAME.LIGHT_RIGHT) {
        this.setEffect(2, timeDelay);
      }
    }
  }

  setEffect(index: number, timeDelay: number) {
    this.lightOn[index].active = true;
    this.lightOn[index].setOpacity(0);
    let uiOpacity = this.lightOn[index].getComponent(UIOpacity);
    tween(uiOpacity)
      .delay(0.1)
      .to(0.1, { opacity: 255 })
      .delay(timeDelay)
      .to(0.1, { opacity: 0 })
      .call(() => {
        this.lightOn[index].active = false;
      })
      .start();
  }
  turnOffAllLights() {
    for (let i = 0; i < this.lightOff.length; i++) {
      this.lightOff[i].active = true;
      this.lightOn[i].active = false;
    }
  }
}
