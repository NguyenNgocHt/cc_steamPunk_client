import { _decorator, Component, Node } from "cc";
import { LandingView } from "../view/LandingView";

const { ccclass, property } = _decorator;

@ccclass("landingController")
export class landingController extends Component {
  @property(LandingView)
  LandingView: LandingView = null;

  onLoad() {
    this.init();
  }

  init() {
    this.registerEvent();
  }

  start() {
    this.registerCallBack();
  }

  registerCallBack() {
    this.LandingView.setMoveCompleteCallback(() => {
      this.onStart();
    });
  }

  registerEvent() {}

  setLandingViewEnd() {
    console.log("landing view end");
  }

  onStart() {
    this.LandingView.moveAllCutrain();
  }
}
