import { _decorator, Component, Node } from "cc";
import BaseSingleton from "../common/BaseSingleton";
import { BNotifyType } from "../../games/steamPunk_client/script/common/Enum";
import { LogUtil } from "./LogUtil";
type NotifyFn = (userData: any, notifyType?: string) => void;

interface IObserver {
  func: NotifyFn;
  target: unknown;
}
const { ccclass, property } = _decorator;

@ccclass("NotifyUtil")
export class NotifyUtil extends BaseSingleton {
  private observerMap: Map<string, IObserver[]> = new Map();

  private constructor() {
    super();
    //  HLNotifyType , observerMap
    for (const key in BNotifyType) {
      if (Object.prototype.hasOwnProperty.call(BNotifyType, key)) {
        //ts-expect-error
        const notifyName = BNotifyType[key];
        if (notifyName !== key) {
          throw new Error(`Definition Error ${key} -> ${notifyName}`);
        }
        this.observerMap.set(notifyName, []);
      }
    }
  }

  public async setup(notifyType: any) {
    if (!notifyType) return;
    LogUtil.log("NotifyUtil setup");
    for (const key in notifyType) {
      if (Object.prototype.hasOwnProperty.call(notifyType, key)) {
        //ts-expect-error
        const notifyName = notifyType[key];
        if (notifyName !== key) {
          throw new Error(`Definition Error ${key} -> ${notifyName}`);
        }
        this.observerMap.set(notifyName, []);
      }
    }
  }

  /**
   *
   *
   * @param notifyType
   * @param notifyFunc
   * @param target
   * @memberof NotifyUtil
   */
  public on(notifyType: string, notifyFunc: NotifyFn, target: unknown) {
    this.observerMap.get(notifyType).push({ func: notifyFunc, target: target });
  }

  /**
   *
   *
   * @param notifyType
   * @param notifyFunc
   * @param target
   * @memberof NotifyUtil
   */
  public off(notifyType: string, notifyFunc: NotifyFn, target: unknown) {
    const observers = this.observerMap.get(notifyType);
    const index = observers.findIndex((o) => o.func === notifyFunc && o.target === target);
    index >= 0 && observers.splice(index, 1);
  }

  /**
   *
   *
   * @template T
   * @param notifyType
   * @param [userData=null]
   * @memberof NotifyUtil
   */
  public emit<T extends unknown>(notifyType: string, userData: T = null) {
    if (this.observerMap.get(notifyType)) {
      this.observerMap.get(notifyType).forEach((obs: IObserver) => {
        if (obs.target) {
          obs.func.call(obs.target, userData, notifyType);
        } else {
          obs.func(userData, notifyType);
        }
      });
    }
  }
}
