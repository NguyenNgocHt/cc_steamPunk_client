import { _decorator, Component, Node } from "cc";
import { LandingView } from "../view/LandingView";

const { ccclass, property } = _decorator;

@ccclass("landingController")
export class landingController extends Component {
  @property(LandingView)
  LandingView: LandingView = null;

  start() {
    this.registerCallBack();
  }

  registerCallBack() {
    this.LandingView.setMoveCompleteCallback(() => {
      this.onStart();
    });
  }

  onStart() {
    this.LandingView.moveAllCutrain();
  }
}
