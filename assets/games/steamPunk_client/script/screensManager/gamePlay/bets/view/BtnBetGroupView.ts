import { _decorator, Component, Node, sp } from "cc";
import { SpiningAnim } from "../../../../animControl/SpiningAnim";
import { ISpiningAnim } from "../../../../interfaces/Common_interfaces";
import { SpriteFrame } from "cc";
import { Sprite } from "cc";
import { EventTouch } from "cc";
import { Vec3 } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
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

  @property(sp.Skeleton)
  animBetPress: sp.Skeleton = null;
  @property(sp.Skeleton)
  animBetRound: sp.Skeleton = null;
  @property(sp.Skeleton)
  tapAnim: sp.Skeleton = null;

  start() {
    this.init();
    this.registerEvent();
  }

  init() {
    this.initAnim();
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
    this.changeSpriteBtnBet(this.btnBetPress);
    this.senActionToBetControl();
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

  changeSpriteBtnBet(spriteFrameNode: SpriteFrame) {
    let posUnion = this.union.node.getWorldPosition();

    let spriteNode = this.btnBet.getComponent(Sprite);

    spriteNode.spriteFrame = spriteFrameNode;
    this.animBetPress.node.active = true;

    this.animBetPress.setAnimation(0, "Sprite", false);

    this.union.node.worldPosition = new Vec3(posUnion.x, 125, 0);
  }

  onBetTouchDown(event: EventTouch) {
    this.startSpinSmallGear();
    this.bigGear.changeTimeLoopSpinning(2);
    this.changeSpriteBtnBet(this.btnBetPress);
  }

  onBetTouchEnd(event: EventTouch) {}

  senActionToBetControl() {
    EventBus.dispatchEvent(GAME_EVENT.ON_CLICK_BET_BUTTON);
  }
}
