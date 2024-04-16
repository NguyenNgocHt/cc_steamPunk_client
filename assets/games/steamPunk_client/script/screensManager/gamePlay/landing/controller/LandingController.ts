import { _decorator, Component, Node } from "cc";
import { LandingView } from "../view/LandingView";
import { ILandingController, ILandingView } from "../../../../interfaces/gamePlay/landing_interfacses";
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
  onStart() {
    this._landingView.moveAllCutrain();
  }
}
