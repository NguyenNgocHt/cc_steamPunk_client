import { _decorator, Component, Node } from "cc";
import { IAudioModel_loading } from "../../../interfaces/Loading_interfaces";
const { ccclass, property } = _decorator;

@ccclass("AudioModel")
export class AudioModel implements IAudioModel_loading {
  private soundDirs = ["res/sounds/bgm/", "res/sounds/sfx/"];

  getSoundDirsData(): string[] {
    return this.soundDirs;
  }

  setSoundDirsData(soundPath: string) {
    this.soundDirs.push(soundPath);
  }
}
