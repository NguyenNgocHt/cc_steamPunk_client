import { _decorator, Component, sys, Label } from "cc";
import { ILoadingController, ILoadingView } from "../../../interfaces/Loading_interfaces";
import { ProgressBar } from "cc";
import ScreenManager from "../../../../../../framework/ui/ScreenManager";
import { PATH } from "../../../common/define";
import BasePopup from "../../../../../../framework/ui/BasePopup";
import { PopupNotify } from "../../../popups/PopupNotify";
import { Path } from "../../../common/Path";
import { LanguageManager } from "../../../../../../framework/languge/LanguageManager";
import { EventBus } from "../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("LoadingBarView")
export class LoadingBarView extends Component implements ILoadingView {
  @property(ProgressBar)
  loadingProgress: ProgressBar = null!;

  @property(Label)
  LbLoading: Label = null;

  @property(Label)
  LbCache: Label = null;

  protected _strLoad: string[] = [".", "..", "..."];
  protected _indexStr: number = 0;
  private _timeAnim: number = 0;

  startView() {
    this.loadingProgress.progress = 0;
    this.updateProgressBar(0);
    ScreenManager.instance.assetBundle.load(Path.POPUP_NOTIFY, (err, data) => {
      if (!err) {
        EventBus.dispatchEvent(GAME_EVENT.START_LOADING_ASSETS);
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
    this.showProgressPercentage(updatePoint);
  }
  showProgressPercentage(updatePoint: number) {
    this.LbLoading.node.active = true;
    let p = Math.round(updatePoint * 100);
    let textLoading = LanguageManager.getText("loading");
    if (!textLoading || textLoading.length <= 0) {
      textLoading = "Loading Resources";
    }
    let textLoading1 = `${textLoading} [${p}%]${this._strLoad[this._indexStr]}`;
    this.LbLoading.string = textLoading1;
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

            EventBus.dispatchEvent(GAME_EVENT.START_LOADING_ASSETS);
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

  protected update(deltaTime: number) {
    if (Date.now() - this._timeAnim > 500) {
      this._indexStr++;
      this._indexStr = this._indexStr % 3;
      this._timeAnim = Date.now();
    }
  }
}
