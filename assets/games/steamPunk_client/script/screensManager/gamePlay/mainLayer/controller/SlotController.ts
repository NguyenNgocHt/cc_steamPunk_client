import { PaylinesService } from "./../service/PaylinesService";
import { _decorator, Component, Node } from "cc";
import { SymbolGroupController } from "../controller/SymbolGroupController";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { PoolController } from "../../../../common/PoolController";
import { BetResultsData, NewBetResultList, Results } from "../../../../dataModel/BetDataType";
import { IPaylinesService, ISymbolService } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
import { SymbolGroupService } from "../service/SymbolGroupService";
enum WIN_LOSE_STATE {
  NO_STATE = 0,
  WIN_GAME = 1,
  LOSE_GAME = 2,
}
const { ccclass, property } = _decorator;

@ccclass("SlotController")
export class SlotController extends Component {
  @property(SymbolGroupController)
  symbolGroupController: SymbolGroupController = null;

  symbolIndexList: number[][] = [];
  newSymbolIndexList: number[][] = [];
  paylineList: any[] = [];

  _paylinesService: IPaylinesService = null;
  _symbolGroupService: ISymbolService = null;

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
    this._symbolGroupService = new SymbolGroupService();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.SPINING_STOP, this.resetAllSymbolGroup.bind(this));
    EventBus.on(GAME_EVENT.FINISH_RESET_POSITION_ALL_SYMBOL_GROUP, this.setWinLoseGame.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.SPINING_STOP, this.resetAllSymbolGroup.bind(this));
    EventBus.off(GAME_EVENT.FINISH_RESET_POSITION_ALL_SYMBOL_GROUP, this.setWinLoseGame.bind(this));
  }

  initSymbolGroup(poolControl: PoolController) {
    let poolControler = poolControl;

    this.symbolIndexList = this._symbolGroupService.generateRandomSymbolList();

    this.symbolGroupController.initSlotGroup(this.symbolIndexList, poolControler);
  }

  getBetResult(betResult: BetResultsData) {
    this.symbolIndexList = [];
    this.newSymbolIndexList = [];
    let newBetResultList = betResult.result as NewBetResultList;
    let newList: number[][] = [];

    newList.push(newBetResultList.reel1);

    newList.push(newBetResultList.reel2);

    newList.push(newBetResultList.reel3);

    this.symbolIndexList = this._symbolGroupService.generateRandomSymbolList();

    this.newSymbolIndexList = this._symbolGroupService.changeNewSymbolIndexList(this.symbolIndexList, newList);

    this.symbolGroupController.changeSymbolsIndex(this.newSymbolIndexList);

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
    }
  }

  resetAllSymbolGroup(columnIndex: number, timeScale: number) {
    this.symbolGroupController.resetAllSymbolGroup(columnIndex, timeScale);
  }

  setWinLoseGame(timeScale: number) {
    if (this.winLoseGameStatus == WIN_LOSE_STATE.WIN_GAME) {
      EventBus.dispatchEvent(GAME_EVENT.WIN_GAME, this.paylineList, timeScale);

      this.updateWinAnimStatus();

      this.symbolGroupController.onAnimWinGameInSymbol();
    } else if (this.winLoseGameStatus == WIN_LOSE_STATE.LOSE_GAME) {
      EventBus.dispatchEvent(GAME_EVENT.LOSE_GAME);
    }
  }

  updateWinAnimStatus() {
    let paylinesConvertList = this._paylinesService.getPaylineData(this.paylineList);

    for (let i = 0; i < paylinesConvertList.length; i++) {
      this.symbolGroupController.updateResultsPaylines(paylinesConvertList[i]);
    }
  }
}
