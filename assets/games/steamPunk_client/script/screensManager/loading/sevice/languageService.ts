import { _decorator, Component, Node } from "cc";
import { ILanguegeService } from "../../../interfaces/Loading_interfaces";
import Utils from "../../../../../../framework/utils/Utils";
import { HttpClient } from "../../../../../../framework/network/HttpClient";
import { LanguageManager } from "../../../../../../framework/languge/LanguageManager";
const { ccclass, property } = _decorator;

@ccclass("languageService")
export class languageService implements ILanguegeService {
  private isLoadLanguage: boolean = false;
  loadingLanguage(callBack: Function = null) {
    let dataDecode = Utils.parseUrlData();
    this.getSetting(dataDecode, () => {
      this.loadLanguage(dataDecode, () => {
        callBack && callBack(true);
      });
    });
    if (window["onGameInitSuccess"]) {
      window["onGameInitSuccess"]();
    }
  }

  public async getSetting(dataDecode: any, callback: Function = null) {
    if (dataDecode) {
      let url = `${dataDecode.server}${dataDecode.subpath}/setting`;
      let data = await HttpClient.instance.post(url, dataDecode);
      console.log("data", data);
      if (data && data.status === 1) {
        callback && callback(true);
      } else {
        callback && callback(false);
      }
    }
  }

  async loadLanguage(dataDecode: any, callBack: Function = null) {
    if (dataDecode) {
      await new LanguageManager().getLanguage2(
        dataDecode,
        ((result: boolean) => {
          if (result) {
            console.log("loading language success");
            this.isLoadLanguage = result;
            callBack && callBack(true);
          } else {
            callBack && callBack(false);
            setTimeout(() => {
              this.loadLanguage(dataDecode);
            }, 500);
          }
        }).bind(this)
      );
    }
  }

  getResultLoadLanguage(): boolean {
    return this.isLoadLanguage;
  }
}
