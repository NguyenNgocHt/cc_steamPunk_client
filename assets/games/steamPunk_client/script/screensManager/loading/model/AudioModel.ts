import { _decorator, Component, Node } from "cc";
import { IAudioModel } from "../../../interfaces/Loading_interfaces";
const { ccclass, property } = _decorator;

@ccclass("AudioModel")
export class AudioModel implements IAudioModel {
  private soundDirs = ["res/sounds/bgm/", "res/sounds/sfx/"];

  getSoundDirsData(): string[] {
    return this.soundDirs;
  }

  setSoundDirsData(soundPath: string) {
    this.soundDirs.push(soundPath);
  }
}
