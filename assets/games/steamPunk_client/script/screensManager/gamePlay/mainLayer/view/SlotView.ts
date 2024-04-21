import { _decorator, Component, Node } from "cc";
import { ISlotView } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
import { IPoolController } from "../../../../interfaces/Common_interfaces";
import { PoolController } from "../../../../common/PoolController";
import { SymbolView } from "./SymbolView";
import { Vec3 } from "cc";
import { Vec2 } from "cc";
import { UITransform } from "cc";
import { size } from "cc";
import { Size } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SlotView")
export class SlotView extends Component {
  @property(Node)
  symbolGroup: Node = null;

  @property(Node)
  posStart: Node = null;

  @property(Vec3)
  positionStart: Vec3 = null;

  @property(Number)
  symbolScaleList: Number[] = [];

  @property(Vec2)
  symbolPos: Vec2[] = [];

  @property(Size)
  symbolSize: Size[] = [];

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

    let posOrigin = this.posStart.getWorldPosition();
    console.log("posOrigin", posOrigin);

    for (let i = 0; i < this.row; i++) {
      let row: number[] = [];
      for (let j = 0; j < this.column; j++) {
        let k = this.column * i + j;
        row.push(symbolIndexList[i][j]);
        let symbolNode: Node = null;

        symbolNode = this._poolControl.getSymbolNode(symbolIndexList[i][j]);

        console.log("symbol node", symbolNode);
        if (symbolNode) {
          symbolNode.active = true;

          this.symbolGroup.addChild(symbolNode);

          symbolNode.setWorldPosition(this.positionStart.x + j * this.distanceColumn, this.positionStart.y - i * this.distanceRow, 0);

          let symbolView = symbolNode.getComponent(SymbolView);
          if (symbolView) {
            symbolView.setRowIndex(i);

            symbolView.setColumnIndex(j);

            symbolView.setSymbolIndex(symbolIndexList[i][j]);

            symbolView.setNodeScaleList(this.symbolScaleList);

            symbolView.setSymbolPosList(this.symbolPos);

            symbolView.setSymbolSizeList(this.symbolSize);
          }
          this._symbolNodeList.push(symbolNode);
        }
      }
      this._symbolIndexList.push(row);
    }
  }

  getSymbolNodeList(): Node[] {
    return this._symbolNodeList;
  }

  changeSymbolsIndex(newSymbolIndexlist: number[][]) {
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let k = this.column * i + j;
        let symbolView = this._symbolNodeList[k].getComponent(SymbolView);
        if (symbolView) {
          symbolView.setSymbolIndex(newSymbolIndexlist[i][j]);
        }
      }
    }
  }

  resetAllSymbolGroup() {
    let posOrigin = this.posStart.getWorldPosition();
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.column; j++) {
        let k = this.column * i + j;
        let symbolNode = this._symbolNodeList[k];
        if (symbolNode) {
          symbolNode.setWorldPosition(posOrigin.x + j * this.distanceColumn, posOrigin.y - i * this.distanceRow, 0);
        }
      }
    }
  }
}
