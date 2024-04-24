import { BetResultsData } from "../../dataModel/BetDataType";
import { paylineConvert } from "../../dataModel/BetDataType";

export interface IGearView {
  onSpinAnimGear();
  offSpinAnimGear();
  offLbWinStatus();
  onLbWinStatus();
  onLightStart();
  offLightStart();
}

export interface IPaylinesService {
  checkPayLines(betResult: BetResultsData): any[];
  getPaylineData(paylineList: any[]): paylineConvert[];
}

export interface ISymbolService {
  generateRandomSymbolList(): number[][];
  changeNewSymbolIndexList(oldSymbolIndexList: number[][], newList: number[][]): number[][];
}
