import { _decorator, Component, Node } from "cc";
import { SymbolView } from "../view/SymbolView";
import { SpinSymbolView } from "../view/SpinSymbolView";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { Collider, Vec2, sp, Size, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SymbolController")
export class SymbolController extends Component {
  @property(SymbolView)
  symbolView: SymbolView = null;

  @property(SpinSymbolView)
  spinSymbolview: SpinSymbolView = null;

  protected start(): void {
    this.registerEvent();
  }

  registerEvent() {
    this.spinSymbolview.node.on(GAME_EVENT.SYMBOL_UP_TOP, this.changeSymbolImage.bind(this));
  }
  unRegisterEvent() {
    this.spinSymbolview.node.off(GAME_EVENT.SYMBOL_UP_TOP, this.changeSymbolImage.bind(this));
  }

  //symbowView controller
  changeSymbolImage() {
    this.symbolView.changeSpriteFrameAndSkeletonData();
  }

  showAnimWin() {
    this.symbolView.showAnimWin();
  }

  setSymbolPosList(symbolPosList: Vec2[]) {
    this.symbolView.setSymbolPosList(symbolPosList);
  }

  setSymbolSizeList(symbolSizeList: Size[]) {
    this.symbolView.setSymbolSizeList(symbolSizeList);
  }

  setNodeScaleList(nodeScaleList: Number[]) {
    this.symbolView.setNodeScaleList(nodeScaleList);
  }

  setAnimStatus(status: boolean) {
    this.symbolView.setAnimStatus(status);
  }

  setSkeletonDataList(skeletonData: sp.SkeletonData[]) {
    this.symbolView.setSkeletonDataList(skeletonData);
  }

  setSymbolImageList(imageList: SpriteFrame[]) {
    this.symbolView.setSymbolImageList(imageList);
  }
  //spinSymbolView controller
  spinning(loopIndex: number, timeScale: number) {
    this.spinSymbolview.spinning(loopIndex, timeScale);
  }
  //commom controller
  setRowIndex(row: number) {
    this.symbolView.setRowIndex(row);
    this.spinSymbolview.setRowIndex(row);
  }

  setColumnIndex(column: number) {
    this.symbolView.setColumnIndex(column);
    this.spinSymbolview.setColumnIndex(column);
  }

  setSymbolIndex(symbolIndex: number) {
    this.symbolView.setSymbolIndex(symbolIndex);
    this.spinSymbolview.setSymbolIndex(symbolIndex);
  }
}
