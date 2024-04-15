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

  FIRST_NAMES = [
    "John",
    "Emma",
    "Michael",
    "Sophia",
    "William",
    "Olivia",
    "James",
    "Ava",
    "Alexander",
    "Isabella",
    "Benjamin",
    "Mia",
    "Daniel",
    "Charlotte",
    "Matthew",
    "Amelia",
    "Henry",
    "Harper",
    "Andrew",
    "Evelyn",
    "Joseph",
    "Abigail",
    "David",
    "Emily",
    "Samuel",
    "Elizabeth",
    "Ethan",
    "Sofia",
    "Christopher",
    "Avery",
    "Gabriel",
    "Ella",
    "Jackson",
    "Madison",
    "Sebastian",
    "Scarlett",
    "Logan",
    "Grace",
    "Lucas",
    "Chloe",
    "Jack",
    "Lily",
    "Ryan",
    "Addison",
    "Nathan",
    "Natalie",
    "Carter",
    "Hannah",
    "Luke",
  ];

  getFirstName(): string[] {
    return this.FIRST_NAMES;
  }

  RandomNumber(minNumber: number, maxNumber: number): number {
    return Math.floor(Math.random() * maxNumber) + minNumber;
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
}
