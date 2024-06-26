import { _decorator, Component, CCString, assetManager, log, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("StartScene")
export class StartScene extends Component {
  @property(CCString)
  bundleGameName: string = "";

  @property(CCString)
  sceneName: string = "";

  onLoad() {
    console.log("onLoad", this.bundleGameName);
    assetManager.loadBundle(this.bundleGameName, (err, bundle) => {
      if (err) {
        console.log("@@@ loadBundle error: " + this.bundleGameName);
      } else if (!bundle) {
        console.log("@@@ No bundle returned for: " + this.bundleGameName);
      } else {
        bundle.loadScene(this.sceneName, (err, scene) => {
          if (err) {
            console.log("@@@ loadScene error: " + this.sceneName);
          } else {
            director.runScene(scene);
          }
        });
      }
    });
  }
}
