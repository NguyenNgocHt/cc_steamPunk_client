import { _decorator, Component, Node, sys } from 'cc';
import BaseSingleton from '../common/BaseSingleton';
import { BStorageKey } from '../../games/steamPunk_client/script/common/Enum';
const { ccclass, property } = _decorator;

@ccclass("StorageUtil")
export class StorageUtil extends BaseSingleton {
  private storageMap: Map<string, unknown> = new Map();

  public async setup() {
    console.log("StorageUtil setup");
  }

  public static prefix: string = "";

  /**
   *
   *
   * @memberof StorageUtil
   */
  public dumpStorageMap() {
    const data: Array<{ key: string; value: unknown }> = [];
    this.storageMap.forEach((v, k) => {
      data.push({ key: k, value: v });
    });
    // LogUtil.table(data);
  }

  /**
   *
   *
   * @memberof StorageUtil
   */
  public clearCache() {
    this.storageMap.clear();
  }

  /**
   *
   *
   * @param key
   * @param [value]
   * @returns {*}
   * @memberof StorageUtil
   */
  public read<T>(key: BStorageKey, value?: T): T {
    let result = value;
    let realKey = this.getKey(key);
    if (this.storageMap.has(realKey)) {
      return this.storageMap.get(realKey) as T;
    }
    const userData = JSON.parse(sys.localStorage.getItem(realKey));
    if (userData !== null) {
      result = userData;
    }
    this.storageMap.set(realKey, result);
    return result;
  }

  /**
   *
   *
   * @param key
   * @param value
   * @memberof StorageUtil
   */
  public write<T>(key: BStorageKey, value: T) {
    let realKey = this.getKey(key);
    this.storageMap.set(realKey, value);
    sys.localStorage.setItem(realKey, JSON.stringify(value || null));
  }

  /**
   *
   *
   * @param key
   * @memberof StorageUtil
   */
  public remove(key: BStorageKey) {
    let realKey = this.getKey(key);
    this.storageMap.delete(realKey);
    sys.localStorage.removeItem(realKey);
  }

  /**
   *
   *
   * @memberof StorageUtil
   */
  public clear() {
    this.storageMap.clear();
    sys.localStorage.clear();
  }

  /**
   * key
   *
   * @private
   * @param key
   * @returns {*}
   * @memberof StorageUtil
   */
  private getKey(key: BStorageKey): string {
    return `${StorageUtil.prefix}_${key}`;
  }
}


