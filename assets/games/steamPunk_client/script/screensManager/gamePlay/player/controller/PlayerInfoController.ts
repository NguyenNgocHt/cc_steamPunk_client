import { _decorator, Component, Node } from "cc";
import { IPlayerController, IPlayerInfoController, IPlayerInfoView } from "../../../../interfaces/gamePlay/player_interfaces";
import { playerInfo } from "../../../../dataModel/PlayerDataType";
import { PlayerInfoView } from "../view/PlayerInfoView";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfoController")
export class PlayerInfoController extends Component implements IPlayerInfoController {
  @property(PlayerInfoView)
  playerInfoView: PlayerInfoView = null;

  _playerInfoView: IPlayerInfoView = null;
  start() {
    this.init();
  }
  init() {
    this._playerInfoView = this.playerInfoView;
  }
  setPlayerInfo(data: playerInfo) {
    console.log("data in player info controller", data);
    this.playerInfoView.setPlayerInfo(data);
  }
}
