import { PaylinesService } from "./../service/PaylinesService";
import { _decorator, Component, Node } from "cc";
import { SlotView } from "../view/SlotView";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { PoolController } from "../../../../common/PoolController";
import { BetResultsData, NewBetResultList } from "../../../../dataModel/BetDataType";
import { IPaylinesService, ISymbolService } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
import { SymbolService } from "../service/SymbolService";
enum WIN_LOSE_STATE {
  NO_STATE = 0,
  WIN_GAME = 1,
  LOSE_GAME = 2,
}
const { ccclass, property } = _decorator;

@ccclass("SlotController")
export class SlotController extends Component {
  @property(SlotView)
  slotView: SlotView = null;

  symbolIndexList: number[][] = [];
  newSymbolIndexList: number[][] = [];
  paylineList: any[] = [];

  _paylinesService: IPaylinesService = null;
  _symbolService: ISymbolService = null;

  winLoseGameStatus: WIN_LOSE_STATE = WIN_LOSE_STATE.NO_STATE;

  onLoad() {
    this.init();
    this.registerEvent();
  }

  init() {
    this.initSlotService();
  }

  initSlotService() {
    this._paylinesService = new PaylinesService();
    this._symbolService = new SymbolService();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.SPINING_STOP, this.resetAllSymbolGroup.bind(this));
    EventBus.on(GAME_EVENT.FINISH_RESET_POSITION_ALL_SYMBOL_GROUP, this.setWinLoseGame.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.SPINING_STOP, this.resetAllSymbolGroup.bind(this));
    EventBus.on(GAME_EVENT.FINISH_RESET_POSITION_ALL_SYMBOL_GROUP, this.setWinLoseGame.bind(this));
  }

  initSymbolGroup(poolControl: PoolController) {
    let poolControler = poolControl;

    this.symbolIndexList = this._symbolService.generateRandomSymbolList();

    this.slotView.initSlotGroup(this.symbolIndexList, poolControler);
  }

  updateBetResult(betResult: BetResultsData) {
    this.symbolIndexList = [];
    this.newSymbolIndexList = [];
    let newBetResultList = betResult.result as NewBetResultList;
    let newList: number[][] = [];

    newList.push(newBetResultList.reel1);

    newList.push(newBetResultList.reel2);

    newList.push(newBetResultList.reel3);

    this.symbolIndexList = this._symbolService.generateRandomSymbolList();

    this.newSymbolIndexList = this._symbolService.changeNewSymbolIndexList(this.symbolIndexList, newList);

    this.slotView.changeSymbolsIndex(this.newSymbolIndexList);

    this.checkPaylinesData(betResult);
  }

  checkPaylinesData(betResult: BetResultsData) {
    this.paylineList = [];
    this.paylineList = this._paylinesService.checkPayLines(betResult);
    if (!this.paylineList) {
      this.winLoseGameStatus = WIN_LOSE_STATE.LOSE_GAME;
      return;
    } else {
      this.winLoseGameStatus = WIN_LOSE_STATE.WIN_GAME;
      let paylinesConvertList = this._paylinesService.getPaylineData(this.paylineList);

      for (let i = 0; i < paylinesConvertList.length; i++) {
        this.slotView.updateResultsPaylines(paylinesConvertList[i]);
      }
    }
  }

  resetAllSymbolGroup(columnIndex: number) {
    this.slotView.resetAllSymbolGroup(columnIndex);
  }
  setWinLoseGame() {
    if (this.winLoseGameStatus == WIN_LOSE_STATE.WIN_GAME) {
      EventBus.dispatchEvent(GAME_EVENT.WIN_GAME, this.paylineList);

      this.slotView.onAnimWinGameInSymbol();
    } else if (this.winLoseGameStatus == WIN_LOSE_STATE.LOSE_GAME) {
      EventBus.dispatchEvent(GAME_EVENT.LOSE_GAME);
    }
  }
}
