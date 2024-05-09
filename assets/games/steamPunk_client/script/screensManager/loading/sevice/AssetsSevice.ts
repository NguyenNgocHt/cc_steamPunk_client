import { ILoadingController, IAudioModel, IPrefabModel } from "../../../interfaces/Loading_interfaces";
import { _decorator, sys, Asset, AudioClip } from "cc";
import { IAssetsService, IImageModel } from "../../../interfaces/Loading_interfaces";
import ScreenManager from "../../../../../../framework/ui/ScreenManager";
import { MESENGER } from "../../../common/define";
import { ImageModel } from "../model/ImageModel";
import { PrefabModel } from "../model/PrefabModel";
import { AudioModel } from "../model/AudioModel";
import { EventBus } from "../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../network/networkDefine";
const { ccclass, property } = _decorator;

type OnUpdateProgressFunc = (newProgress: number) => void;

@ccclass("assetsSevice")
export class AssetsSevice implements IAssetsService {
  private _imagesModel: IImageModel = null;
  private _prefabModel: IPrefabModel = null;
  private _audioModel: IAudioModel = null;

  private _audios: { [key: string]: string } = {};
  private _items: string[] = [];

  progressBar_current: number = 0;

  _onUpdateProgressFunc: OnUpdateProgressFunc = null;

  init() {
    this._imagesModel = new ImageModel();
    this._prefabModel = new PrefabModel();
    this._audioModel = new AudioModel();
  }

  loadingAssets() {
    this._items = this.getAcssets();

    let percent = 1.0 / (this._items.length + 1);
    console.log("items", this._items);

    this._loadAsset(0, percent);
  }

  getAcssets(): string[] {
    let audioDirs = this._audioModel.getSoundDirsData();
    let prefabDirs = this._prefabModel.getPrefabDirds();
    let prefabPaths = this._prefabModel.getPrefabsPath();
    let imagesDirs = this._imagesModel.getImagesDirsData();

    return audioDirs.concat(imagesDirs).concat(audioDirs).concat(prefabDirs).concat(prefabPaths);
  }

  private _loadAsset(index: number, totalPercent: number) {
    if (index >= this._items.length) {
      EventBus.dispatchEvent(GAME_EVENT.PROGRESS_BAR_POINT, 1.0);
      EventBus.dispatchEvent(GAME_EVENT.FINISH_LOADING);

      return;
    }

    let path = this._items[index];

    if (this._isDirectory(path)) {
      ScreenManager.instance.assetBundle.loadDir(
        path,
        (finished, total) => {
          let progress = index * totalPercent + (finished / total) * totalPercent;
          if (progress > this.progressBar_current) {
            this.progressBar_current = progress;
            EventBus.dispatchEvent(GAME_EVENT.PROGRESS_BAR_POINT, progress);
            this._onUpdateProgressFunc && this._onUpdateProgressFunc(progress);
          }
        },
        (err, data) => {
          if (sys.isNative && (path.endsWith("/bgm/") || path.endsWith("/sfx/"))) {
            EventBus.dispatchEvent(GAME_EVENT.GET_AUDIOS);

            console.log(`AudioClip loaded:${JSON.stringify(this._audios)}`);
            let assets: Asset[] = data;
            for (let as of assets) {
              if (as instanceof AudioClip) {
                this._audios[`${path}${as.name}`] = `${as._nativeAsset.url}`;
              }
            }

            EventBus.dispatchEvent(GAME_EVENT.INIT_AUDIOS);
          }

          if (!err) {
            this._loadAsset(index + 1, totalPercent);
          } else {
            console.log("load error  " + err + "    " + path);
            if (sys.isBrowser) {
              EventBus.dispatchEvent(GAME_EVENT.RESOURCE_LOADING_ERR, MESENGER.RESOURCE_LOADING_ERR);
            }
          }
        }
      );
    } else {
      ScreenManager.instance.assetBundle.load(
        path,
        (finished, total) => {
          let progress = index * totalPercent + (finished / total) * totalPercent;

          EventBus.dispatchEvent(GAME_EVENT.PROGRESS_BAR_POINT, progress);
        },
        (err, data) => {
          if (!err) {
            this._loadAsset(index + 1, totalPercent);
          } else {
            console.log("load error  " + err + "    " + path);
            if (sys.isBrowser) {
              EventBus.dispatchEvent(GAME_EVENT.RESOURCE_LOADING_ERR, MESENGER.RESOURCE_LOADING_ERR);
            }
          }
        }
      );
    }
  }

  private _isDirectory(path: string | null): boolean {
    return path != null && typeof path == "string" && path.length > 0 && path[path.length - 1] == "/";
  }

  setProgressBarCurrent(progressCurrent: number) {
    this.progressBar_current = progressCurrent;
  }

  setAudiosData(audios: { [key: string]: string }) {
    this._audios = audios;
  }
}
