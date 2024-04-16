import { AudioManager } from "./../../../../../../framework/audio/AudioManager";
import { _decorator, Component, Node, AudioClip } from "cc";
import ScreenManager from "../../../../../../framework/ui/ScreenManager";
import { assetManager } from "cc";
import LocalDataManager from "../../../../../../framework/common/LocalDataManager";
import { IAudioModel_loading, IAudioSevice_loading } from "../../../interfaces/Loading_interfaces";
import { AudioModel } from "../model/AudioModel";
const { ccclass, property } = _decorator;

@ccclass("AudioSevice")
export class AudioSevice implements IAudioSevice_loading {
  private _audios: { [key: string]: string } = {};
  private _audioModel: IAudioModel_loading = null;

  init() {
    this._audioModel = new AudioModel();
  }
  loadingAudio() {
    console.log("loading Audio start");

    this.loadAudioWeb();
  }
  loadAudioWeb() {
    let soundDirs = ["res/sounds/bgm/", "res/sounds/sfx/"];
    soundDirs.forEach((soundsPath) => {
      const sounds = ScreenManager.instance.assetBundle.getDirWithPath(soundsPath, AudioClip);

      sounds.forEach((sound) => {
        if (this._audios[`${sound.path}`]) return;
        const nativeUrl = assetManager.utils.getUrlWithUuid(sound.uuid, { isNative: true, nativeExt: ".mp3" });
        console.log("sound", sound.path, sound.uuid, nativeUrl);
        console.log("sound", assetManager.utils.getUrlWithUuid(sound.uuid, { isNative: false }));
        this._audios[`${sound.path}`] = nativeUrl;
      });
    });

    this.initAudio();
  }
  initAudio() {
    AudioManager.instance.init(this._audios);

    let isMuteMusic = LocalDataManager.getBoolean(AudioManager.ENABLE_MUSIC, false);
    let isMuteSfx = LocalDataManager.getBoolean(AudioManager.ENABLE_SFX, false);

    AudioManager.instance.isMutingMusic = isMuteMusic;
    AudioManager.instance.isMutingEffect = isMuteSfx;
  }
  getAudios(): { [key: string]: string } {
    return this._audios;
  }
}
