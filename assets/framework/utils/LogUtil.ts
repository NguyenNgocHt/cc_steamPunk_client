import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("LogUtil")
export class LogUtil extends Component {
  static ENV = "prod";
  public static logS(str, color) {
    if (LogUtil._isS()) {
      console.log(str, color);
    }
  }
  public static logRequest(...parms) {
    if (LogUtil._isS()) {
      console.log(parms);
    }
  }

  public static log(...parms) {
    if (LogUtil._isS()) {
      console.log(parms);
    }
  }
  public static error(...parms) {
    if (LogUtil._isS()) {
      console.error(parms);
    }
  }
  public static warn(...parms) {
    if (LogUtil._isS()) {
      console.warn(parms);
    }
  }

  static _isS() {
    let url = window.location.href;
    let iUrl = new URL(url);
    let log = iUrl.searchParams.get("log");
    if (LogUtil.ENV.toUpperCase() == "DEV" || LogUtil.ENV.toUpperCase() == "STAGING" || url.indexOf("localhost") || url.indexOf(":7456") || log == "hcm123456") {
      return true;
    }
    return false;
  }
}


