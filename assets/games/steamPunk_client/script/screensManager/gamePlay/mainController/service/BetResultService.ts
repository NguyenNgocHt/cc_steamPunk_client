import { _decorator } from "cc";
import { IBetResultService } from "../../../../interfaces/gamePlay/GamePlayInterfaces";
import { BetData, BetResultsData, PayLinesDaTa } from "../../../../dataModel/BetDataType";
const { ccclass, property } = _decorator;

@ccclass("BetResultService")
export class BetResultService implements IBetResultService {
  betInfoData: BetData = null;

  handleBetResultData(betInfo: BetData) {
    this.betInfoData = betInfo;
  }

  getBetResult(): BetResultsData {
    return this.betInfoData ? (this.betInfoData.result as BetResultsData) : null;
  }

  getPayLines(betResult: BetResultsData): PayLinesDaTa[] {
    let paylinesList: PayLinesDaTa[] = [];
    if (betResult.paylines.length > 0) {
      let paylines = betResult.paylines;
      for (let i = 0; i < paylines.length; i++) {
        let paylineData = paylines[i] as PayLinesDaTa;
        paylinesList.push(paylineData);
      }
      return paylinesList;
    }
  }

  getBalance(): number {
    var r = this.getBetResult();
    return r != null ? r.balance : 0;
  }

  getMultiplierValue(): number {
    var result = this.getBetResult();
    return result != null ? result.payout / result.stake : -1;
  }
}
