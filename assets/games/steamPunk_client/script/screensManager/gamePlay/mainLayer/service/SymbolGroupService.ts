import { _decorator, Component, Node } from 'cc';
import { Global } from '../../../../common/Global';
import { MAP_SYMBOL } from '../../../../common/define';
const { ccclass, property } = _decorator;

@ccclass("SymbolGroupService")
export class SymbolGroupService extends Component {
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
        if (j == 0) {
          if (i >= 3 && i <= 5) {
            oldSymbolIndexList[i][j] = newList[0][i - 3];

            row.push(oldSymbolIndexList[i][j]);
          } else {
            row.push(oldSymbolIndexList[i][j]);
          }
        } else if (j == 1) {
          if (i >= 3 && i <= 5) {
            oldSymbolIndexList[i][j] = newList[1][i - 3];

            row.push(oldSymbolIndexList[i][j]);
          } else {
            row.push(oldSymbolIndexList[i][j]);
          }
        } else if (j == 2) {
          if (i >= 3 && i <= 5) {
            oldSymbolIndexList[i][j] = newList[2][i - 3];

            row.push(oldSymbolIndexList[i][j]);
          } else {
            row.push(oldSymbolIndexList[i][j]);
          }
        } else {
          row.push(oldSymbolIndexList[i][j]);
        }
      }
      newSymbolList.push(row);
    }
    return newSymbolList;
  }
}


