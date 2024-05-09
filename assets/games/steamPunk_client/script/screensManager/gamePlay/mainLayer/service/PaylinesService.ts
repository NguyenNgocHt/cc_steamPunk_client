import { BetResultsData } from "./../../../../dataModel/BetDataType";
import { _decorator, Component, Node } from "cc";
import { IPaylinesService } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
import { PayLinesDaTa } from "./../../../../dataModel/BetDataType";
import { paylineConvert } from "./../../../../dataModel/BetDataType";
import { MAP_CONVERTED_ROW } from "../../../../common/define";

const { ccclass, property } = _decorator;

@ccclass("PaylinesService")
export class PaylinesService implements IPaylinesService {
  checkPayLines(betResult: BetResultsData): PayLinesDaTa[] {
    if (betResult.paylines.length > 0) {
      return betResult.paylines as PayLinesDaTa[];
    }
  }

  getPaylineData(paylineList: any[]): paylineConvert[] {
    let paylines = paylineList;
    let paylineConvertList: paylineConvert[] = [];
    for (let i = 0; i < paylines.length; i++) {
      let payline = paylines[i] as PayLinesDaTa;
      if (payline) {
        let paylineCv: paylineConvert = null;
        paylineCv = {
          rowIndex: this.convertPaylineToRowIndex(payline.payline),
          symbols: payline.symbols,
          winType: payline.winType,
        };
        paylineConvertList.push(paylineCv);
      }
    }
    return paylineConvertList;
  }

  convertPaylineToRowIndex(paylineIndex: number): number {
    switch (paylineIndex) {
      case 1:
        return MAP_CONVERTED_ROW.ROW_4;
        break;
      case 2:
        return MAP_CONVERTED_ROW.ROW_3;
        break;
      case 3:
        return MAP_CONVERTED_ROW.ROW_5;
        break;
      case 4:
        return MAP_CONVERTED_ROW.DIAGONAL_4;
        break;
      case 5:
        return MAP_CONVERTED_ROW.DIAGONAL_5;
        break;
    }
  }
}
