import { _decorator, Component, Node } from "cc";
import { playerInfo } from "../../../../dataModel/PlayerDataType";
import { Label } from "cc";
import { Prefab } from "cc";
import { Sprite } from "cc";
import { instantiate } from "cc";
import { sp } from "cc";
import { ANIM_NAME } from "../../../../common/define";
import { tween } from "cc";
import { Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfoView")
export class PlayerInfoView extends Component {
  @property(Label)
  userName: Label = null;
  @property(Label)
  money: Label = null;
  @property(Prefab)
  avatarPrefab: Prefab = null;
  @property(Sprite)
  avatar: Sprite = null;

  @property(Node)
  bonusGroupDestination: Node = null;

  private _animAvatar: sp.Skeleton = null;

  setPlayerInfo(data: playerInfo) {
    console.log("player info in player view", data);
    this.userName.string = data.userName;
    this.money.string = data.money.toString();
    this.setAvatar();
  }

  setAvatar() {
    this.avatar.enabled = false;
    this.avatar.spriteFrame = null;
    const nodeAvatar = instantiate(this.avatarPrefab).getComponent(sp.Skeleton);
    this.avatar.node.addChild(nodeAvatar.node);
    this._animAvatar = nodeAvatar;
    this._animAvatar.setAnimation(0, ANIM_NAME.ANIM_IDLE, true);
  }

  onclickAvatar() {
    if (this._animAvatar) {
      this._animAvatar.setAnimation(0, ANIM_NAME.ANIM_BIG_WIN, false);
      this._animAvatar.setCompleteListener(() => {
        this._animAvatar.setAnimation(0, ANIM_NAME.ANIM_IDLE, true);
      });
    }
  }

  showCurrentMoney(currentMoney: number) {
    this.updateCurrentMoney(currentMoney);
    tween(this.money.node)
      .to(0.1, { scale: new Vec3(1.3, 1.3, 1.3) }, { easing: "backIn" })
      .to(0.2, { scale: new Vec3(1, 1, 1) }, { easing: "backOut" })
      .start();
  }

  updateCurrentMoney(currentMoney: number) {
    this.money.string = currentMoney.toString();
  }
  getBonusGroupDesitinationNode(): Node {
    return this.bonusGroupDestination;
  }
}
