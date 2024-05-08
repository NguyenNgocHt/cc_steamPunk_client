import { _decorator, Component, Node } from "cc";
import { playerInfo } from "../../../../dataModel/PlayerDataType";
import { PlayerInfoView } from "../view/PlayerInfoView";
import { IPlayerInfoService } from "../../../../interfaces/gamePlay/GamePlayInterfaces";
import { PlayerInfoService } from "../../mainController/service/PlayerInfoService";
const { ccclass, property } = _decorator;

@ccclass("PlayerInfoController")
export class PlayerInfoController extends Component {
  @property(PlayerInfoView)
  playerInfoView: PlayerInfoView = null;

  _playerInfoService: IPlayerInfoService = null;
  protected onLoad(): void {
    this.initPlayerInfo();
  }

  initPlayerInfo() {
    this._playerInfoService = new PlayerInfoService();
  }

  setPlayerInfo(data: playerInfo) {
    this.playerInfoView.setPlayerInfo(data);
  }

  minusMoneyBet(betValue: number) {
    let oldMoney = this._playerInfoService.getCurrentMoney();

    let currentMoney = parseFloat((oldMoney - betValue).toFixed(7));

    this.playerInfoView.showMinusMoneyBet(currentMoney);

    this._playerInfoService.updateCurrentMoney(currentMoney);
  }
  updateMoneyEndRound(money: number) {
    this.playerInfoView.showCurrentMoney(money);

    this._playerInfoService.updateCurrentMoney(money);
  }

  getBonusGroupDestinationNode(): Node {
    return this.playerInfoView.getBonusGroupDesitinationNode();
  }
}
