import { EventBus } from "../../../../../../../framework/common/EventBus";
import { IGameInfoService } from "../../../../interfaces/Common_interfaces";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { GameInfoService } from "../../mainController/service/GameInfoService";
import { BetAmoutGroupView } from "../view/BetAmoutGroupView";
import { BetLineGroupView } from "../view/BetLineGroupView";
import { BtnBetGroupView } from "../view/BtnBetGroupView";
import { IBetAmoutGroupView, IBetController, IBetLineGroupView, IBtnBetGroupView } from "./../../../../interfaces/gamePlay/bets_interfaces";
import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BetController")
export class BetController extends Component implements IBetController {
  @property(BtnBetGroupView)
  btnBetGroupView: BtnBetGroupView = null;

  @property(BetAmoutGroupView)
  betAmoutGroupView: BetAmoutGroupView = null;

  @property(BetLineGroupView)
  betLineGroupView: BetLineGroupView = null;

  _btnBetGroupView: IBtnBetGroupView = null;
  _gameInfoService: IGameInfoService = null;
  _betAmoutGroupView: IBetAmoutGroupView = null;
  _betLineGroupView: IBetLineGroupView = null;

  onLoad() {
    this.init();
  }
  init() {
    this.initBtnBetGroupView();
    this.initBetAmoutGroupView();
    this.initBetLineGroupView();
    this.initGameInfoService();
    this.registerEvent();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.GET_GAME_INFO, this.getGameInfo.bind(this));
    EventBus.on(GAME_EVENT.CURRENT_BET_VALUE, this.setTotalBet.bind(this));
  }

  offEvent() {
    EventBus.off(GAME_EVENT.GET_GAME_INFO, this.getGameInfo.bind(this));
    EventBus.off(GAME_EVENT.CURRENT_BET_VALUE, this.setTotalBet.bind(this));
  }

  initBtnBetGroupView() {
    this._btnBetGroupView = this.btnBetGroupView;
  }

  initGameInfoService() {
    this._gameInfoService = new GameInfoService();
  }

  initBetAmoutGroupView() {
    this._betAmoutGroupView = this.betAmoutGroupView;
  }

  initBetLineGroupView() {
    this._betLineGroupView = this.betLineGroupView;
  }

  start() {}

  onGameEffect() {
    this._btnBetGroupView.startGameEffect();
  }

  getGameInfo() {
    let listDenominations = this._gameInfoService.getListDenominations();
    let listSettings = this._gameInfoService.getlistSettings();
    console.log(listDenominations, listSettings);
    this._betAmoutGroupView.getListDenominations(listDenominations);
    this._betAmoutGroupView.getListSettings(listSettings);
  }

  setTotalBet(currentBetLineValue: number) {
    console.log("current bet line value", currentBetLineValue);
    this._betLineGroupView.setCurrentBetLineValue(currentBetLineValue);
  }
}
