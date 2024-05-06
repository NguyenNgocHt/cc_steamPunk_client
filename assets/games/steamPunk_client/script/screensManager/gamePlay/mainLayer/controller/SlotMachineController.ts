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
  @property(SlotController)
  slotControl: SlotController = null;

  @property(SpinningMachineController)
  spinningMachineControl: SpinningMachineController = null;

  onLoad() {
    this.registerEvent();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.SEND_POOL_MODEL, this.initSlotGroup.bind(this));
    EventBus.on(GAME_EVENT.ON_CLICK_TUBO_BUTTON, this.setPlayTubo.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.SEND_POOL_MODEL, this.initSlotGroup.bind(this));
    EventBus.on(GAME_EVENT.ON_CLICK_TUBO_BUTTON, this.setPlayTubo.bind(this));
  }

  initSlotGroup(poolControl) {
    console.log("init slot group");
    this.slotControl.initSymbolGroup(poolControl);
  }

  setBetResultData(result: BetResultsData) {
    this.slotControl.getBetResult(result);
    this.spinningMachineControl.showPositionSymbols();
  }

  setPlayTubo(valueIndex: number) {
    if (valueIndex == 0) {
      this.spinningMachineControl.setTimeScale(1);
    } else if (valueIndex == 1) {
      this.spinningMachineControl.setTimeScale(2);
    }
  }
}
