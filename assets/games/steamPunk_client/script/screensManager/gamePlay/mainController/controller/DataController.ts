import { _decorator, tween } from "cc";
import { gamePlayController } from "./GamePlayController";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT, SOCKET_EVENT } from "../../../../network/networkDefine";
import { BetResultsData } from "../../../../dataModel/BetDataType";
import { PoolController } from "../../../../common/PoolController";
import { PendingData, gameData } from "../../../../dataModel/GameInfoDataType";
import Utils from "../../../../../../../framework/utils/Utils";

const { ccclass, property } = _decorator;

@ccclass("DataController")
export class DataController extends gamePlayController {
  @property(PoolController)
  poolControl: PoolController = null;
  isFreeSpine: boolean = false;
  betResultData: BetResultsData = null;
  pendingData: PendingData = null;
  gameData: gameData = null;
  multiplierValue: number = 0;

  isShowFreeSpineAnim: boolean = false;

  freeSpineValue: number = 0;

  timeDelayOnBetBtn: number = 0;

  start() {
    this.init();
    this.registerEvent();
    this.initPoolControl();
    this.sendPoolModel();
    this.initSocketIOClient();
    this.setGameData();
  }

  setGameData() {
    let dataDecode = Utils.parseUrlData();
    if (dataDecode) {
      this.gameData = Object.assign(dataDecode);
      EventBus.dispatchEvent(GAME_EVENT.SEND_GAME_DATA, this.gameData);
    }
  }

  initPoolControl() {
    this.poolControl.init();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.END_SHOW_LANDING, this.goToGameMain.bind(this));
    EventBus.on(GAME_EVENT.BET_LAYER_TO_UP_END, this.initStartGame.bind(this));
    EventBus.on(GAME_EVENT.SEND_BET_RESULT_DATA, this.setFreeSpineStatus.bind(this));
    EventBus.on(GAME_EVENT.WIN_GAME, this.handleWinGameData.bind(this));
    EventBus.on(GAME_EVENT.UPDATE_MONEY_PLAYER, this.updateMoneyPlayer.bind(this));
    EventBus.on(GAME_EVENT.BET_DATA, this.sendBet.bind(this));
    EventBus.on(GAME_EVENT.PENDING_DATA, this.checkPendingData.bind(this));
    EventBus.on(GAME_EVENT.LOSE_GAME, this.handleLoseGameData.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.END_SHOW_LANDING, this.goToGameMain.bind(this));
    EventBus.off(GAME_EVENT.BET_LAYER_TO_UP_END, this.initStartGame.bind(this));
    EventBus.off(GAME_EVENT.SEND_BET_RESULT_DATA, this.setFreeSpineStatus.bind(this));
    EventBus.off(GAME_EVENT.WIN_GAME, this.handleWinGameData.bind(this));
    EventBus.off(GAME_EVENT.UPDATE_MONEY_PLAYER, this.updateMoneyPlayer.bind(this));
    EventBus.off(GAME_EVENT.BET_DATA, this.sendBet.bind(this));
    EventBus.off(GAME_EVENT.PENDING_DATA, this.checkPendingData.bind(this));
    EventBus.off(GAME_EVENT.LOSE_GAME, this.handleLoseGameData.bind(this));
  }

  sendPoolModel() {
    EventBus.dispatchEvent(GAME_EVENT.SEND_POOL_MODEL, this.poolControl);
  }

  goToGameMain() {
    this.gameLayerControl.metalgateToUp();

    this.playScreenView.betGroupToUp();
  }

  initStartGame() {
    this.gameLayerControl.startGame();

    this.betControl.onStartGame();

    this.checkFreeSpine();
  }

  setFreeSpineStatus(data) {
    this.betInfoData = data;
    this.betResultData = data.result;

    if (this.betResultData.freeSpins > 0) {
      this.freeSpineValue = this.betResultData.freeSpins;
      if (!this.isFreeSpine) {
        this.isFreeSpine = true;
        this.isShowFreeSpineAnim = true;
        this.timeDelayOnBetBtn = 3;
      }
    } else {
      this.isFreeSpine = false;
    }
  }

  handleWinGameData(paylineList: any[]) {
    this.betResulService.handleBetResultData(this.betInfoData);

    let betResult = this.betResulService.getBetResult();

    let payLines = paylineList;

    this.multiplierValue = this.betResulService.getMultiplierValue();

    let bonusGroupDestinationNode = this.PlayerControl.getBonusGroupDestinationNode();

    this.gameLayerControl.showWinGameBonus(betResult.payout, this.multiplierValue, bonusGroupDestinationNode);

    EventBus.dispatchEvent(GAME_EVENT.SHOW_EFFECT_WIN_GAME, payLines);
  }

  handleLoseGameData() {
    this.betResulService.handleBetResultData(this.betInfoData);

    this.multiplierValue = this.betResulService.getMultiplierValue();
    this.updateMoneyPlayer();
  }

  updateMoneyPlayer() {
    let balance = this._playerInfo.getCurrentMoney();
    if (this.betResultData.payout > 0) {
      balance = balance + this.betResultData.payout;
    }

    this.PlayerControl.updateMoneyEndRound(balance);

    this.PlayerControl.checkIconValue(this.multiplierValue);

    this.betControl.setBetBtnToOriginalState();

    this.scheduleOnce(function () {
      this.checkFreeSpine();
    }, 0.1);
  }

  checkPendingData(pendingData: PendingData) {
    this.pendingData = pendingData;
    if (pendingData.freeSpins > 0) {
      this.freeSpineValue = pendingData.freeSpins;
      if (!this.isFreeSpine) {
        this.isFreeSpine = true;
        this.isShowFreeSpineAnim = true;
        this.timeDelayOnBetBtn = 3;
      }
    } else {
      this.isFreeSpine = false;
    }
  }

  checkFreeSpine() {
    if (!this.isFreeSpine) {
      return;
    } else {
      tween(this.node)
        .delay(this.timeDelayOnBetBtn)
        .call(() => {
          if (this.freeSpineValue == 1) {
            this.freeSpineValue = 0;
          }
          this.sendBetFreeSpine();
          this.setOnClickBet();
          this.showFreeSpineValue();
          this.timeDelayOnBetBtn = 0.5;
        })
        .start();

      this.showFreeSpineAnim();
    }
  }

  sendBetFreeSpine() {
    let dataBet = { info: { stake: 0 } };
    this._socketIOInstance.emit(SOCKET_EVENT.BET, dataBet);
  }

  setOnClickBet() {
    this.betControl.changeBetbtnSatus();
  }

  showFreeSpineValue() {
    this.betControl.showFreeSpineValue(this.freeSpineValue);
  }

  showFreeSpineAnim() {
    if (!this.isShowFreeSpineAnim) {
      return;
    } else {
      this.gameLayerControl.showFreeSpineAnim();
      this.betControl.showTextWinFreeSpine();
      setTimeout(() => {
        this.showFreeSpineValue();
      }, 2000);
      this.isShowFreeSpineAnim = false;
    }
  }

  sendBet(data) {
    if (!this.isFreeSpine) {
      this._socketIOInstance.emit(SOCKET_EVENT.BET, data);
    } else {
      return;
    }
  }
}
