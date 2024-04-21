import { _decorator, Component, Node } from "cc";
import { ISlotService } from "../../../../interfaces/gamePlay/MainLayer_interfaces";
import { SlotService } from "../service/SlotService";
import { SlotView } from "../view/SlotView";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { PoolController } from "../../../../common/PoolController";
import { BetResultsData, NewBetResultList } from "../../../../dataModel/BetDataType";
const { ccclass, property } = _decorator;

@ccclass("SlotController")
export class SlotController extends Component {
  @property(SlotView)
  slotView: SlotView = null;

  symbolIndexList: number[][] = [];
  newSymbolIndexList: number[][] = [];

  poolControler: PoolController = null;
  _slotService: ISlotService = null;

  onLoad() {
    this.init();
    this.registerEvent();
  }

  init() {
    this.initSlotService();
  }

  initSlotService() {
    this._slotService = new SlotService();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.SPINING_STOP, this.resetAllSymbolGroup.bind(this));
  }

  offEvent() {
    EventBus.off(GAME_EVENT.SPINING_STOP, this.resetAllSymbolGroup.bind(this));
  }
  initSymbolGroup(poolControl: PoolController) {
    this.poolControler = poolControl;
    this.getRandomSymbolList();
    this.slotView.initSlotGroup(this.symbolIndexList, this.poolControler);
  }

  getRandomSymbolList() {
    this.symbolIndexList = [];
    this.symbolIndexList = this._slotService.generateRandomSymbolList();
    console.log("symbolIndexList", this.symbolIndexList);
  }
  getBetResult(betResult: BetResultsData) {
    this.newSymbolIndexList = [];
    let newBetResultList = betResult.result as NewBetResultList;
    let newList: number[][] = [];
    newList.push(newBetResultList.reel1);
    newList.push(newBetResultList.reel2);
    newList.push(newBetResultList.reel3);
    console.log(newList);
    this.newSymbolIndexList = this._slotService.changeNewSymbolIndexList(this.symbolIndexList, newList);
    console.log("newSymbol", this.newSymbolIndexList);
    this.slotView.changeSymbolsIndex(this.newSymbolIndexList);
  }

  resetAllSymbolGroup() {
    this.slotView.resetAllSymbolGroup();
  }
}
