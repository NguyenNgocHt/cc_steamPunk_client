import { Vec3 } from "cc";
import { SpriteFrame } from "cc";
import { Sprite } from "cc";
import { JsonAsset } from "cc";
import { tween } from "cc";
import { _decorator, Component, Node, sp } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { Vec2 } from "cc";
import { Size } from "cc";
import { UITransform } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SymbolView")
export class SymbolView extends Component {
  @property(Node)
  symbolImage: Node = null;

  @property(Node)
  symbolAnim: Node = null;

  @property(sp.SkeletonData)
  AnimJsonDataList: sp.SkeletonData[] = [];

  @property(SpriteFrame)
  symbolImageList: SpriteFrame[] = [];

  nodeScaleList: Number[] = [];

  symbolPosList: Vec2[] = [];

  symbolSizeList: Size[] = [];

  rowIndex: number = 0;
  columnIndex: number = 0;

  distanceRow: number = 240;

  positionYTop: number = 1815;
  positionYBottom: number = -825;

  symbolIndex: number = 0;

  isShowAnim: boolean = false;

  timeDelayRow1: number = 0.1;
  timeDelayRow2: number = 0.3;
  timeDelayRow3: number = 0.5;

  start() {
    this.setInitState();
    this.symbolAnim.getComponent(sp.Skeleton).setCompleteListener(() => {
      this.symbolAnim.active = false;
      this.isShowAnim = false;
    });
  }

  setInitState() {
    this.symbolImage.active = true;
    this.symbolAnim.active = false;
  }

  setRowIndex(row: number) {
    this.rowIndex = row;
  }

  getRowIndex(): number {
    return this.rowIndex;
  }

  setColumnIndex(column: number) {
    this.columnIndex = column;
  }

  getColumnIndex(): number {
    return this.columnIndex;
  }

  setSymbolIndex(symbolIndex: number) {
    this.symbolIndex = symbolIndex;
  }

  setSymbolPosList(symbolPosList: Vec2[]) {
    this.symbolPosList = symbolPosList;
  }

  setSymbolSizeList(symbolSizeList: Size[]) {
    this.symbolSizeList = symbolSizeList;
  }

  setNodeScaleList(nodeScaleList: Number[]) {
    this.nodeScaleList = nodeScaleList;
    console.log("scale list", this.nodeScaleList);
  }

  setAnimStatus(status: boolean) {
    this.isShowAnim = status;
  }
  showPositionSymbol() {
    console.log("symbolInfo", this.rowIndex, this.columnIndex, this.node.getWorldPosition(), this.node.name);
  }

  spin(loopIndex: number) {
    let timeMove_startSpinning = 1;
    let timeDelay: number = 0;
    let downIndex = -1;
    let posStart = this.node.getWorldPosition();
    if (this.columnIndex == 0) {
      timeDelay = this.timeDelayRow1;
    } else if (this.columnIndex == 1) {
      timeDelay = this.timeDelayRow2;
    } else if (this.columnIndex == 2) {
      timeDelay = this.timeDelayRow3;
    }

    let action_startSpinning = () => {
      tween(this.node)
        .by(timeMove_startSpinning, { worldPosition: new Vec3(0, downIndex * this.distanceRow, 0) }, { easing: "backInOut" })
        .start();
    };
    let action_spinning = () => {
      let timeMove_spinning = 0.06;
      tween(this.node)
        .by(timeMove_spinning, { worldPosition: new Vec3(0, downIndex * this.distanceRow, 0) })
        .call(() => {
          let currentPos = this.node.getWorldPosition();
          if (currentPos.y <= this.positionYBottom) {
            this.node.setWorldPosition(posStart.x, this.positionYTop, 0);
            if (this.symbolIndex != parseInt(this.node.name)) {
              this.changeSpriteFrameAndSkeletonData();
            }
          }
        })
        .union()
        .repeat(loopIndex)
        .start();
    };
    let action_stopSpining = () => {
      let timeMove_spinning = 0.5;
      tween(this.node)
        .by(timeMove_spinning, { worldPosition: new Vec3(0, downIndex * this.distanceRow, 0) }, { easing: "elasticOut" })
        .call(() => {
          let currentPos = this.node.getWorldPosition();
          if (currentPos.y <= this.positionYBottom) {
            this.node.setWorldPosition(posStart.x, this.positionYTop, 0);
          }
        })
        .start();
    };
    tween(this.node)
      .delay(timeDelay)
      .call(action_startSpinning)
      .delay(0.5)
      .call(action_spinning)
      .delay(0.4)
      .call(() => {
        if (this.rowIndex == 11 && this.columnIndex == 2) {
          EventBus.dispatchEvent(GAME_EVENT.ON_SPIN_EFFECT_VER2);
        }
      })
      .delay(0.87)
      .call(action_stopSpining)
      .delay(0.2)
      .call(() => {
        if (this.rowIndex == 11 && this.columnIndex == 2) {
          EventBus.dispatchEvent(GAME_EVENT.SPINING_STOP, this.columnIndex);
        } else if (this.rowIndex == 11 && this.columnIndex == 1) {
          EventBus.dispatchEvent(GAME_EVENT.SPINING_STOP, this.columnIndex);
        } else if (this.rowIndex == 11 && this.columnIndex == 0) {
          EventBus.dispatchEvent(GAME_EVENT.SPINING_STOP, this.columnIndex);
        }
      })
      .start();
  }

  changeSpriteFrameAndSkeletonData() {
    this.changeSymbolImage();

    this.changeSkeletonData();
  }

  changeSymbolImage() {
    let symbolPos = this.symbolPosList[this.symbolIndex - 1];

    let symbolUiTransform = this.symbolImage.getComponent(UITransform);

    let spriteSymbol = this.symbolImage.getComponent(Sprite);

    spriteSymbol.spriteFrame = this.symbolImageList[this.symbolIndex - 1];

    this.symbolImage.setPosition(symbolPos.x, symbolPos.y, 0);

    symbolUiTransform.setContentSize(this.symbolSizeList[this.symbolIndex - 1]);
  }

  changeSkeletonData() {
    this.symbolAnim.active = true;

    let skeletonNode = this.symbolAnim.getComponent(sp.Skeleton);

    skeletonNode.skeletonData = this.AnimJsonDataList[this.symbolIndex - 1];
    if (this.symbolIndex == 6) {
      skeletonNode.setAnimation(0, "Girl-Nice", true);
    } else {
      skeletonNode.setAnimation(0, "animtion0", true);
    }
    this.node.name = this.symbolIndex.toString();

    let symbolScale = this.nodeScaleList[this.symbolIndex - 1] as number;

    this.symbolAnim.setScale(symbolScale, symbolScale, 0);

    this.symbolAnim.active = false;
  }

  showAnimWin() {
    if (this.isShowAnim) {
      this.symbolAnim.active = true;
      if (this.symbolIndex == 6) {
        this.symbolAnim.getComponent(sp.Skeleton).setAnimation(0, "Girl-Nice", false);
      } else {
        this.symbolAnim.getComponent(sp.Skeleton).setAnimation(0, "animtion0", false);
      }
    }
  }
}