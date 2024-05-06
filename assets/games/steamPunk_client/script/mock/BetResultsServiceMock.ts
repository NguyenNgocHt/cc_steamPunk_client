import { PaylinesMock, PaylineMock, ResultMock, ResultsMock } from "./../dataModel/MockConfigData";
import { _decorator } from "cc";
import { IBetResultsServiceMock } from "../interfaces/Mock_interfaces";
import { betResultMock } from "../dataModel/MockConfigData";
import { SendBet } from "../dataModel/BetDataType";
import { Global } from "../common/Global";
import { PAY_OUT_RATE, SYMBOL_LIST } from "../common/define";
import { IPlayerInfoService } from "../interfaces/gamePlay/GamePlayInterfaces";
import { PlayerInfoService } from "../screensManager/gamePlay/mainController/service/PlayerInfoService";

const { ccclass, property } = _decorator;

@ccclass("BetResultsServiceMock")
export class BetResultsServiceMock implements IBetResultsServiceMock {
  currentMoney: IPlayerInfoService = null;
  freeSpine: number = 0;

  init() {
    this.currentMoney = new PlayerInfoService();
  }

  getBetResults(data): betResultMock {
    let resultsMock: ResultsMock = null;
    let resultMock: ResultMock = null;
    let betResults: betResultMock = null;

    resultMock = this.getResults();
    if (this.freeSpine == 0) {
      this.freeSpine = this.getNumberBasedOnProbability();
      console.log("freeSpine value", this.freeSpine);
    }
    let dataInfo = data.info as SendBet;
    if (dataInfo.stake != 0) {
    } else {
      dataInfo.betLines = Global.instance.RandomNumber(0, 5);
      dataInfo.stake = PAY_OUT_RATE[Global.instance.RandomNumber(0, 14)];
      this.freeSpine -= 1;
      console.log("free spine mock", this.freeSpine);
    }

    let paylines = this.getPaylines(dataInfo.betLines, resultMock);
    resultsMock = {
      balance: this.currentMoney.getCurrentMoney(),
      betLines: dataInfo.betLines,
      betTime: "1714025495622",
      freeSpins: this.freeSpine,
      id: "305317612076662785",
      jackpot: 0,
      paylines: paylines,
      payout: this.getPayout(paylines, dataInfo.stake),
      playType: "",
      processedTime: "1714025495630",
      refId: "305317612076662785",
      result: resultMock,
      roundId: "305317612076662785",
      settledTime: "1714025495630",
      stake: dataInfo.stake,
      winlose: -0.025,
    };
    betResults = {
      code: 0,
      msg: "",
      result: resultsMock,
      status: 1,
    };

    return betResults;
  }

  getPaylines(betline: number, resultMock: ResultMock): PaylineMock[] {
    let betLineRandom = Global.instance.RandomNumber(0, betline);

    switch (betLineRandom) {
      case 0:
        let payLineMock: PaylineMock[] = [];
        return (payLineMock = []);
        break;
      case 1:
        return this.getPayline1(resultMock);
        break;
      case 2:
        return this.getPayline2(resultMock);
        break;
      case 3:
        return this.getPayline3(resultMock);
        break;
      case 4:
        return this.getPayline4(resultMock);
        break;
      case 5:
        return this.getPayline5(resultMock);
        break;
    }
  }

  getPayout(paylineMock: PaylinesMock, stake: number): number {
    if (paylineMock.length == 0) {
      return 0;
    } else {
      let payoutSum = 0;
      for (let i = 0; i < paylineMock.length; i++) {
        let payout = paylineMock[i].payoutRate * stake;
        payoutSum = payoutSum + payout;
      }
      return payoutSum;
    }
  }

  getResults(): ResultMock {
    let resultsMock: ResultMock = null;
    resultsMock = {
      reel1: this.getRandomNumberList(),

      reel2: this.getRandomNumberList(),

      reel3: this.getRandomNumberList(),
    };
    return resultsMock;
  }

  getRandomNumberList(): number[] {
    let numberList: number[] = [];
    for (let i = 0; i < 3; i++) {
      let randomNumber = Global.instance.RandomNumber(1, 10);

      numberList.push(randomNumber);
    }
    return numberList;
  }

  getWinType(symbolIndexList: number[]): string {
    return SYMBOL_LIST[symbolIndexList[0] - 1] + "-" + SYMBOL_LIST[symbolIndexList[1] - 1] + "-" + SYMBOL_LIST[symbolIndexList[2] - 1];
  }

  getPayline1(resultMock: ResultMock): PaylineMock[] {
    let payLineMock: PaylineMock[] = [];
    let payline: PaylineMock = null;
    payline = {
      payline: 1,
      payoutRate: PAY_OUT_RATE[Global.instance.RandomNumber(0, 14)],

      symbols: [resultMock.reel1[1], resultMock.reel2[1], resultMock.reel3[1]],

      winType: this.getWinType([resultMock.reel1[1], resultMock.reel2[1], resultMock.reel3[1]]),
    };
    payLineMock.push(payline);
    return payLineMock;
  }

  getPayline2(resultMock: ResultMock): PaylineMock[] {
    let payLineMock: PaylineMock[] = [];
    let t = 0;
    let p = 0;
    for (let i = 0; i < 2; i++) {
      if (i == 0) {
        p = 1;
        t = 1;
      } else if (i == 1) {
        p = 2;
        t = 0;
      }
      let payline: PaylineMock = null;
      payline = {
        payline: p,
        payoutRate: PAY_OUT_RATE[Global.instance.RandomNumber(0, 14)],

        symbols: [resultMock.reel1[t], resultMock.reel2[t], resultMock.reel3[t]],

        winType: this.getWinType([resultMock.reel1[t], resultMock.reel2[t], resultMock.reel3[t]]),
      };
      payLineMock.push(payline);
    }
    return payLineMock;
  }

  getPayline3(resultMock: ResultMock): PaylineMock[] {
    let payLineMock: PaylineMock[] = [];
    let t = 0;
    let p = 0;
    for (let i = 0; i < 3; i++) {
      if (i == 0) {
        t = 1;
        p = 1;
      } else if (i == 1) {
        t = 0;
        p = 2;
      } else if (i == 2) {
        t = 2;
        p = 3;
      }
      let payline: PaylineMock = null;
      payline = {
        payline: p,
        payoutRate: PAY_OUT_RATE[Global.instance.RandomNumber(0, 14)],

        symbols: [resultMock.reel1[t], resultMock.reel2[t], resultMock.reel3[t]],

        winType: this.getWinType([resultMock.reel1[t], resultMock.reel2[t], resultMock.reel3[t]]),
      };

      payLineMock.push(payline);
    }
    return payLineMock;
  }

  getPayline4(resultMock: ResultMock): PaylineMock[] {
    let payLineMock: PaylineMock[] = [];
    let t = 0;
    let p = 0;
    for (let i = 0; i < 4; i++) {
      if (i == 0) {
        t = 1;
        p = 1;
      } else if (i == 1) {
        t = 0;
        p = 2;
      } else if (i == 2) {
        t = 2;
        p = 3;
      }
      if (i >= 0 && i < 3) {
        let payline: PaylineMock = null;
        payline = {
          payline: p,
          payoutRate: PAY_OUT_RATE[Global.instance.RandomNumber(0, 14)],

          symbols: [resultMock.reel1[t], resultMock.reel2[t], resultMock.reel3[t]],

          winType: this.getWinType([resultMock.reel1[t], resultMock.reel2[t], resultMock.reel3[t]]),
        };

        payLineMock.push(payline);
      } else if (i == 3) {
        let payline: PaylineMock = null;
        payline = {
          payline: 4,
          payoutRate: PAY_OUT_RATE[Global.instance.RandomNumber(0, 14)],

          symbols: [resultMock.reel1[2], resultMock.reel2[1], resultMock.reel3[0]],

          winType: this.getWinType([resultMock.reel1[2], resultMock.reel2[1], resultMock.reel3[0]]),
        };
        payLineMock.push(payline);
      }
    }
    return payLineMock;
  }

  getPayline5(resultMock: ResultMock): PaylineMock[] {
    let payLineMock: PaylineMock[] = [];
    let t = 0;
    let p = 0;
    for (let i = 0; i < 4; i++) {
      if (i == 0) {
        p = 1;
        t = 1;
      } else if (i == 1) {
        p = 2;
        t = 0;
      } else if (i == 2) {
        p = 3;
        t = 2;
      }

      if (i >= 0 && i < 3) {
        let payline: PaylineMock = null;
        payline = {
          payline: p,
          payoutRate: PAY_OUT_RATE[Global.instance.RandomNumber(0, 14)],

          symbols: [resultMock.reel1[t], resultMock.reel2[t], resultMock.reel3[t]],

          winType: this.getWinType([resultMock.reel1[t], resultMock.reel2[t], resultMock.reel3[t]]),
        };
        payLineMock.push(payline);
      } else if (i == 3) {
        let payline: PaylineMock = null;
        payline = {
          payline: 4,

          payoutRate: PAY_OUT_RATE[Global.instance.RandomNumber(0, 14)],

          symbols: [resultMock.reel1[2], resultMock.reel2[1], resultMock.reel3[0]],

          winType: this.getWinType([resultMock.reel1[2], resultMock.reel2[1], resultMock.reel3[0]]),
        };

        payLineMock.push(payline);
      } else if (i == 4) {
        let payline: PaylineMock = null;
        payline = {
          payline: 5,
          payoutRate: PAY_OUT_RATE[Global.instance.RandomNumber(0, 14)],

          symbols: [resultMock.reel1[0], resultMock.reel2[1], resultMock.reel3[2]],

          winType: this.getWinType([resultMock.reel1[0], resultMock.reel2[1], resultMock.reel3[2]]),
        };

        payLineMock.push(payline);
      }
    }
    return payLineMock;
  }

  getNumberBasedOnProbability(): number {
    const randomNumber = Math.random() * 100;
    if (randomNumber == 1) {
      return Global.instance.RandomNumber(5, 15);
    } else {
      return 0;
    }
  }
}
