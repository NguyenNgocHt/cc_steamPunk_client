import { AudioManager } from "./../../../../../../framework/audio/AudioManager";
import { _decorator, AudioClip } from "cc";
import ScreenManager from "../../../../../../framework/ui/ScreenManager";
import { assetManager } from "cc";
import LocalDataManager from "../../../../../../framework/common/LocalDataManager";
import { IAudioModel, IAudioService } from "../../../interfaces/Loading_interfaces";
import { AudioModel } from "../model/AudioModel";
import { AudioType } from "../../../common/define";
const { ccclass, property } = _decorator;

@ccclass("AudioSevice")
export class AudioSevice implements IAudioService {
  private _audios: AudioType = {};
  private _audioModel: IAudioModel = new AudioModel();

  init() {
    this.internalInit();
  }

  private internalInit() {
    const soundDirs = ["res/sounds/bgm/", "res/sounds/sfx/"];
    soundDirs.forEach((soundsPath) => {
      const sounds = ScreenManager.instance.assetBundle.getDirWithPath(soundsPath, AudioClip);
      sounds.forEach((sound) => {
        if (this._audios[`${sound.path}`]) return;

        const nativeUrl = assetManager.utils.getUrlWithUuid(sound.uuid, { isNative: true, nativeExt: ".mp3" });
        this._audios[`${sound.path}`] = nativeUrl;
      });
    });

    this.initAudio(this._audios);
  }

  getAudios(): AudioType {
    return this._audios;
  }

  initAudio(audios: AudioType) {
    AudioManager.instance.init(audios);

    let isMuteMusic = LocalDataManager.getBoolean(AudioManager.ENABLE_MUSIC, false);
    let isMuteSfx = LocalDataManager.getBoolean(AudioManager.ENABLE_SFX, false);

    AudioManager.instance.isMutingMusic = isMuteMusic;
    AudioManager.instance.isMutingEffect = isMuteSfx;
  }
}
