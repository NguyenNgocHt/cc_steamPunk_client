import { GameInfoData, PendingData } from "./../../../../dataModel/GameInfoDataType";
import { _decorator } from "cc";
import BaseScreen from "../../../../../../../framework/ui/BaseScreen";
import Utils from "../../../../../../../framework/utils/Utils";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { PlayerController } from "../../player/controller/PlayerController";
import GameInfo from "../../../../common/GameInfo";
import { playerInfo } from "../../../../dataModel/PlayerDataType";
import { PlayerInfo } from "../../../../common/PlayerInfo";
import { IGameData, IGameInfo, IPLayerInfo } from "../../../../interfaces/Common_interfaces";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { landingController } from "../../landing/controller/LandingController";
import { PlayScreenView } from "../view/PlayScreenView";
import { BetController } from "../../bets/controller/BetController";
import { BetData, BetResultsData } from "../../../../dataModel/BetDataType";
import { IBetResultService, IGameLogicController, IHistoryService, IPlayerInfoService } from "../../../../interfaces/gamePlay/GamePlayInterfaces";
import { BetResultService } from "../service/BetResultService";
import { GameLayerController } from "../../mainLayer/controller/GameLayerController";
import { ISocketIOClient } from "../../../../interfaces/Mock_interfaces";
import { GameData } from "../../../../common/GameData";
import { HistoryService } from "../service/HistoryService";
import { MockGameLogicController } from "./MockGameLogicController";
import { PlayerInfoService } from "../service/PlayerInfoService";
import { GameLogicController } from "./GameLogicController";

const { ccclass, property } = _decorator;

@ccclass("gamePlayController")
export class gamePlayController extends BaseScreen {
  @property(GameLayerController)
  gameLayerControl: GameLayerController = null;

  @property(PlayerController)
  PlayerControl: PlayerController = null;

  @property(landingController)
  landingGroup: landingController = null;

  @property(BetController)
  betControl: BetController = null;

  @property(PlayScreenView)
  playScreenView: PlayScreenView = null;

  gameInfoData: GameInfoData = null;
  playerInfoData: playerInfo = null;

  _playerInfo: IPLayerInfo = null;
  _gameInfo: IGameInfo = null;
  _gameData: IGameData = null;

  betResulService: IBetResultService = null;
  historyService: IHistoryService = null;
  playerInfoService: IPlayerInfoService = null;

  betInfoData: BetData = null;
  _socketIOInstance: ISocketIOClient = null;

  GameLogicController: IGameLogicController = null;

  public dataGame: any = null;

  onLoad() {
    this.landingGroup.node.active = true;
    let dataDecode = Utils.parseUrlData();
    if (dataDecode) {
      this.dataGame = Object.assign(dataDecode);
      EventBus.dispatchEvent(GAME_EVENT.SEND_GAME_DATA, this.dataGame);
    }
  }

  start() {
    this.registerEventGame();
    this.init();
    this.registerPlayerInfo();
    this.registerGameInfo();
    this.registerGameData();
    this.registerHistorySevice();
    this.initGameLogicController();
    this.requestData();
  }

  init() {
    this._playerInfo = new PlayerInfo();

    this._gameInfo = new GameInfo();

    this._gameData = new GameData();

    this.playerInfoService = new PlayerInfoService();

    this.betResulService = new BetResultService();

    this.historyService = new HistoryService();

    this.GameLogicController = new GameLogicController();
    // this.GameLogicController = new MockGameLogicController();
  }

  registerPlayerInfo() {
    this._playerInfo.init();
  }

  registerGameInfo() {
    this._gameInfo.init();
  }
  registerGameData() {
    this._gameData.init();
  }

  registerHistorySevice() {
    this.historyService.initGameData();
  }

  initGameLogicController() {
    this.GameLogicController.initGameStart();
  }

  registerEventGame() {
    EventBus.on(GAME_EVENT.SEND_BET_RESULT_DATA_TO_GAME_CONTROLLER, this.placeBetResponseHandle.bind(this));
    EventBus.on(GAME_EVENT.SEND_GAME_INFO_DATA_TO_GAME_CONTROLLER, this.setGameInfo.bind(this));
  }

  placeBetResponseHandle(msg) {
    let betData: BetData = null;
    betData = msg as BetData;
    this.betInfoData = betData;
    let betResultData = betData.result as BetResultsData;

    this.betResulService.handleBetResultData(betData);

    this.gameLayerControl.handleBetResult(betResultData);

    this.PlayerControl.minusMoneyBet(betResultData.stake);

    this.betControl.changeBetbtnSatus();
    EventBus.dispatchEvent(GAME_EVENT.SEND_BET_RESULT_DATA, betData);

    this.requestData();
  }

  async requestData() {
    this.historyService.getHistory(this.dataGame, (data) => {
      this.betControl.showHistoryContent(data);
    });
  }

  setGameInfo(data) {
    console.log("game data", data);
    this.gameInfoData = data as GameInfoData;
    let pendingData = this.gameInfoData.pending as PendingData;
    if (pendingData.freeSpins > 0) {
      EventBus.dispatchEvent(GAME_EVENT.PENDING_DATA, pendingData);
    }
    console.log(pendingData);
    this.playerInfoData = {
      userName: data.username,
      money: data.balance,
      currency: data.currency,
    };
    EventBus.dispatchEvent(GAME_EVENT.SEND_TO_PLAYER_INFO, this.playerInfoData);

    EventBus.dispatchEvent(GAME_EVENT.SEND_TO_GAME_INFO, this.gameInfoData);

    this.PlayerControl.setPlayerInfo(this.playerInfoData);
  }
}
