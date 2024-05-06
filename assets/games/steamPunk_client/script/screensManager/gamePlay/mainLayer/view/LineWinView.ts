import { Acceleration } from "cc";
import { BetResultsData } from "./../../../../dataModel/BetDataType";
import { _decorator, Component, Node, sp } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LineWinView")
export class LineWinView extends Component {
  @property(sp.Skeleton)
  lineWin: sp.Skeleton[] = [];

  start() {
    this.offAllEffect();
    for (let i = 0; i < this.lineWin.length; i++) {
      if (this.lineWin[i].node) {
        this.lineWin[i].setCompleteListener(() => {
          this.lineWin[i].node.active = false;
        });
      }
    }
  }
  offAllEffect() {
    for (let i = 0; i < this.lineWin.length; i++) {
      this.lineWin[i].node.active = false;
    }
  }

  onEffect(effectIndex: number, timeScale: number) {
    for (let i = 0; i < this.lineWin.length; i++) {
      if (i == effectIndex - 1) {
        this.lineWin[i].node.active = true;
        this.lineWin[i].setAnimation(0, "Sprite", false);
        this.lineWin[i].timeScale = timeScale;
        this.scheduleOnce(function () {
          this.lineWin[i].node.active = true;
          this.lineWin[i].setAnimation(0, "Sprite", false);
          this.lineWin[i].timeScale = timeScale;
        }, 0.6 / timeScale);
      }
    }
  }
}
