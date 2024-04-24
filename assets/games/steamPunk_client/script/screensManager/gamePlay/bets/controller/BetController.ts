import { EventBus } from "../../../../../../../framework/common/EventBus";
import { IGameInfoService } from "../../../../interfaces/Common_interfaces";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { GameInfoService } from "../../mainController/service/GameInfoService";
import { BetAmoutGroupView } from "../view/BetAmoutGroupView";
import { BetLineGroupView } from "../view/BetLineGroupView";
import { BtnBetGroupView } from "../view/BtnBetGroupView";
import { SocketIoClient } from "../../../../../../../framework/network/SocketIoClient";
import { SOCKET_EVENT } from "../../../../network/networkDefine";
import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BetController")
export class BetController extends Component {
  @property(BtnBetGroupView)
  btnBetGroupView: BtnBetGroupView = null;

  @property(BetAmoutGroupView)
  betAmoutGroupView: BetAmoutGroupView = null;

  @property(BetLineGroupView)
  betLineGroupView: BetLineGroupView = null;

  _gameInfoService: IGameInfoService = null;

  onLoad() {
    this.init();
  }
  init() {
    this.initGameInfoService();
    this.registerEvent();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.GET_GAME_INFO, this.getGameInfo.bind(this));

    EventBus.on(GAME_EVENT.CURRENT_BET_VALUE, this.setTotalBet.bind(this));

    EventBus.on(GAME_EVENT.ON_CLICK_BET_BUTTON, this.sendBetData.bind(this));

    EventBus.on(GAME_EVENT.LOSE_GAME, this.setBetBtnToOriginalState.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.GET_GAME_INFO, this.getGameInfo.bind(this));

    EventBus.off(GAME_EVENT.CURRENT_BET_VALUE, this.setTotalBet.bind(this));

    EventBus.off(GAME_EVENT.ON_CLICK_BET_BUTTON, this.sendBetData.bind(this));
    EventBus.off(GAME_EVENT.LOSE_GAME, this.setBetBtnToOriginalState.bind(this));
  }

  initGameInfoService() {
    this._gameInfoService = new GameInfoService();
  }

  start() {}

  onStartGame() {
    this.btnBetGroupView.startGameEffect();
  }

  getGameInfo() {
    let listDenominations = this._gameInfoService.getListDenominations();

    let listSettings = this._gameInfoService.getlistSettings();
    console.log(listDenominations, listSettings);

    this.betAmoutGroupView.getListDenominations(listDenominations);

    this.betAmoutGroupView.getListSettings(listSettings);
  }

  setTotalBet(currentBetLineValue: number) {
    console.log("current bet line value", currentBetLineValue);
    this.betLineGroupView.setCurrentBetLineValue(currentBetLineValue);
  }

  sendBetData() {
    EventBus.dispatchEvent(GAME_EVENT.BET_DATA, {
      info: {
        stake: this.betAmoutGroupView.getCurrentBetLineValue(),
        betLines: this.betLineGroupView.getCurrentBetLine(),
      },
    });
  }
  changeBetbtnSatus() {
    this.btnBetGroupView.changeBetBtnWhenPress();
  }

  setBetBtnToOriginalState() {
    this.btnBetGroupView.changeBetBtnWhenNetural();
  }

  showTextWinFreeSpine() {
    this.btnBetGroupView.showTextWinFreeSpine();
  }

  showFreeSpineValue(value: number) {
    this.btnBetGroupView.showFreeSpineValue(value);
  }
}
