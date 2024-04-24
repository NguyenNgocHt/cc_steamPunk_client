import { tween } from "cc";
import { Label } from "cc";
import { _decorator, Component, Node, Vec3 } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("WinGameBonusView")
export class WinGameBonusView extends Component {
  @property(Node)
  moneyGroup: Node = null;
  @property(Label)
  lbCoin: Label = null;
  @property(Label)
  lbMultiplier: Label = null;

  @property(Node)
  startNode: Node = null;

  @property(Node)
  originNode: Node = null;

  scaleMax: Vec3 = new Vec3(1.2, 1.2, 1.2);
  scaleMin: Vec3 = new Vec3(0.1, 0.1, 0.1);
  scaleZezo: Vec3 = new Vec3(0, 0, 0);

  OriginPos: Vec3 = new Vec3(0, 0, 0);

  start() {
    this.moneyGroup.setScale(this.scaleZezo);
  }

  resetToOrigin() {
    this.moneyGroup.setScale(this.scaleZezo);
  }

  updateCoinAndMultiplier(coin: number, multiplier: number) {
    let coinValue: number = 0;
    let multiplierValue: number = 0;
    coinValue = coin;
    multiplierValue = multiplier;
    if (!Number.isInteger(coin)) {
      coinValue = Math.round(coin * 100) / 100;
    }
    if (!Number.isInteger(multiplier)) {
      multiplierValue = Math.round(multiplier * 100) / 100;
    }

    this.lbCoin.string = coinValue.toString();
    this.lbMultiplier.string = multiplierValue.toString();
  }

  showEffectMoneyWin(playerPos: Vec3, timeAction1: number, timeAction2: number) {
    let originPos = this.originNode.getPosition();
    let startPos = this.startNode.getWorldPosition();
    let action_ShowMoneyWinStart = () => {
      tween(this.moneyGroup).to(timeAction1, { scale: this.scaleMax }, { easing: "backInOut" }).start();
      tween(this.moneyGroup)
        .to(timeAction1, { worldPosition: new Vec3(startPos.x, startPos.y, 0) }, { easing: "backInOut" })
        .start();
    };

    let action_coinMoveToPayerGroup = () => {
      tween(this.moneyGroup).to(timeAction2, { scale: this.scaleMin }).start();
      tween(this.moneyGroup)
        .to(timeAction2, { worldPosition: new Vec3(playerPos.x, playerPos.y, 0) })
        .start();
    };

    tween(this.node)
      .call(action_ShowMoneyWinStart)
      .delay(timeAction1 + 0.1)
      .call(action_coinMoveToPayerGroup)
      .delay(timeAction2 + 0.05)
      .call(() => {
        console.log("update money in playerGroup");
        EventBus.dispatchEvent(GAME_EVENT.UPDATE_MONEY_PLAYER);
        this.moneyGroup.setScale(this.scaleZezo);
        this.moneyGroup.setPosition(originPos.x, originPos.y, 0);
      })
      .start();
  }
}
