import { _decorator, SpriteAtlas, SpriteFrame } from "cc";
import ScreenManager from "../../../../framework/ui/ScreenManager";
import { Path } from "./Path";
const { ccclass, property } = _decorator;

@ccclass("Global")
export class Global {
  private static _instance: Global = null!;

  public static get instance(): Global {
    if (this._instance == null) {
      this._instance = new Global();
    }

    return this._instance;
  }

  RandomNumber(minNumber: number, maxNumber: number): number {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

  InitListRandom(randomNumber: number, ListIndex: number): number[] {
    let listRandom: number[];
    listRandom = [];
    for (let i = 0; i < ListIndex; i++) {
      if (i == randomNumber) {
        listRandom.push(1);
      } else {
        listRandom.push(0);
      }
    }
    return listRandom;
  }

  formatNumberWithCommas(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getAvatarByID(id: number): SpriteFrame {
    let avatarName = "avatar" + id.toString();
    let avatarGroupPath = Path.AVATAR_TEXTURE_PACKER;
    let texturePacker = ScreenManager.instance.assetBundle.get(avatarGroupPath, SpriteAtlas);
    let spriteFrameAvatar = texturePacker.getSpriteFrame(avatarName);
    return spriteFrameAvatar;
  }

  generateRandomPassword(length: number): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  generateRandomPasswords(count: number, length: number): string[] {
    const passwords: string[] = [];
    for (let i = 0; i < count; i++) {
      passwords.push(this.generateRandomPassword(length));
    }
    return passwords;
  }

  extractDate(milliSeconds: number): string {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date(milliSeconds);
    let day = date.getDate();
    let monthIndex = date.getMonth() + 1;
    let year = date.getFullYear();
    return day + "." + monthNames[monthIndex] + "." + year;
  }
  
  extractTime(milliseconds: number): string {
    let date = new Date(milliseconds);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    return hours + ":" + minutes + ":" + seconds;
  }
}
