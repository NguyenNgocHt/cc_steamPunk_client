import { labelAssembler } from "cc";
import { Label } from "cc";
import { _decorator, Component, Node } from "cc";
import { HistoryData } from "../../dataModel/HistoryDataType";
import { IHistoryContentView } from "../../interfaces/gamePlay/bets_interfaces";
import { color } from "cc";
import { Color } from "cc";
import { Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("HistoryContentView")
export class HistoryContentView extends Component implements IHistoryContentView {
  @property(Label)
  lbDay: Label = null;
  @property(Label)
  lbTime: Label = null;
  @property(Label)
  lbBetId: Label = null;
  @property(Label)
  lbRiskLevel: Label = null;
  @property(Label)
  lbBestAmount: Label = null;
  @property(Label)
  lbMuntiplier: Label = null;
  @property(Label)
  lbPayout: Label = null;
  @property(Sprite)
  bgMultiplier: Sprite = null;

  maxLength = 10;
  green: Color = new Color(72, 188, 25, 255);
  red: Color = new Color(245, 122, 127, 255);

  updateHistoryContent(historyData: HistoryData) {
    this.lbDay.string = historyData.lbDate;
    this.lbTime.string = historyData.lbTime;
    this.lbBetId.string = this.checkString(historyData.betID.toString());
    this.lbBestAmount.string = historyData.betAmount.toFixed(4);
    if (!historyData.risk) {
      this.lbRiskLevel.node.active = false;
    } else {
      this.lbRiskLevel.node.active = true;
      this.lbRiskLevel.string = historyData.risk.toString();
    }
    this.lbMuntiplier.string = historyData.multiplier.toFixed(4);
    this.lbPayout.string = historyData.payout.toFixed(4);
    if (historyData.payout == 0) {
      this.lbPayout.color = this.red;
      this.bgMultiplier.color = this.red;
    } else {
      this.lbPayout.color = this.green;
      this.bgMultiplier.color = this.green;
    }
  }

  checkString(text: string): string {
    let slicedText = "";
    for (let i = 0; i < text.length; i += this.maxLength) {
      slicedText += text.slice(i, i + this.maxLength) + "\n";
    }
    return slicedText;
  }
}
