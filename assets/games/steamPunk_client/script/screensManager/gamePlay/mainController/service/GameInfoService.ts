import { _decorator, Component, Node, sys } from "cc";
import { GameInfoData, PendingData, SettingsData } from "../../../../dataModel/GameInfoDataType";
import { LOCAL_STORAGE_KEY_WORD } from "../../../../common/Path";
import { IGameInfoService } from "../../../../interfaces/Common_interfaces";
const { ccclass, property } = _decorator;

@ccclass("GameInfoService")
export class GameInfoService implements IGameInfoService {
  init() {}

  getGameInfo(): GameInfoData {
    return JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.GAME_INFO));
  }

  getListDenominations(): number[] {
    return this.getlistSettings() ? this.getlistSettings().Denominations : [];
  }

  getListPending(): PendingData {
    return this.getGameInfo() ? this.getGameInfo().pending : null;
  }
  getlistSettings(): SettingsData {
    return this.getGameInfo() ? this.getGameInfo().settings : null;
  }
}
