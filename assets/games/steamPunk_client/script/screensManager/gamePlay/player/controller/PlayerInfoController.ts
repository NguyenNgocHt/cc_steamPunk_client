import { _decorator, Component, Node } from "cc";
import { playerInfo } from "../../../../dataModel/PlayerDataType";
import { PlayerInfoView } from "../view/PlayerInfoView";
import { PlayerInfo } from "../../../../common/PlayerInfo";
import { IPLayerInfo } from "../../../../interfaces/Common_interfaces";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfoController")
export class PlayerInfoController extends Component {
  @property(PlayerInfoView)
  playerInfoView: PlayerInfoView = null;

  _playerInfo: IPLayerInfo = null;
  protected onLoad(): void {
    this.initPlayerInfo();
  }

  initPlayerInfo() {
    this._playerInfo = new PlayerInfo();
  }

  setPlayerInfo(data: playerInfo) {
    this.playerInfoView.setPlayerInfo(data);
  }

  minusMoneyBet(betValue: number) {
    console.log("betValua", betValue);
    let oldMoney = this._playerInfo.getCurrentMoney();
    console.log("oldMoney", oldMoney);
    let currentMoney = parseFloat((oldMoney - betValue).toFixed(7));
    console.log("currentMoney", currentMoney);
    this.playerInfoView.showMinusMoneyBet(currentMoney);
    this._playerInfo.updateCurrentMoney(currentMoney);
  }
  updateMoneyEndRound(money: number) {
    this.playerInfoView.showCurrentMoney(money);
    this._playerInfo.updateCurrentMoney(money);
  }

  getBonusGroupDestinationNode(): Node {
    return this.playerInfoView.getBonusGroupDesitinationNode();
  }

}
