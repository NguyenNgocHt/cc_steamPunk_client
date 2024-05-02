import { _decorator, Component, Node } from "cc";
import { IGameData } from "../../../../interfaces/Common_interfaces";
import { GameData } from "../../../../common/GameData";
import { HttpClient } from "../../../../../../../framework/network/HttpClient";
import { LogUtil } from "../../../../../../../framework/utils/LogUtil";
import { IHistoryService } from "../../../../interfaces/gamePlay/GamePlayInterfaces";
import { HistoryData } from "../../../../dataModel/HistoryDataType";
import { Global } from "../../../../common/Global";
const { ccclass, property } = _decorator;

@ccclass("HistoryService")
export class HistoryService implements IHistoryService {
  _gameData: IGameData = null;

  initGameData() {
    this._gameData = new GameData();
  }
  async getHistory(gameData: any, callBack: Function) {
    // let gameData = this._gameData.getGameData();
    console.log("game data", gameData);
    let dataRequest = {
      // "StartTime": 1693440000000,
      // "EndTime": 1693526399999,
      Page: 1,
      Limit: 100,
    };
    let url = `${gameData.server}${gameData.subpath}/history`;
    console.log("url", url);
    let header = { "X-Token": btoa(JSON.stringify(gameData)) };
    let dataRespone = await HttpClient.instance.post(url, dataRequest, header);
    LogUtil.log("requestData", dataRespone);
    if (dataRespone.status == 1) {
      let listData = this.initDataHistory(dataRespone.result);
      callBack && callBack(listData);
    } else {
      LogUtil.log("requestData err!");
    }
  }
  initDataHistory(results: any) {
    let listData = [];
    results.forEach((d) => {
      let gResults = JSON.parse(d.result).Result;
      if (gResults) {
        let data = {
          betTime: d.createTime,
          betId: d.betId,
          betAmount: d.betAmount,
          risk: gResults.Risk,
          multiplier: gResults.Payout / gResults.Stake,
          payout: gResults.Payout,
        };
        listData.push(data);
      }
    });
    return this.convertHistoryData(listData);
  }

  convertHistoryData(listData: any): HistoryData[] {
    let listHistoryData: HistoryData[] = [];
    for (let i = 0; i < listData.length; i++) {
      if (i >= 0 && i < 30) {
        let data: HistoryData = null;
        data = {
          lbDate: Global.instance.extractDate(listData[i].betTime),
          lbTime: Global.instance.extractTime(listData[i].betTime),
          betID: listData[i].betId,
          betAmount: listData[i].betAmount,
          risk: listData[i].risk,
          multiplier: listData[i].multiplier,
          payout: listData[i].payout,
        };
        listHistoryData.push(data);
      }
    }
    return this.reverseList(listHistoryData);
  }
  reverseList(listData: HistoryData[]): HistoryData[] {
    return listData.reverse();
  }
}
