import { _decorator, Component, Node } from "cc";
import { ILineSelectView } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
import { UIOpacity } from "cc";
import { tween } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LineSelectView")
export class LineSelectView extends Component implements ILineSelectView {
  @property(Node)
  lineSelectGroup: Node[] = [];
  linesShowStatus: number[] = [];
  onLoad() {
    this.initLinesShowStatus();
  }

  initLinesShowStatus() {
    for (let i = 0; i < this.lineSelectGroup.length; i++) {
      this.linesShowStatus.push(0);
    }
  }

  offAllLines() {
    console.log("off all lines");
    for (let i = 0; i < this.lineSelectGroup.length; i++) {
      this.lineSelectGroup[i].active = false;
    }
  }

  showLineSelect(TotalLines: number) {
    for (let i = 0; i < this.lineSelectGroup.length; i++) {
      if (i < TotalLines) {
        if (this.linesShowStatus[i] != 1) {
          this.linesShowStatus[i] = 1;
          console.log("linesShowStatus add", this.linesShowStatus);
          this.lineSelectGroup[i].active = true;
          this.lineSelectGroup[i].setOpacity(0);
          this.setUpOpacityForLines(this.lineSelectGroup[i]);
        }
      } else {
        if (this.lineSelectGroup[i].getOpacity() == 255) {
          this.linesShowStatus[i] = 0;
          console.log("linesShowStatus sub", this.linesShowStatus);
          this.setDownOpacityForLines(this.lineSelectGroup[i]);
        }
      }
    }
  }
  setUpOpacityForLines(lineNode: Node) {
    let opacityLine = lineNode.getComponent(UIOpacity);
    tween(opacityLine).to(0.3, { opacity: 255 }).start();
  }
  setDownOpacityForLines(lineNode: Node) {
    let opacityLine = lineNode.getComponent(UIOpacity);
    tween(opacityLine)
      .to(0.2, { opacity: 0 })
      .call(() => {
        lineNode.active = false;
      })
      .start();
  }
}
