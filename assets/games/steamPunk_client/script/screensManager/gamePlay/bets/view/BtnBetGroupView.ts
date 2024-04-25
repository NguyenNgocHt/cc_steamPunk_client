import { _decorator, Component, Node, sp } from "cc";
import { SpiningAnim } from "../../../../animControl/SpiningAnim";
import { ISpiningAnim } from "../../../../interfaces/Common_interfaces";
import { SpriteFrame } from "cc";
import { Sprite } from "cc";
import { EventTouch } from "cc";
import { Vec3 } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { tween } from "cc";
import { Tween } from "cc";
import { Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BtnBetGroupView")
export class BtnBetGroupView extends Component {
  @property(Node)
  btnBet: Node = null;

  @property(SpiningAnim)
  union: SpiningAnim = null;
  @property(SpiningAnim)
  bigGear: SpiningAnim = null;

  @property(SpriteFrame)
  btnBetPress: SpriteFrame = null;
  @property(SpriteFrame)
  btnBetNetural: SpriteFrame = null;

  @property(Node)
  winFreeSpine: Node = null;
  @property(Label)
  lbFreeSpine: Label = null;

  @property(sp.Skeleton)
  animBetPress: sp.Skeleton = null;
  @property(sp.Skeleton)
  animBetRound: sp.Skeleton = null;
  @property(sp.Skeleton)
  tapAnim: sp.Skeleton = null;

  isPressButton: boolean = false;
  originPosNodeUnion: Vec3 = new Vec3(0, 0, 0);
  freeSpineValue: number = 0;

  start() {
    this.init();
    this.registerEvent();
  }

  init() {
    this.initAnim();
    this.initNode();
  }

  initNode() {
    this.winFreeSpine.active = false;
    this.lbFreeSpine.node.active = false;
  }

  initAnim() {
    this.tapAnim.node.active = false;
    this.animBetRound.node.active = false;
    this.animBetPress.node.active = false;
    this.animBetPress.setCompleteListener(() => {
      this.animBetPress.node.active = false;
    });
  }

  registerEvent() {
    this.btnBet.on(Node.EventType.TOUCH_START, this.onBetTouchDown.bind(this));
    this.btnBet.on(Node.EventType.TOUCH_END, this.onBetTouchEnd.bind(this));
  }

  onClickBtnBet() {
    if (!this.isPressButton) {
      this.isPressButton = true;
      this.changeBetBtnWhenPress;
      this.sendActionToBetControl();
    }
  }

  setBtnBetPressStatus(status: boolean) {
    this.isPressButton = status;
  }

  startGameEffect() {
    this.startSpinBigGear();

    this.startAnimBetRound();
  }

  startSpinBigGear() {
    this.bigGear.spinningStart();
  }

  startAnimBetRound() {
    this.animBetRound.node.active = true;
  }

  startSpinSmallGear() {
    this.union.spinningStart();
  }

  stopSpinGear() {
    this.union.spinningStop();
  }

  changeBetBtnWhenPress() {
    let posUnion = this.union.node.getWorldPosition();
    this.originPosNodeUnion = posUnion;
    let spriteNode = this.btnBet.getComponent(Sprite);

    spriteNode.spriteFrame = this.btnBetPress;
    this.animBetPress.node.active = true;

    this.animBetPress.setAnimation(0, "Sprite", false);
    Tween.stopAllByTarget(this.node);
    tween(this.node)
      .delay(0.1)
      .call(() => {
        this.animBetPress.setAnimation(0, "Sprite", false);
      })
      .delay(0.1)
      .call(() => {
        this.animBetPress.setAnimation(0, "Sprite", false);
      })
      .start();

    this.union.node.worldPosition = new Vec3(posUnion.x, 125, 0);
    this.startSpinSmallGear();
    this.bigGear.changeTimeLoopSpinning(2);
  }

  changeBetBtnWhenNetural() {
    this.isPressButton = false;
    this.stopSpinGear();
    this.bigGear.changeTimeLoopSpinning(5);

    let spriteNode = this.btnBet.getComponent(Sprite);

    spriteNode.spriteFrame = this.btnBetNetural;
    this.union.node.worldPosition = new Vec3(this.originPosNodeUnion.x, 180, 0);
    this.checkFreeSpineValue();
  }

  onBetTouchDown(event: EventTouch) {
    if (!this.isPressButton) {
      this.startSpinSmallGear();
      this.bigGear.changeTimeLoopSpinning(2);
      this.changeBetBtnWhenPress();
    }
  }

  onBetTouchEnd(event: EventTouch) {}

  sendActionToBetControl() {
    EventBus.dispatchEvent(GAME_EVENT.ON_CLICK_BET_BUTTON);
  }

  showTextWinFreeSpine() {
    console.log("show win free spine");
    this.winFreeSpine.active = true;
    setTimeout(() => {
      console.log("off win free spine");
      this.winFreeSpine.active = false;
    }, 2);
  }

  showFreeSpineValue(value: number) {
    this.freeSpineValue = value;
    this.lbFreeSpine.node.active = true;
    this.lbFreeSpine.string = value.toString();
  }

  checkFreeSpineValue() {
    if (this.freeSpineValue == 1) {
      this.lbFreeSpine.string = "";
      this.lbFreeSpine.node.active = false;
    }
  }
}
