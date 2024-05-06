import { _decorator, Component, Node } from "cc";
import { AutoPlayStView } from "./AutoPlayStView";
import { ButtonLayoutView } from "./ButtonLayoutView";
import { SelectLayoutView } from "./SelectLayoutView";
import { EventBus } from "../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../network/networkDefine";
import { UIOpacity } from "cc";
import { tween } from "cc";
import { Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AutoPlayStController")
export class AutoPlayStController extends Component {
  @property(AutoPlayStView)
  autoPlayStView: AutoPlayStView = null;

  @property(ButtonLayoutView)
  buttonLayoutView: ButtonLayoutView = null;

  @property(SelectLayoutView)
  selectLayoutView: SelectLayoutView = null;

  selectedNumber: number = 10;
  onLoad() {
    this.registerEvent();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.ON_CLICK_CLOSE_AUTO_PLAY_POPUP, this.hidePopup.bind(this));

    EventBus.on(GAME_EVENT.SELECTED_NUMBER, this.setSelectedNumber.bind(this));

    EventBus.on(GAME_EVENT.ON_CLICK_CANCEL, this.setCancelPopup.bind(this));

    EventBus.on(GAME_EVENT.ON_CLICK_CONFIRM, this.setConfirm.bind(this));

    EventBus.on(GAME_EVENT.ON_CLICK_STOP, this.setStop.bind(this));

    EventBus.on(GAME_EVENT.END_AUTO_PLAY, this.setEndAutoPlay.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.ON_CLICK_CLOSE_AUTO_PLAY_POPUP, this.hidePopup.bind(this));

    EventBus.off(GAME_EVENT.SELECTED_NUMBER, this.setSelectedNumber.bind(this));

    EventBus.off(GAME_EVENT.ON_CLICK_CANCEL, this.setCancelPopup.bind(this));

    EventBus.off(GAME_EVENT.ON_CLICK_CONFIRM, this.setConfirm.bind(this));

    EventBus.off(GAME_EVENT.ON_CLICK_STOP, this.setStop.bind(this));

    EventBus.off(GAME_EVENT.END_AUTO_PLAY, this.setEndAutoPlay.bind(this));
  }

  start() {
    this.buttonLayoutView.startPopup();
  }

  onNode() {
    this.node.setScale(0, 0, 0);
    this.setOpacityNode(255);
    this.scaleNode(new Vec3(1, 1, 1));
  }

  hidePopup() {
    this.setOpacityNode(0);
    this.scaleNode(new Vec3(0, 0, 0));
  }

  setOpacityNode(opacity: number) {
    tween(this.node.getComponent(UIOpacity)).to(0.2, { opacity: opacity }).start();
  }

  scaleNode(scale: Vec3) {
    tween(this.node).to(0.2, { scale: scale }).start();
  }

  setSelectedNumber(selectedNumber: number) {
    this.selectedNumber = selectedNumber;
  }
  //button controller
  setCancelPopup() {
    this.hidePopup();
  }

  setConfirm() {
    EventBus.dispatchEvent(GAME_EVENT.SEND_SELECTED_NUMBER_TO_GAME_CONTROLLER, this.selectedNumber);
    this.buttonLayoutView.changeToNodeStop();
    this.hidePopup();
  }

  setStop() {
    EventBus.dispatchEvent(GAME_EVENT.ERASE_SELECTED_NUMBER);
    this.hidePopup();
    this.buttonLayoutView.startPopup();
  }

  setEndAutoPlay() {
    this.buttonLayoutView.startPopup();
  }
}
