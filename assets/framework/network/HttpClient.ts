import { _decorator, Component, Node } from "cc";
import BaseSingleton from "../common/BaseSingleton";
const { ccclass, property } = _decorator;

@ccclass("HttpClient")
export class HttpClient extends BaseSingleton {
  public async setup() {
    console.log("HttpClient setup");
  }

  public async get(url: string, params?: Record<string, unknown>) {
    try {
      let that = this;
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        url = that.buildUrlWithParams(url, params);
        xhr.open("GET", url);
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.statusText,
            });
          }
        };
        xhr.onerror = function () {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
        };
        xhr.send();
      });
    } catch (e) {}
  }

  public async post(url: string, body: Record<string, unknown>, header: Record<string, string> = null) {
    try {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        if (header) {
          for (const key in header) {
            const value = header[key];
            xhr.setRequestHeader(key, value);
          }
        }
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject({
              status: xhr.status,
              statusText: xhr.statusText,
            });
          }
        };
        xhr.onerror = function () {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
        };
        xhr.send(JSON.stringify(body));
      });
    } catch (e) {}
  }

  private buildUrlWithParams(url: string, params: Record<string, unknown>): string {
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]!.toString()))
      .join("&");

    return url + (url.indexOf("?") === -1 ? "?" : "&") + queryString;
  }
}
