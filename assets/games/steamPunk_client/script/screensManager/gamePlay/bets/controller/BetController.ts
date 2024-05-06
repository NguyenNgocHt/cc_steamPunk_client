import { HistoryContentView } from "./../../../../popups/history/HistoryContentView";
import { PopupHistoryView } from "./../../../../popups/history/PopupHistoryView";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { IGameInfoService } from "../../../../interfaces/Common_interfaces";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { GameInfoService } from "../../mainController/service/GameInfoService";
import { AutoPlayView } from "../view/AutoPlayView";
import { BetAmoutGroupView } from "../view/BetAmoutGroupView";
import { BetLineGroupView } from "../view/BetLineGroupView";
import { BtnBetGroupView } from "../view/BtnBetGroupView";
import { _decorator, Component, Node } from "cc";
import { HistoryView } from "../view/HistoryView";
import { instantiate } from "cc";
import ScreenManager from "../../../../../../../framework/ui/ScreenManager";
import { PATH } from "../../../../common/define";
import { Prefab } from "cc";
import { TuboView } from "../view/TuboView";
import { Game } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BetController")
export class BetController extends Component {
  @property(BtnBetGroupView)
  btnBetGroupView: BtnBetGroupView = null;

  @property(BetAmoutGroupView)
  betAmoutGroupView: BetAmoutGroupView = null;

  @property(BetLineGroupView)
  betLineGroupView: BetLineGroupView = null;

  @property(AutoPlayView)
  autoPlayView: AutoPlayView = null;

  @property(HistoryView)
  historyView: HistoryView = null;

  @property(PopupHistoryView)
  popupHistoryView: PopupHistoryView = null;

  @property(TuboView)
  tuboView: TuboView = null;

  @property(Node)
  historyPopupStartNode: Node = null;
  @property(Node)
  historyPopupTagetNode: Node = null;

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

    EventBus.on(GAME_EVENT.ON_HISTORY_BUTTON, this.showHistoryPopup.bind(this));

    EventBus.on(GAME_EVENT.ON_CLOSE_HISTORY_POPUP, this.offHistoryPopup.bind(this));

    EventBus.on(GAME_EVENT.ON_CLICK_AUTO_PLAY, this.showPopupAutoPlaySettings.bind(this));

    EventBus.on(GAME_EVENT.ON_CLICK_TUBO_BUTTON, this.setPlayTubo.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.GET_GAME_INFO, this.getGameInfo.bind(this));

    EventBus.off(GAME_EVENT.CURRENT_BET_VALUE, this.setTotalBet.bind(this));

    EventBus.off(GAME_EVENT.ON_CLICK_BET_BUTTON, this.sendBetData.bind(this));

    EventBus.off(GAME_EVENT.LOSE_GAME, this.setBetBtnToOriginalState.bind(this));

    EventBus.off(GAME_EVENT.ON_HISTORY_BUTTON, this.showHistoryPopup.bind(this));

    EventBus.off(GAME_EVENT.ON_CLOSE_HISTORY_POPUP, this.offHistoryPopup.bind(this));

    EventBus.off(GAME_EVENT.ON_CLICK_AUTO_PLAY, this.showPopupAutoPlaySettings.bind(this));

    EventBus.off(GAME_EVENT.ON_CLICK_TUBO_BUTTON, this.setPlayTubo.bind(this));
  }

  initGameInfoService() {
    this._gameInfoService = new GameInfoService();
  }

  start() {
    this.setNodesToStartPoint();
  }

  setNodesToStartPoint() {
    this.autoPlayView.setNodeToStartPoint();
    this.historyView.setNodeToStartPoint();
    this.popupHistoryView.setNodeToStartPoint(this.historyPopupStartNode);
    this.tuboView.setOffTubo();
  }

  onStartGame() {
    this.btnBetGroupView.startGameEffect();
    this.autoPlayView.moveNodeToTagetPoint();
    this.historyView.moveNodeToTagetPoint();
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

  onClickBetBtn() {
    this.btnBetGroupView.onClickBtnBet();
  }

  changeBetbtnSatus() {
    this.btnBetGroupView.changeBetBtnWhenPress();
  }

  setBetBtnToOriginalState() {
    this.btnBetGroupView.changeBetBtnWhenNetural();
  }

  showTextWinFreeSpin() {
    this.btnBetGroupView.showTextWinFreeSpin();
  }

  showFreeSpinValue(value: number) {
    this.btnBetGroupView.showFreeSpinValue(value);
  }
  //historyController
  showHistoryPopup() {
    this.popupHistoryView.moveNodeToTagetPoint(this.historyPopupTagetNode, 0.5);
  }

  offHistoryPopup() {
    this.popupHistoryView.moveNodeToTagetPoint(this.historyPopupStartNode, 0.5);
  }

  showHistoryContent(data) {
    this.popupHistoryView.showHistoryContent(data);
  }
  //autoPlay controler
  showPopupAutoPlaySettings() {
    let autoPlayStPrefab = ScreenManager.instance.assetBundle.get(PATH.AUTO_PLAY_SETTINGS, Prefab)!;
    if (autoPlayStPrefab) {
      let autoPlayStNode = instantiate(autoPlayStPrefab);
      if (autoPlayStNode) {
        this.autoPlayView.showPoupAutoPlaySt(autoPlayStNode);
      }
    }
  }

  onAutoPlay() {
    this.autoPlayView.onAutoPlay();
  }

  offAutoPlay() {
    this.autoPlayView.offAutoPlay();
  }

  //tuboController
  setPlayTubo(valueIndex: number) {
    if (valueIndex == 0) {
      this.tuboView.setOffTubo();

      this.btnBetGroupView.changeTimeLoopSpiningBigGrear(5);

      this.btnBetGroupView.setTimeScale(1);
    } else if (valueIndex == 1) {
      this.tuboView.setOnTubo();

      this.btnBetGroupView.changeTimeLoopSpiningBigGrear(2);

      this.btnBetGroupView.setTimeScale(2);
    }
  }
}
