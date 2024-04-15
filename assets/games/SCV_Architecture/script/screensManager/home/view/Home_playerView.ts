import { Sprite } from "cc";
import { Label } from "cc";
import { _decorator, Component, Node } from "cc";
import { Global } from "../../../common/Global";
import { IPlayerView } from "../../../interfaces/Home_interfaces";
const { ccclass, property } = _decorator;

@ccclass("Home_playerView")
export class Home_playerView extends Component implements IPlayerView {
  @property(Label)
  UserName: Label = null;
  @property(Label)
  Coin: Label = null;
  @property(Sprite)
  Avatar: Sprite = null;

  setUserName(userName: string) {
    this.UserName.string = userName;
  }

  setCoin(coin: number) {
    this.Coin.string = Global.instance.formatNumberWithCommas(coin);
  }

  setAvatarByAvatarID(avatarID: number) {
    let spriteFrame = Global.instance.getAvatarByID(avatarID);

    this.Avatar.spriteFrame = spriteFrame;
  }
}
