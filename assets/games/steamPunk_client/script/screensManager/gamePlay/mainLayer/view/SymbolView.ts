import { Vec3 } from "cc";
import { SpriteFrame } from "cc";
import { Sprite } from "cc";
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

  AnimJsonDataList: sp.SkeletonData[] = [];

  symbolImageList: SpriteFrame[] = [];

  nodeScaleList: Number[] = [];

  symbolPosList: Vec2[] = [];

  symbolSizeList: Size[] = [];

  rowIndex: number = 0;
  columnIndex: number = 0;
  symbolIndex: number = 0;

  distanceRow: number = 240;
  positionYTop: number = 1815;
  positionYBottom: number = -825;

  isShowAnim: boolean = false;

  timeDelayRow1: number = 0.1;
  timeDelayRow2: number = 0.3;
  timeDelayRow3: number = 0.5;

  start() {
    this.setInitState();
    let skeleton = this.symbolAnim.getComponent(sp.Skeleton);
    if (skeleton) {
      skeleton.setCompleteListener(() => {
        skeleton.clearTracks();
        skeleton.setToSetupPose();
        this.symbolImage.active = true;
        this.symbolAnim.active = false;
        this.isShowAnim = false;
      });
    }
  }

  setInitState() {
    this.symbolImage.active = true;
    this.symbolAnim.active = false;
  }

  setRowIndex(row: number) {
    this.rowIndex = row;
  }

  setColumnIndex(column: number) {
    this.columnIndex = column;
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
  }

  setAnimStatus(status: boolean) {
    this.isShowAnim = status;
  }

  setSkeletonDataList(skeletonData: sp.SkeletonData[]) {
    this.AnimJsonDataList = skeletonData;
  }

  setSymbolImageList(imageList: SpriteFrame[]) {
    this.symbolImageList = imageList;
  }

  changeSpriteFrameAndSkeletonData() {
    this.changeSymbolImage();

    this.changeSkeletonData();
  }

  changeSymbolImage() {
    this.symbolImage.active = true;
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
      this.symbolImage.active = false;
      let skeleton = this.symbolAnim.getComponent(sp.Skeleton);
      if (this.symbolIndex == 6) {
        skeleton.setAnimation(0, "Girl-Nice", false);
        skeleton.timeScale = 0.8;
      } else {
        skeleton.setAnimation(0, "animtion0", false);
        skeleton.timeScale = 1;
      }
    }
  }
}
