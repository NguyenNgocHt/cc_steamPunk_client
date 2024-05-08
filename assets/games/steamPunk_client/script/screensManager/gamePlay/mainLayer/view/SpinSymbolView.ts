import { _decorator, Component, Node, tween, Vec3 } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("SpinSymbolView")
export class SpinSymbolView extends Component {
  rowIndex: number = 0;
  columnIndex: number = 0;
  symbolIndex: number = 0;

  distanceRow: number = 240;
  positionYTop: number = 1815;
  positionYBottom: number = -825;

  timeDelayRow1: number = 0.1;
  timeDelayRow2: number = 0.3;
  timeDelayRow3: number = 0.5;

  setRowIndex(row: number) {
    this.rowIndex = row;
  }

  setColumnIndex(column: number) {
    this.columnIndex = column;
  }

  setSymbolIndex(symbolIndex: number) {
    this.symbolIndex = symbolIndex;
  }

  spinning(numMoves: number, timeScale: number) {
    let downIndex = -1;
    let posStart = this.node.parent.getWorldPosition();

    let timeDelay: number = 0;
    if (this.columnIndex == 0) {
      timeDelay = this.timeDelayRow1 / timeScale;
    } else if (this.columnIndex == 1) {
      timeDelay = this.timeDelayRow2 / timeScale;
    } else if (this.columnIndex == 2) {
      timeDelay = this.timeDelayRow3 / timeScale;
    }

    tween(this.node.parent)
      .delay(timeDelay)
      .call(this.actionStartSpinning(timeScale, downIndex))
      .delay(0.5 / timeScale)
      .call(this.actionSpinning(numMoves, timeScale, downIndex, posStart))
      .delay(0.4 / timeScale)
      .call(() => {
        if (this.rowIndex == 11 && this.columnIndex == 2) {
          EventBus.dispatchEvent(GAME_EVENT.ON_SPIN_EFFECT_VER2, timeScale);
        }
      })
      .delay(0.89 / timeScale)
      .call(this.actionStopSpinning(timeScale, downIndex, posStart))
      .delay(0.2 / timeScale)
      .call(() => {
        if (this.rowIndex == 11 && this.columnIndex == 2) {
          EventBus.dispatchEvent(GAME_EVENT.SPINING_STOP, this.columnIndex, timeScale);
        } else if (this.rowIndex == 11 && this.columnIndex == 1) {
          EventBus.dispatchEvent(GAME_EVENT.SPINING_STOP, this.columnIndex, timeScale);
        } else if (this.rowIndex == 11 && this.columnIndex == 0) {
          EventBus.dispatchEvent(GAME_EVENT.SPINING_STOP, this.columnIndex, timeScale);
        }
      })
      .start();
  }

  actionStartSpinning(timeScale: number, downIndex: number): Function {
    let action_startSpining = () => {
      let timeMove_startSpinning = 1 / timeScale;
      tween(this.node.parent)
        .by(timeMove_startSpinning, { worldPosition: new Vec3(0, downIndex * this.distanceRow, 0) }, { easing: "backInOut" })
        .start();
    };
    return action_startSpining;
  }

  actionSpinning(numMoves: number, timeScale: number, downIndex: number, posStart: Vec3): Function {
    let timeMove_spinning = 0.06 / timeScale;
    let action_spinning = () => {
      tween(this.node.parent)
        .by(timeMove_spinning, { worldPosition: new Vec3(0, downIndex * this.distanceRow, 0) })
        .call(() => {
          let currentPos = this.node.parent.getWorldPosition();
          if (currentPos.y <= this.positionYBottom) {
            this.node.parent.setWorldPosition(posStart.x, this.positionYTop, 0);
            if (this.symbolIndex != parseInt(this.node.parent.name)) {
              this.node.emit(GAME_EVENT.SYMBOL_UP_TOP);
            }
          }
        })
        .union()
        .repeat(numMoves)
        .start();
    };
    return action_spinning;
  }

  actionStopSpinning(timeScale: number, downIndex: number, posStart: Vec3): Function {
    let timeMove_stopSpinning = 0.5 / timeScale;
    let action_stopSpining = () => {
      tween(this.node.parent)
        .by(timeMove_stopSpinning, { worldPosition: new Vec3(0, downIndex * this.distanceRow, 0) }, { easing: "elasticOut" })
        .call(() => {
          let currentPos = this.node.parent.getWorldPosition();
          if (currentPos.y <= this.positionYBottom) {
            this.node.parent.setWorldPosition(posStart.x, this.positionYTop, 0);
          }
        })
        .start();
    };
    return action_stopSpining;
  }
}
