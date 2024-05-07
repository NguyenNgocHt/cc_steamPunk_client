import { _decorator } from "cc";
import { GameLogicController } from "./GameLogicController";
import { IBetResultsServiceMock } from "../../../../interfaces/Mock_interfaces";
import { betResultMock } from "../../../../dataModel/MockConfigData";
import { GameInfoData } from "../../../../dataModel/GameInfoDataType";
import { GameInfoServiceMock } from "../../../../mock/GameInfoServiceMock";
import { BetResultsServiceMock } from "../../../../mock/BetResultsServiceMock";
import { IGameInfoService } from "../../../../interfaces/Common_interfaces";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";

const { ccclass, property } = _decorator;

@ccclass("MockGameLogicController")
export class MockGameLogicController extends GameLogicController {
  gameInfoService: IGameInfoService = null;
  betResultService: IBetResultsServiceMock = null;

  initGameStart() {
    console.log("init start game");
    super.initGameStart();
    this.init();
  }

  init() {
    this.gameInfoService = new GameInfoServiceMock();
    this.betResultService = new BetResultsServiceMock();
    this.betResultService.init();
    this.gameInfoService.init();
    this.setGameInfo();
  }

  onPlaceBet(data: any): void {
    let betResults = this.getBetResults(data);
    EventBus.dispatchEvent(GAME_EVENT.SEND_BET_RESULT_DATA_TO_GAME_CONTROLLER, betResults);
  }

  setGameInfo() {
    console.log("set game info");
    let gameInfo = this.getGameInfo();
    console.log("game info", gameInfo);
    EventBus.dispatchEvent(GAME_EVENT.SEND_GAME_INFO_DATA_TO_GAME_CONTROLLER, gameInfo);
  }

  getBetResults(data: any): betResultMock {
    let betResult = this.betResultService.getBetResults(data);
    return betResult;
  }

  getGameInfo(): GameInfoData {
    let gameInfo = this.gameInfoService.getGameInfo();
    return gameInfo;
  }
}