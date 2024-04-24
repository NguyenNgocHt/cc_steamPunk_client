import { _decorator, Component, Prefab, tween } from "cc";
import { ILoadingController, IAssetsSevice_loading, IAudioSevice_loading, ILoadingView_loading, ILanguegeService } from "../../../interfaces/Loading_interfaces";
import { AudioSevice } from "../sevice/AudioSevice";
import { AssetsSevice } from "../sevice/AssetsSevice";
import { LoadingBarView } from "../view/LoadingBarView";
import ScreenManager from "../../../../../../framework/ui/ScreenManager";
import BaseScreen from "../../../../../../framework/ui/BaseScreen";
import { PATH } from "../../../common/define";
import { languageService } from "../sevice/languageService";
import { StorageUtil } from "../../../../../../framework/utils/StorageUtil";
import { BStorageKey } from "../../../common/Enum";
const { ccclass, property } = _decorator;

@ccclass("LoadingBarControler")
export class LoadingBarControler extends Component implements ILoadingController {
  @property(LoadingBarView)
  LoadingBarView: LoadingBarView = null;
  _audioSevice: IAudioSevice_loading = null;
  _assetsSevice: IAssetsSevice_loading = null;
  _languageService: ILanguegeService = null;
  _loadingView: ILoadingView_loading = null;
  progressCurrent: number = 0;
  onLoad() {
    this.init(this.LoadingBarView);
  }

  start() {
    this.loadingStart();
  }
  init(iloadingView: ILoadingView_loading) {
    this.init_isMe(iloadingView);
    this.init_audioSevice();
    this.init_assetsSevice();
    this.init_loadingView();
  }
  init_isMe(iLoadingView: ILoadingView_loading) {
    this._audioSevice = new AudioSevice();
    this._assetsSevice = new AssetsSevice();
    this._languageService = new languageService();
    this._loadingView = iLoadingView;
  }

  init_audioSevice() {
    this._audioSevice.init();
  }

  init_assetsSevice() {
    this._assetsSevice.init(this);
  }

  init_loadingView() {
    this._loadingView.init(this);
  }
  //controler audio sevice
  loadingStart() {
    this._audioSevice.loadingAudio();
    this._languageService.loadingLanguage();
    this.startLoadingView();
  }

  initAudios() {
    this._audioSevice.initAudio();
  }

  //controler assets sevice
  startLoadingAsset() {
    this._assetsSevice.loadingAssets();
  }

  getAudiosFromAudioSevice() {
    let audios = this._audioSevice.getAudios();
    this._assetsSevice.setAudiosData(audios);
  }

  //controler loading view
  updateLoadingView_progressBar(updatePoint: number) {
    this._loadingView.updateProgressBar(updatePoint);
  }

  showPopupMessage(message: string) {
    this._loadingView.showMessenger(message);
  }

  startLoadingView() {
    this._loadingView.startView();
  }
  checkResultLoadingAssets() {
    let resultLoadingLanguage = this._languageService.getResultLoadLanguage();
    let languageData = StorageUtil.instance.read(BStorageKey.LANGUAGE_DATA);
    if (resultLoadingLanguage && languageData) {
      console.log("next landing view");
      console.log("languageData", JSON.parse(languageData));
      this,
        setTimeout(() => {
          this.screenChange();
        }, 1000);
    }
  }
  screenChange() {
    let play_screen = ScreenManager.instance.assetBundle.get(PATH.PLAY_SCREEN, Prefab)!;
    ScreenManager.instance.pushScreen(play_screen, (screen: BaseScreen) => {}, true);
  }
}
