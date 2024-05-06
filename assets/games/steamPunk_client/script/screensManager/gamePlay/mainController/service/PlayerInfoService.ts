import { _decorator, sys } from "cc";
import { IPlayerInfoService } from "../../../../interfaces/gamePlay/GamePlayInterfaces";
import { playerInfo } from "../../../../dataModel/PlayerDataType";
import { LOCAL_STORAGE_KEY_WORD } from "../../../../common/Path";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfoService")
export class PlayerInfoService implements IPlayerInfoService {
  handlePlayerInfo(data: playerInfo) {
    let playerInfo: playerInfo = null;

    playerInfo = {
      userName: data.userName,
      money: data.money,
      currency: data.currency,
    };

    sys.localStorage.setItem(LOCAL_STORAGE_KEY_WORD.PLAYER_INFO, JSON.stringify(playerInfo));
  }

  getPlayerInfo(): playerInfo {
    let playerInfo = JSON.parse(sys.localStorage.getItem(LOCAL_STORAGE_KEY_WORD.PLAYER_INFO));
    return playerInfo ? playerInfo : null;
  }

  getPlayerName(): string {
    let playerInfo = this.getPlayerInfo();
    return playerInfo ? playerInfo.userName : null;
  }

  getCurrentMoney(): number {
    let playerInfo = this.getPlayerInfo();
    return playerInfo ? playerInfo.money : 0;
  }

  getCurrency(): string {
    let playerInfo = this.getPlayerInfo();
    return playerInfo ? playerInfo.currency : null;
  }

  updateCurrentMoney(currentMoney: number) {
    let playerInfo = this.getPlayerInfo();

    let newPlayerInfo: playerInfo = null;

    newPlayerInfo = {
      userName: playerInfo.userName,
      money: currentMoney,
      currency: playerInfo.currency,
    };

    this.handlePlayerInfo(newPlayerInfo);
  }
}
