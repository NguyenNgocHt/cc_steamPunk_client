import { _decorator, Component, Node } from "cc";
import { LandingView } from "../view/LandingView";
import { ILandingController, ILandingView } from "../../../../interfaces/gamePlay/landing_interfacses";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("landingController")
export class landingController extends Component implements ILandingController {
  @property(LandingView)
  LandingView: LandingView = null;
  private _landingView: ILandingView = null;
  onLoad() {
    this.init();
  }

  init() {
    this.initLandingController();
    this.registerEvent();
  }

  initLandingController() {
    this._landingView = this.LandingView;
  }

  start() {
    this.registerCallBack();
  }

  registerCallBack() {
    this._landingView.setMoveCompleteCallback(() => {
      console.log("onCallback");
      this.onStart();
    });
  }

  registerEvent() {
    
  }
  setLandingViewEnd() {
    console.log("landing view end");
  }
  onStart() {
    this._landingView.moveAllCutrain();
  }
}
