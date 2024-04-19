import { _decorator, Component } from "cc";
import { IBetLineGroupView } from "../../../../interfaces/gamePlay/bets_interfaces";
import { Label } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { HtmlTextParser } from "cc";

const { ccclass, property } = _decorator;

@ccclass("BetLineGroupView")
export class BetLineGroupView extends Component implements IBetLineGroupView {
  @property(Label)
  lbNumberBetLine: Label = null;
  @property(Label)
  lbTotal: Label = null;

  defaultBetLine: number = 1;
  defaultTotal: number = 0.05;
  addNumberTotalPoint: number = 0.05;
  //   addNumberBetLine: number = 1;
  currentBetLine: number = 0;
  currentTotalPoint: number = 0; //totalStake
  currentBetLineValue: number = 0;

  onLoad() {
    this.lbNumberBetLine.string = this.defaultBetLine.toString();

    this.lbTotal.string = this.defaultTotal.toString();

    this.currentBetLine = this.defaultBetLine;
    this.currentTotalPoint = this.defaultTotal;
    this.currentBetLineValue = 0.05;
  }

  onClickSubLine() {
    this.onChangeBetLine(function computeNewBetLine(currentBetLine) {
      let newBetLine = currentBetLine - 1;
      newBetLine = newBetLine <= 0 ? 1 : newBetLine;

      return newBetLine;
    });
  }
  onClickAddLine() {
    this.onChangeBetLine(function computeNewBetLine(currenrtBetLine) {
      let newBetLine = currenrtBetLine + 1;
      newBetLine = newBetLine >= 5 ? 5 : newBetLine;

      return newBetLine;
    });
  }

  onChangeBetLine(computeNewBetLine: (...args: any[]) => number) {
    this.currentBetLine = computeNewBetLine(this.currentBetLine);

    this.lbNumberBetLine.string = this.currentBetLine.toString();
    EventBus.dispatchEvent(GAME_EVENT.SEND_CURRENT_BET_LINE, this.currentBetLine);
    this.updateLbTotalBet(this.currentBetLine);
  }

  setCurrentBetLineValue(currentBetLineValue: number) {
    this.currentBetLineValue = currentBetLineValue;
    this.updateLbTotalBet(this.currentBetLine);
  }

  updateLbTotalBet(currentBetLine: number) {
    let totalBet = currentBetLine * this.currentBetLineValue;
    if (!Number.isInteger(totalBet)) {
      totalBet = parseFloat(totalBet.toFixed(3));
    }
    this.lbTotal.string = totalBet.toString();
  }
}
