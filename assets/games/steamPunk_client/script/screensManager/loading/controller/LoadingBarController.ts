import { _decorator, Component, Prefab } from "cc";
import { ILoadingController, IAssetsService, IAudioService, ILoadingView, ILanguegeService } from "../../../interfaces/Loading_interfaces";
import { AudioSevice } from "../sevice/AudioSevice";
import { AssetsSevice } from "../sevice/AssetsSevice";
import { LoadingBarView } from "../view/LoadingBarView";
import ScreenManager from "../../../../../../framework/ui/ScreenManager";
import BaseScreen from "../../../../../../framework/ui/BaseScreen";
import { PATH } from "../../../common/define";
import { languageService } from "../sevice/languageService";
import { StorageUtil } from "../../../../../../framework/utils/StorageUtil";
import { BStorageKey } from "../../../common/Enum";
import { EventBus } from "../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../network/networkDefine";
const { ccclass, property } = _decorator;

@ccclass("LoadingBarControler")
export class LoadingBarControler extends Component {
  @property(LoadingBarView)
  LoadingBarView: LoadingBarView = null;

  _audioSevice: IAudioService = null;
  _assetsSevice: IAssetsService = null;
  _languageService: ILanguegeService = null;

  progressCurrent: number = 0;
  onLoad() {
    this.init();
  }

  start() {
    this.registerEvent();
    this.loadingStart();
  }

  init() {
    this.init_isMe();
    this.init_audioSevice();
    this.init_assetsSevice();
  }

  init_isMe() {
    this._audioSevice = new AudioSevice();
    this._assetsSevice = new AssetsSevice();
    this._languageService = new languageService();
  }

  init_audioSevice() {
    this._audioSevice.init();
  }

  init_assetsSevice() {
    this._assetsSevice.init();
  }

  //controler audio sevice

  registerEvent() {
    EventBus.on(GAME_EVENT.PROGRESS_BAR_POINT, this.updateLoadingView_progressBar.bind(this));

    EventBus.on(GAME_EVENT.FINISH_LOADING, this.checkResultLoadingAssets.bind(this));

    EventBus.on(GAME_EVENT.GET_AUDIOS, this.getAudiosFromAudioSevice.bind(this));
    EventBus.on(GAME_EVENT.INIT_AUDIOS, this.initAudios.bind(this));

    EventBus.on(GAME_EVENT.RESOURCE_LOADING_ERR, this.showPopupMessage.bind(this));

    EventBus.on(GAME_EVENT.START_LOADING_ASSETS, this.startLoadingAsset.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.PROGRESS_BAR_POINT, this.updateLoadingView_progressBar.bind(this));
    EventBus.off(GAME_EVENT.FINISH_LOADING, this.checkResultLoadingAssets.bind(this));
    EventBus.off(GAME_EVENT.GET_AUDIOS, this.getAudiosFromAudioSevice.bind(this));
    EventBus.off(GAME_EVENT.INIT_AUDIOS, this.initAudios.bind(this));
    EventBus.off(GAME_EVENT.RESOURCE_LOADING_ERR, this.showPopupMessage.bind(this));
  }

  loadingStart() {
    this._languageService.loadingLanguage(() => {
      this.startLoadingView();
    });
  }

  initAudios() {
    let audios = this._audioSevice.getAudios();
    this._audioSevice.initAudio(audios);
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
    this.LoadingBarView.updateProgressBar(updatePoint);
  }

  showPopupMessage(message: string) {
    this.LoadingBarView.showMessenger(message);
  }

  startLoadingView() {
    this.LoadingBarView.startView();
  }

  checkResultLoadingAssets() {
    let resultLoadingLanguage = this._languageService.getResultLoadLanguage();
    let languageData = StorageUtil.instance.read(BStorageKey.LANGUAGE_DATA);
    if (resultLoadingLanguage && languageData) {
      this, this.screenChange();
    }
  }
  screenChange() {
    let play_screen = ScreenManager.instance.assetBundle.get(PATH.PLAY_SCREEN, Prefab);
    ScreenManager.instance.pushScreen(play_screen, (screen: BaseScreen) => {}, true);
  }
}
