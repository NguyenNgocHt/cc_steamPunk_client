import { _decorator } from "cc";
import { IImageModel} from "../../../interfaces/Loading_interfaces";
const { ccclass, property } = _decorator;

@ccclass("ImageModel")
export class ImageModel implements IImageModel {
  private _imageDirs = [];

  getImagesDirsData(): string[] {
    return this._imageDirs;
  }

  setImagesDirsData(imagePath: string) {
    this._imageDirs.push(imagePath);
  }
}
