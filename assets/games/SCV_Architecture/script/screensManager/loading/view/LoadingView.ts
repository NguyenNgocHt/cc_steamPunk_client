import { _decorator, Component, sys, Label } from "cc";
import { ILoadingController, ILoadingView_loading } from "../../../interfaces/Loading_interfaces";
import { ProgressBar } from "cc";
import ScreenManager from "../../../../../../framework/ui/ScreenManager";
import { PATH } from "../../../common/define";
import BasePopup from "../../../../../../framework/ui/BasePopup";
import { PopupNotify } from "../../../popups/PopupNotify";
import { Path } from "../../../common/Path";
const { ccclass, property } = _decorator;

@ccclass("LoadingView")
export class LoadingView extends Component implements ILoadingView_loading {
  @property(ProgressBar)
  loadingProgress: ProgressBar = null!;

  @property(Label)
  lbVersion: Label = null!;
  private _loadingControler: ILoadingController = null;

  init(loadingController: ILoadingController) {
    this._loadingControler = loadingController;
  }
  startView() {
    this.loadingProgress.progress = 0;
    this.updateProgressBar(0);
    ScreenManager.instance.assetBundle.load(Path.POPUP_NOTIFY, (err, data) => {
      if (!err) {
        this._loadingControler.startLoadingAsset();
      } else {
        console.log("load error  " + err + " _loadAsset");
        if (sys.isBrowser) {
          alert("Không có kết nối, vui lòng thử lại");
        }
      }
    });
  }
  updateProgressBar(updatePoint: number) {
    this.loadingProgress.progress = updatePoint;
  }
  getProgressBar(): number {
    return this.loadingProgress.progress;
  }
  showMessenger(mesenger: string) {
    ScreenManager.instance.showPopupFromPrefabName(
      PATH.POPUP_NOTIFY,
      (popup: BasePopup) => {
        let popupDisplay = popup as PopupNotify;
        popupDisplay.setupPopup(mesenger, [
          () => {
            ScreenManager.instance.hidePopup(true);

            this._loadingControler.startLoadingAsset();
          },
          () => {
            ScreenManager.instance.hidePopup(true);
          },
        ]);
      },
      true,
      true,
      false
    );
  }

  setVersion(version: string) {
    this.lbVersion && (this.lbVersion.string = "v" + version);
  }
  onClick_screenChange() {
    this._loadingControler.screenChange();
  }
}
