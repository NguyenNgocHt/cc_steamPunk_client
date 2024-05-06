import { _decorator, tween } from "cc";
import { gamePlayController } from "./GamePlayController";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT, SOCKET_EVENT } from "../../../../network/networkDefine";
import { BetResultsData } from "../../../../dataModel/BetDataType";
import { PoolController } from "../../../../common/PoolController";
import { PendingData, gameData } from "../../../../dataModel/GameInfoDataType";

const { ccclass, property } = _decorator;

@ccclass("DataController")
export class DataController extends gamePlayController {
  @property(PoolController)
  poolControl: PoolController = null;
  isFreeSpin: boolean = false;
  betResultData: BetResultsData = null;
  pendingData: PendingData = null;
  gameData: gameData = null;
  multiplierValue: number = 0;

  isShowFreeSpinAnim: boolean = false;

  freeSpinValue: number = 0;

  timeDelayOnBetBtn: number = 0;

  selectedNumber: number = 0;

  isAutoPlay: boolean = false;

  // game: IGameLogic;

  start() {
    this.init();
    this.registerEvent();
    this.initPoolControl();
    this.sendPoolModel();
  }

  initPoolControl() {
    this.poolControl.init();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.END_SHOW_LANDING, this.goToGameMain.bind(this));
    EventBus.on(GAME_EVENT.BET_LAYER_TO_UP_END, this.initStartGame.bind(this));
    EventBus.on(GAME_EVENT.SEND_BET_RESULT_DATA, this.setFreeSpinStatus.bind(this));
    EventBus.on(GAME_EVENT.WIN_GAME, this.handleWinGameData.bind(this));
    EventBus.on(GAME_EVENT.UPDATE_MONEY_PLAYER, this.updateMoneyPlayer.bind(this));
    EventBus.on(GAME_EVENT.BET_DATA, this.placeBet.bind(this));
    EventBus.on(GAME_EVENT.PENDING_DATA, this.checkPendingData.bind(this));
    EventBus.on(GAME_EVENT.LOSE_GAME, this.handleLoseGameData.bind(this));
    EventBus.on(GAME_EVENT.SEND_SELECTED_NUMBER_TO_GAME_CONTROLLER, this.setAutoPlayGame.bind(this));
    EventBus.on(GAME_EVENT.ERASE_SELECTED_NUMBER, this.stopAutoPlay.bind(this));
    EventBus.on(GAME_EVENT.ON_CLICK_TUBO_BUTTON, this.setGreenOverlapActive.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.END_SHOW_LANDING, this.goToGameMain.bind(this));
    EventBus.off(GAME_EVENT.BET_LAYER_TO_UP_END, this.initStartGame.bind(this));
    EventBus.off(GAME_EVENT.SEND_BET_RESULT_DATA, this.setFreeSpinStatus.bind(this));
    EventBus.off(GAME_EVENT.WIN_GAME, this.handleWinGameData.bind(this));
    EventBus.off(GAME_EVENT.UPDATE_MONEY_PLAYER, this.updateMoneyPlayer.bind(this));
    EventBus.off(GAME_EVENT.BET_DATA, this.placeBet.bind(this));
    EventBus.off(GAME_EVENT.PENDING_DATA, this.checkPendingData.bind(this));
    EventBus.off(GAME_EVENT.LOSE_GAME, this.handleLoseGameData.bind(this));
    EventBus.off(GAME_EVENT.SEND_SELECTED_NUMBER_TO_GAME_CONTROLLER, this.setAutoPlayGame.bind(this));
    EventBus.off(GAME_EVENT.ERASE_SELECTED_NUMBER, this.stopAutoPlay.bind(this));
    EventBus.off(GAME_EVENT.ON_CLICK_TUBO_BUTTON, this.setGreenOverlapActive.bind(this));
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

    this.checkFreeSpin();
  }

  setFreeSpinStatus(data) {
    this.betInfoData = data;
    this.betResultData = data.result;

    if (this.betResultData.freeSpins > 0) {
      this.freeSpinValue = this.betResultData.freeSpins;
      if (!this.isFreeSpin) {
        this.isFreeSpin = true;
        this.isShowFreeSpinAnim = true;
        this.timeDelayOnBetBtn = 3;
      }
    } else {
      this.isFreeSpin = false;
    }
  }

  handleWinGameData(paylineList: any[], timeScale: number) {
    this.betResulService.handleBetResultData(this.betInfoData);

    let betResult = this.betResulService.getBetResult();

    let payLines = paylineList;

    this.multiplierValue = this.betResulService.getMultiplierValue();

    let bonusGroupDestinationNode = this.PlayerControl.getBonusGroupDestinationNode();

    this.gameLayerControl.showWinGameBonus(betResult.payout, this.multiplierValue, bonusGroupDestinationNode);

    EventBus.dispatchEvent(GAME_EVENT.SHOW_EFFECT_WIN_GAME, payLines, timeScale);
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
      this.checkFreeSpin();
      if (this.selectedNumber != 0 && !this.isFreeSpin) {
        this.checkAutoPlay();
      }
    }, 0.1);
  }

  checkPendingData(pendingData: PendingData) {
    this.pendingData = pendingData;
    if (pendingData.freeSpins > 0) {
      this.freeSpinValue = pendingData.freeSpins;
      if (!this.isFreeSpin) {
        this.isFreeSpin = true;
        this.isShowFreeSpinAnim = true;
        this.timeDelayOnBetBtn = 3;
      }
    } else {
      this.isFreeSpin = false;
    }
  }

  checkFreeSpin() {
    if (!this.isFreeSpin) {
      return;
    } else {
      tween(this.node)
        .delay(this.timeDelayOnBetBtn)
        .call(() => {
          if (this.freeSpinValue == 1) {
            this.freeSpinValue = 0;
          }
          this.sendBetFreeSpin();
          this.setOnClickBet();
          this.showFreeSpinValue();
          this.timeDelayOnBetBtn = 0.5;
        })
        .start();

      this.showFreeSpinAnim();
    }
  }

  sendBetFreeSpin() {
    let dataBet = { info: { stake: 0 } };
    this.placeBet(dataBet);
  }

  setOnClickBet() {
    this.betControl.changeBetbtnSatus();
  }

  setOnClickBetBtn() {
    this.betControl.onClickBetBtn();
  }

  showFreeSpinValue() {
    this.betControl.showFreeSpinValue(this.freeSpinValue);
  }

  showFreeSpinAnim() {
    if (!this.isShowFreeSpinAnim) {
      return;
    } else {
      this.gameLayerControl.showFreeSpinAnim();
      this.betControl.showTextWinFreeSpin();
      setTimeout(() => {
        this.showFreeSpinValue();
      }, 2000);
      this.isShowFreeSpinAnim = false;
    }
  }

  placeBet(data) {
    EventBus.dispatchEvent(GAME_EVENT.ON_PLACE_BET, data);
  }

  setAutoPlayGame(selectedNumber: number) {
    this.selectedNumber = selectedNumber;
    this.isAutoPlay = true;
    this.setOnClickBetBtn();
    this.betControl.onAutoPlay();
  }

  checkAutoPlay() {
    this.downSelectedNUmber();
    if (this.isAutoPlay) {
      this.setOnClickBetBtn();
    } else {
      return;
    }
  }

  downSelectedNUmber() {
    this.selectedNumber -= 1;
    if (this.selectedNumber == 0) {
      this.isAutoPlay = false;
      EventBus.dispatchEvent(GAME_EVENT.END_AUTO_PLAY);
      this.betControl.offAutoPlay();
    }
  }

  stopAutoPlay() {
    this.selectedNumber = 0;
    this.isAutoPlay = false;
    this.betControl.offAutoPlay();
  }

  setGreenOverlapActive(valueIndex: number) {
    if (valueIndex == 0) {
      this.gameLayerControl.setGreenOverlapActive(false);
    } else if (valueIndex == 1) {
      this.gameLayerControl.setGreenOverlapActive(true);
    }
  }
}

// type PlaceBetResponse = {};

// interface IGameLogic {
//   placeBet(data: any): PlaceBetResponse;
// }

// class DefaultGameLogic implements IGameLogic {
//   _socketIOInstance: ISocketIOClient = null;

//   constructor() {
//     EventBus.on("placebet", this.onPlaceBet);

//     this._socketIOInstance.on(SOCKET_EVENT.BET, this.onPlaceBetResponseHandle.bind(this), true);
//   }

//   onPlaceBetResponseHandle(msg: any) {

//   }

//   //virtual
//   onPlaceBet(data: any): void {
//     this._socketIOInstance.emit(SOCKET_EVENT.BET, data);
//   }

//   placeBet(data: any): PlaceBetResponse {
//     throw new Error("Method not implemented.");
//   }
// }

// class MockGameLogic extends DefaultGameLogic {
//   onPlaceBet(data: any): void {
//     //construct bet result

//     this.onPlaceBetResponseHandle(null);
//   }
// }

// class MockGameLogic implements IGameLogic {
//   placeBet(data: any): PlaceBetResponse {
//     throw new Error("Method not implemented.");
//   }
// }
