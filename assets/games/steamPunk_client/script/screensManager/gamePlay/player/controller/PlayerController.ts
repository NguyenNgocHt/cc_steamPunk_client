import { _decorator, Component, Node } from "cc";
import { PlayerInfoController } from "./PlayerInfoController";
import { TrendHistoryController } from "./TrendHistoryController";
import { playerInfo } from "../../../../dataModel/PlayerDataType";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  @property(PlayerInfoController)
  playerInfoControl: PlayerInfoController = null;

  @property(TrendHistoryController)
  trendHistoryControl: TrendHistoryController = null;

  setPlayerInfo(data: playerInfo) {
    this.playerInfoControl.setPlayerInfo(data);
  }

  minusMoneyBet(betValue: number) {
    this.playerInfoControl.minusMoneyBet(betValue);
  }

  getBonusGroupDestinationNode(): Node {
    return this.playerInfoControl.getBonusGroupDestinationNode();
  }

  updateMoneyEndRound(money: number) {
    this.playerInfoControl.updateMoneyEndRound(money);
  }

  checkIconValue(value: number) {
    this.trendHistoryControl.checkIconValue(value);
  }
}
