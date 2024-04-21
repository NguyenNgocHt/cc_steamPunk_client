import { _decorator, Component, Node } from "cc";
import { PoolController } from "../../../../common/PoolController";
import { SlotController } from "./SlotController";
import { SpinningMachineController } from "./SpinningMachineController";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { BetResultsData } from "../../../../dataModel/BetDataType";

const { ccclass, property } = _decorator;

@ccclass("SlotMachineController")
export class SlotMachineController extends Component {
  @property(PoolController)
  poolControl: PoolController = null;

  @property(SlotController)
  slotControl: SlotController = null;

  @property(SpinningMachineController)
  spinningMachineControl: SpinningMachineController = null;

  onLoad() {
    this.init();
    this.registerEvent();
  }

  init() {
    this.initPoolSymbols();
  }

  initPoolSymbols() {
    this.poolControl.init();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.LIST_SYMBOL_INDEX, this.getListSymbolIndex.bind(this));
  }

  offEvent() {
    EventBus.off(GAME_EVENT.LIST_SYMBOL_INDEX, this.getListSymbolIndex.bind(this));
  }

  start() {
    this.initSlotGroup();
  }

  getListSymbolIndex(listSymbolIndex: number[][]) {}

  initSlotGroup() {
    this.slotControl.initSymbolGroup(this.poolControl);
  }

  setBetResultData(result: BetResultsData) {
    console.log(result);
    this.slotControl.getBetResult(result);
    this.spinningMachineControl.showPositionSymbols();
  }
}
