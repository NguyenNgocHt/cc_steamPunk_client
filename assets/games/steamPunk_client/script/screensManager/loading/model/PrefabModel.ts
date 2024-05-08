import { _decorator, Component, Node } from "cc";
import { IPrefabModel_loading } from "../../../interfaces/Loading_interfaces";
const { ccclass, property } = _decorator;

@ccclass("PrefabModel")
export class PrefabModel implements IPrefabModel_loading {
  _prefabDirs = ["res/anims/prefabs/", "res/prefabs/popup/"];

  _prefabs = ["res/prefabs/screen/play_screen"];

  getPrefabDirds(): string[] {
    return this._prefabDirs;
  }
  getPrefabsPath(): string[] {
    return this._prefabs;
  }
  setPrefabDirs(prefabDir: string) {
    this._prefabDirs.push(prefabDir);
  }
  setPrefabsPath(prefabPath: string) {
    this._prefabs.push(prefabPath);
  }
}
