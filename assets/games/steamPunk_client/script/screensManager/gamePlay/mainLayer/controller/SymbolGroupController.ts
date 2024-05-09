import { _decorator, Component, Node } from "cc";
import { IPoolController } from "../../../../interfaces/Common_interfaces";
import { PoolController } from "../../../../common/PoolController";
import { Vec3 } from "cc";
import { tween } from "cc";
import { paylineConvert } from "../../../../dataModel/BetDataType";
import { MAP_CONVERTED_ROW } from "../../../../common/define";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { SymbolService } from "../service/SymbolService";
import { SymbolController } from "./SymbolController";
import { SymbolInfo } from "../../../../dataModel/SymbolDataType";
const { ccclass, property } = _decorator;

@ccclass("SymbolGroupController")
export class SymbolGroupController extends Component {
  @property(SymbolService)
  symbolService: SymbolService = null;

  @property(Node)
  symbolGroup: Node = null;

  @property(Node)
  posStart: Node = null;

  @property(Vec3)
  positionStart: Vec3 = null;

  distanceColumn: number = 300;
  distanceRow: number = 240;
  _poolControl: IPoolController = null;
  _symbolIndexList: number[][] = [];
  _symbolNodeList: Node[] = null;
  row: number = 12;
  column: number = 3;

  initSlotGroup(symbolIndexList: number[][], poolControl: PoolController) {
    if (this.symbolGroup.children) {
      this.symbolGroup.removeAllChildren();
    }
    this._symbolIndexList = [];
    this._symbolNodeList = [];
    this._poolControl = poolControl;

    for (let i = 0; i < this.row; i++) {
      let row: number[] = [];
      for (let j = 0; j < this.column; j++) {
        let k = this.column * i + j;
        row.push(symbolIndexList[i][j]);
        let symbolNode: Node = null;
        symbolNode = this._poolControl.getSymbolNode(symbolIndexList[i][j]);
        if (symbolNode) {
          symbolNode.active = true;
          this.symbolGroup.addChild(symbolNode);

          symbolNode.setWorldPosition(this.positionStart.x + j * this.distanceColumn, this.positionStart.y - i * this.distanceRow, 0);

          let symbolControl = symbolNode.getComponent(SymbolController);
          if (symbolControl) {
            this.initSymbolView(symbolControl, i, j, symbolIndexList);
          }
          this._symbolNodeList.push(symbolNode);
        }
      }
      this._symbolIndexList.push(row);
    }
  }

  initSymbolView(symbolControl: SymbolController, row: number, collumn: number, symbolIndexList) {
    let symbolInfo: SymbolInfo = null;
    symbolInfo = {
      symbolIndex: symbolIndexList[row][collumn],
      rowIndex: row,
      columnIndex: collumn,
    };
    symbolControl.init(symbolInfo, this.symbolService);
  }

  getSymbolNodeList(): Node[] {
    return this._symbolNodeList;
  }

  changeSymbolsIndex(newSymbolIndexlist: number[][]) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let k = this.column * i + j;
        let symbolControl = this._symbolNodeList[k].getComponent(SymbolController);
        if (symbolControl) {
          symbolControl.setSymbolIndex(newSymbolIndexlist[i][j]);
        }
      }
    }
  }

  updateResultsPaylines(paylineCv: paylineConvert) {
    let paylineConvert = paylineCv;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let k = this.column * i + j;
        let symbolControl = this._symbolNodeList[k].getComponent(SymbolController);
        if (symbolControl) {
          if (i >= 3 && i <= 5) {
            if (paylineConvert.rowIndex == i || paylineConvert.rowIndex == i || paylineConvert.rowIndex == i) {
              symbolControl.setAnimStatus(true);
            } else if (paylineConvert.rowIndex == MAP_CONVERTED_ROW.DIAGONAL_4) {
              if (i == 3 && j == 2) {
                symbolControl.setAnimStatus(true);
              } else if (i == 4 && j == 1) {
                symbolControl.setAnimStatus(true);
              } else if (i == 5 && j == 0) {
                symbolControl.setAnimStatus(true);
              }
            } else if (paylineConvert.rowIndex == MAP_CONVERTED_ROW.DIAGONAL_5) {
              if (i == 3 && j == 0) {
                symbolControl.setAnimStatus(true);
              } else if (i == 4 && j == 1) {
                symbolControl.setAnimStatus(true);
              } else if (i == 5 && j == 2) {
                symbolControl.setAnimStatus(true);
              }
            }
          }
        }
      }
    }
  }

  resetAllSymbolGroup(columnIndex: number, timeScale: number) {
    let posOrigin = this.posStart.getWorldPosition();
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let k = this.column * i + j;
        let symbolNode = this._symbolNodeList[k];
        if (symbolNode) {
          if (j == columnIndex) {
            if (i == 2 || i == 3 || i == 4 || i == 5 || i == 6) {
              tween(symbolNode)
                .to(
                  1,
                  { worldPosition: new Vec3(posOrigin.x + j * this.distanceColumn, posOrigin.y - i * this.distanceRow, 0) },
                  { easing: "bounceOut" }
                )
                .call(() => {
                  if (i == 6 && j == 2) {
                    EventBus.dispatchEvent(GAME_EVENT.FINISH_RESET_POSITION_ALL_SYMBOL_GROUP, timeScale);
                  }
                })
                .start();
            } else {
              symbolNode.setWorldPosition(posOrigin.x + j * this.distanceColumn, posOrigin.y - i * this.distanceRow, 0);
            }
          }
        }
      }
    }
  }

  onAnimWinGameInSymbol() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let k = this.column * i + j;
        let symbolControl = this._symbolNodeList[k].getComponent(SymbolController);
        if (symbolControl) {
          if (i >= 3 && i <= 5) {
            symbolControl.showAnimWin();
          }
        }
      }
    }
  }

  traverse2DArray() {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let k = this.column * i + j;
      }
    }
  }
}
