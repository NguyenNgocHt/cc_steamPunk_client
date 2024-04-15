import { _decorator, Component, Prefab } from "cc";
import { ILoadingController, IAssetsSevice_loading, IAudioSevice_loading, ILoadingView_loading } from "../../../interfaces/Loading_interfaces";
import { AudioSevice } from "../sevice/AudioSevice";
import { AssetsSevice } from "../sevice/AssetsSevice";
import { LoadingView } from "../view/LoadingView";
import { Config } from "../../../common/Config";
import ScreenManager from "../../../../../../framework/ui/ScreenManager";
import BaseScreen from "../../../../../../framework/ui/BaseScreen";
import { PATH } from "../../../common/define";
const { ccclass, property } = _decorator;

@ccclass("LoadingControler")
export class LoadingControler extends Component implements ILoadingController {
  @property(LoadingView)
  LoadingView: LoadingView = null;
  _audioSevice: IAudioSevice_loading = null;
  _assetsSevice: IAssetsSevice_loading = null;
  _loadingView: ILoadingView_loading = null;
  progressCurrent: number = 0;
  onLoad() {
    this.init(this.LoadingView);
  }

  start() {
    this.loadingStart();
    this.setVersion(Config.versionGame);
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

  setVersion(versionGame: string) {
    this._loadingView.setVersion(versionGame);
  }

  startLoadingView() {
    this._loadingView.startView();
  }

  screenChange() {
    let play_screen = ScreenManager.instance.assetBundle.get(PATH.LOGIN_SCREEN, Prefab)!;
    ScreenManager.instance.pushScreen(play_screen, (screen: BaseScreen) => {}, true);
  }
}
