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

    EventBus.on(GAME_EVENT.ON_CLICK_BET_BUTTON, this.getBetData.bind(this));
  }

  offEvent() {
    EventBus.off(GAME_EVENT.GET_GAME_INFO, this.getGameInfo.bind(this));

    EventBus.off(GAME_EVENT.CURRENT_BET_VALUE, this.setTotalBet.bind(this));

    EventBus.off(GAME_EVENT.ON_CLICK_BET_BUTTON, this.getBetData.bind(this));
  }

  initGameInfoService() {
    this._gameInfoService = new GameInfoService();
  }

  start() {}

  onGameEffect() {
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

  getBetData() {
    let betLine = this.betLineGroupView.getCurrentBetLine();
    let lineValue = this.betAmoutGroupView.getCurrentBetLineValue();
    console.log(betLine, lineValue);
    let dataBet = { info: { stake: lineValue, betLines: betLine } };
    SocketIoClient.instance.emit(SOCKET_EVENT.BET, dataBet);
  }
}
