import { _decorator, Component, Node } from "cc";
import { Global } from "../../../../common/Global";
import { MAP_SYMBOL } from "../../../../common/define";
import { ISlotService } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
const { ccclass, property } = _decorator;

@ccclass("SlotService")
export class SlotService implements ISlotService {
  row: number = 12;
  column: number = 3;

  generateRandomSymbolList(): number[][] {
    let SymbolList: number[][] = [];
    for (let i = 0; i < this.row; i++) {
      let row: number[] = [];
      for (let j = 0; j < this.column; j++) {
        let randomNumber = Global.instance.RandomNumber(MAP_SYMBOL.a, MAP_SYMBOL.freespin);
        row.push(randomNumber);
      }

      SymbolList.push(row);
    }
    return SymbolList;
  }
  changeNewSymbolIndexList(oldSymbolIndexList: number[][], newList: number[][]): number[][] {
    let newSymbolList: number[][] = [];

    for (let i = 0; i < this.row; i++) {
      let row: number[] = [];
      for (let j = 0; j < this.column; j++) {
        if (i == 3) {
          oldSymbolIndexList[i][j] = newList[0][j];

          row.push(oldSymbolIndexList[i][j]);
        } else if (i == 4) {
          oldSymbolIndexList[i][j] = newList[1][j];

          row.push(oldSymbolIndexList[i][j]);
        } else if (i == 5) {
          oldSymbolIndexList[i][j] = newList[2][j];

          row.push(oldSymbolIndexList[i][j]);
        } else {
          row.push(oldSymbolIndexList[i][j]);
        }
      }
      newSymbolList.push(row);
    }
    return newSymbolList;
  }
}
