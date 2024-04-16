import { _decorator, Component, Node } from "cc";
import { IPlayerInfoView } from "../../../../interfaces/gamePlay/player_interfaces";
import { playerInfo } from "../../../../dataModel/PlayerDataType";
import { Label } from "cc";
import { labelAssembler } from "cc";
import { Prefab } from "cc";
import { Sprite } from "cc";
import { instantiate } from "cc";
import { sp } from "cc";
import { ANIM_NAME } from "../../../../common/define";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfoView")
export class PlayerInfoView extends Component implements IPlayerInfoView {
  @property(Label)
  userName: Label = null;
  @property(Label)
  money: Label = null;
  @property(Prefab)
  avatarPrefab: Prefab = null;
  @property(Sprite)
  avatar: Sprite = null;

  private _animAvatar: sp.Skeleton = null;
  setPlayerInfo(data: playerInfo) {
    console.log("player info in player view", data);
    this.userName.string = data.userName;
    this.money.string = data.money.toString();
    this.setAvatar();
  }
  setAvatar() {
    this.avatar.enabled = false;
    this.avatar.destroy();
    let nodeAvatar = instantiate(this.avatarPrefab).getComponent(sp.Skeleton);
    this.avatar.node.addChild(nodeAvatar.node);
    this._animAvatar = nodeAvatar;
    this._animAvatar.setAnimation(0, ANIM_NAME.ANIM_IDLE, true);
  }
  onclickAvatar() {
    if (this._animAvatar) {
      let that = this;
      this._animAvatar.setAnimation(0, ANIM_NAME.ANIM_BIG_WIN, false);
      this._animAvatar.setCompleteListener(() => {
        that._animAvatar.setAnimation(0, ANIM_NAME.ANIM_IDLE, true);
      });
    }
  }
}
