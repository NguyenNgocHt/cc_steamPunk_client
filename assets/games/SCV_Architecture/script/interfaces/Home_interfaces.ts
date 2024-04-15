import { playerInfo, playerInfoPackage } from "../dataModel/PlayerDataType";

export interface IPlayerModel_Home {
  setPlayerInfo(playerInfo: playerInfoPackage);
  getPlayerInfo(): playerInfoPackage;
  registerEvent();
}

export interface IPlayerSevice_home {
  getPlayerID(): number;
}

export interface IPlayerView {
  setUserName(userName: string);
  setCoin(coin: number);
  setAvatarByAvatarID(avatarID: number);
}

export interface IHomeSevice {
  getPlayerInfoByPlayerID(playerID: number): playerInfoPackage;
}
