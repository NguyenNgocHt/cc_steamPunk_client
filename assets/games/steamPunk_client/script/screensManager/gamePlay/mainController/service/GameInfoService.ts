import { _decorator, Component, Node, sys } from "cc";
import { GameInfoData, PendingData, SettingsData } from "../../../../dataModel/GameInfoDataType";
import { LOCAL_STORAGE_KEY_WORD } from "../../../../common/Path";
import { IGameInfoService } from "../../../../interfaces/Common_interfaces";
const { ccclass, property } = _decorator;

@ccclass("GameInfoService")
export class GameInfoService implements IGameInfoService{
  getGameInfo(): GameInfoData {
    let gameInfo = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.GAME_INFO));
    if (gameInfo) {
      return gameInfo;
    }
  }

  getListDenominations(): number[] {
    let gameInfo: GameInfoData = null;
    gameInfo = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.GAME_INFO));
    if (gameInfo) {
      return gameInfo.denominations;
    }
  }

  getListPending(): PendingData {
    let gameInfo: GameInfoData = null;
    gameInfo = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.GAME_INFO));
    if (gameInfo) {
      return gameInfo.pending;
    }
  }
  getlistSettings(): SettingsData {
    let gameInfo: GameInfoData = null;
    gameInfo = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.GAME_INFO));
    if (gameInfo) {
      return gameInfo.settings;
    }
  }
}
