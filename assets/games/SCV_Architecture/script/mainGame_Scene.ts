import { _decorator, Component, log, assetManager, Prefab } from "cc";
import AsyncTaskMgr from "../../../framework/async-task/AsyncTaskMgr";
import { AudioManager } from "../../../framework/audio/AudioManager";
import ScreenManager from "../../../framework/ui/ScreenManager";
import { Config } from "./common/Config";
import { Path } from "./common/Path";
const { ccclass, property } = _decorator;

@ccclass("mainGame_Scene")
export class mainGame_Scene extends Component {
  onLoad() {
    this.registerEvent();
    log("@ mainGame_Scene: onLoad  !!!");
    let bundle = assetManager.getBundle("bundle_" + Config.GAME_NAME);
    if (bundle) {
      this.node.addComponent(ScreenManager);

      ScreenManager.instance.assetBundle = bundle;
      ScreenManager.instance.setupCommon();

      bundle.load(Path.LOADING_SCREEN, Prefab, (error, prefab) => {
        if (error) {
          log(`bundle.load: ${error}`);
        } else {
          log("load loading sucess");
          ScreenManager.instance.pushScreen(prefab, (screen) => {
            log("pushScreen " + screen.name + " success!");
          });
        }
      });
    }
  }
  registerEvent() {}
  onDestroy() {
    AudioManager.instance.destroy();
    AsyncTaskMgr.instance.stop();
  }
}
