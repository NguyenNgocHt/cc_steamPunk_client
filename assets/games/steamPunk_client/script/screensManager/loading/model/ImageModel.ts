import { _decorator, Component, Node } from "cc";
import { RUNTIME_BASED } from "cc/env";
import { IImageModel_loading } from "../../../interfaces/Loading_interfaces";
const { ccclass, property } = _decorator;

@ccclass("ImageModel")
export class ImageModel implements IImageModel_loading {

  private _imageDirs = ["res/fonts/", "res/images/bgr/", "res/images/texturePacker/avatar/"];

  getImagesDirsData(): string[] {
    return this._imageDirs;
  }

  setImagesDirsData(imagePath: string) {

    this._imageDirs.push(imagePath);
  }
}
