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

  formatNumber(num: number, sign: string): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sign);
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
