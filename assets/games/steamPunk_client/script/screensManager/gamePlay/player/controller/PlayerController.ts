import { _decorator, Component, Node } from "cc";
import { PlayerInfoController } from "./PlayerInfoController";
import { TrendHistoryController } from "./TrendHistoryController";
import { IPlayerController, IPlayerInfoController, ITrendHidtoryController } from "../../../../interfaces/gamePlay/player_interfaces";
import { playerInfo } from "../../../../dataModel/PlayerDataType";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component implements IPlayerController {
  @property(PlayerInfoController)
  playerInfoControl: PlayerInfoController = null;
  @property(TrendHistoryController)
  trendHistoryControl: TrendHistoryController = null;

  _playerInfoControl: IPlayerInfoController = null;
  _trendHistoryControl: ITrendHidtoryController = null;
  start() {
    this.init();
  }
  init() {
    this._playerInfoControl = this.playerInfoControl;
    this._trendHistoryControl = this.trendHistoryControl;
  }
  setPlayerInfo(data: playerInfo) {
    console.log(data);
    this._playerInfoControl.setPlayerInfo(data);
  }
}
