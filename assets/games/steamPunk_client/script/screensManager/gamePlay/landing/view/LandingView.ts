import { Vec3 } from "cc";
import { tween } from "cc";
import { _decorator, Component, Node } from "cc";

import { Root } from "cc";
import { TiledObjectGroup } from "cc";
import { UIOpacity } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";

const { ccclass, property } = _decorator;

@ccclass("LandingView")
export class LandingView extends Component {
  @property(Node)
  startGroup: Node = null;
  @property(Node)
  CutrainLeft: Node = null;
  @property(Node)
  CutrainRight: Node = null;
  @property(Node)
  CutrainUp: Node = null;
  @property(Node)
  LeftTagetPos: Node = null;
  @property(Node)
  RightTagetPos: Node = null;
  @property(Node)
  UpTagetPos: Node = null;
  @property(Node)
  DownTagetPos: Node = null;

  @property(Node)
  dask: Node = null;

  @property(Node)
  logo: Node = null;

  duration: number = 1.5;
  tagetOpacityIndex: number = 0;

  private moveCompleteCallback: (() => void) | null = null;

  setMoveCompleteCallback(callback: () => void) {
    this.moveCompleteCallback = callback;
  }

  callMoveCompleteCallback() {
    if (this.moveCompleteCallback) {
      this.moveCompleteCallback();
    }
  }

  onClickStartBtn() {
    this.callMoveCompleteCallback();
  }

  moveAllCutrain() {
    this.moveCutrainToLeft();
    this.moveCutranToRight();
    this.moveCutranToUp();
    this.moveStartGroupToDown();
    this.setOpacity();
  }

  moveCutrainToLeft() {
    this.moveCutrainToTaget(this.CutrainLeft, this.LeftTagetPos);
  }

  moveCutranToRight() {
    this.moveCutrainToTaget(this.CutrainRight, this.RightTagetPos);
  }

  moveCutranToUp() {
    this.moveCutrainToTaget(this.CutrainUp, this.UpTagetPos);
  }

  moveStartGroupToDown() {
    this.moveCutrainToTaget(this.startGroup, this.DownTagetPos);
  }

  moveCutrainToTaget(cutrainNode: Node, nodeTaget: Node) {
    tween(cutrainNode)
      .to(this.duration, { position: new Vec3(nodeTaget.position.x, nodeTaget.position.y) }, { easing: "sineIn" })
      .start();
  }

  setOpacity() {
    let logoOpacity = this.logo.getComponent(UIOpacity);
    let daskOpacity = this.dask.getComponent(UIOpacity);
    console.log("daskOpacity", daskOpacity);
    this.setOpacityNode(logoOpacity, this.tagetOpacityIndex, false);
    this.setOpacityNode(daskOpacity, this.tagetOpacityIndex, true);
  }

  setOpacityNode(uiOpacity: UIOpacity, numberTaget: number, isSendMsg: boolean) {
    tween(uiOpacity)
      .to(this.duration, { opacity: numberTaget })
      .call(() => {
        console.log("start game");
        if (isSendMsg) {
          EventBus.dispatchEvent(GAME_EVENT.END_SHOW_LANDING);
        }
      })
      .start();
  }
}
