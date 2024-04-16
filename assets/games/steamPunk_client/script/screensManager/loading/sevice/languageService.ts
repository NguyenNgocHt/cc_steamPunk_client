import { loginData } from "./../../../dataModel/LoginDataType_sendToSever";
import { _decorator, Component, Node } from "cc";
import { ILanguegeService } from "../../../interfaces/Loading_interfaces";
import Utils from "../../../../../../framework/utils/Utils";
import { HttpClient } from "../../../../../../framework/network/HttpClient";
import { LanguageManager } from "../../../../../../framework/languge/LanguageManager";
const { ccclass, property } = _decorator;

@ccclass("languageService")
export class languageService implements ILanguegeService {
  private isLoadLanguage: boolean = false;
  loadingLanguage() {
    let dataDecode = Utils.parseUrlData();
    console.log("dataDecode", dataDecode);
    this.getSetting(dataDecode, () => {
      console.log("come in get setting ok");
      this.loadLanguage(dataDecode);
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
  async loadLanguage(dataDecode: any) {
    if (dataDecode) {
      await new LanguageManager().getLanguage2(
        dataDecode,
        ((result: boolean) => {
          if (result) {
            console.log("loading language success");
            this.isLoadLanguage = result;
          } else {
            setTimeout(() => {
              this.loadLanguage(dataDecode);
            }, 2000);
          }
        }).bind(this)
      );
    }
  }
  getResultLoadLanguage(): boolean {
    return this.isLoadLanguage;
  }
}
