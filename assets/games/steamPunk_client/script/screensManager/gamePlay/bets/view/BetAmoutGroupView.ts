import { _decorator, Component, Node } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { SettingsData } from "../../../../dataModel/GameInfoDataType";
import { EditBox } from "cc";
const { ccclass, property } = _decorator;

type computeNewLineValueProps = {
  currentDenominationIndex: number;
  denominationListLength: number;
  denominationMaxIndex: number;
  denominationMinIndex: number;
};

@ccclass("BetAmoutGroupView")
export class BetAmoutGroupView extends Component {
  @property(EditBox)
  lbLineValue: EditBox = null;

  defaultLineValue: number = 0;
  defaultListDenominationsIndex: number = 0;
  _listDenominations: number[] = [];
  _listSettings: SettingsData = null;
  currentBetLineValue: number = 0;
  _listDenominationLenght: number = 0;
  _listDenominationsIndexMax: number = 14;
  _listDenominationsIndexMin: number = 0;

  start() {
    this.scheduleOnce(function () {
      this.callGetGameInfo();
      this.initDefaultValue();
    }, 1);
  }
  callGetGameInfo() {
    EventBus.dispatchEvent(GAME_EVENT.GET_GAME_INFO);
  }

  initDefaultValue() {
    this.defaultLineValue = this._listDenominations[0];
    this.currentBetLineValue = this.defaultLineValue;
    this.lbLineValue.string = this.defaultLineValue.toString();
    this._listDenominationLenght = this._listDenominations.length;
  }

  updateListDenominations(data: number[]) {
    this._listDenominations = data;
  }

  updateListSettings(data: SettingsData) {
    this._listSettings = data;
  }

  onClickAddLine() {
    this.onChangeBetAmount(function computeNewLineValue({
      currentDenominationIndex,
      denominationListLength,
    }) {
      let newDenominationIndex = currentDenominationIndex + 1;

      newDenominationIndex =
        newDenominationIndex >= denominationListLength - 1
          ? denominationListLength - 1
          : newDenominationIndex;
      return newDenominationIndex;
    });
  }
  onClickSubLine() {
    this.onChangeBetAmount(function computeNewLineValue({
      currentDenominationIndex,
    }) {
      let newDenominationIndex = currentDenominationIndex - 1;

      newDenominationIndex =
        newDenominationIndex <= 0 ? 0 : newDenominationIndex;
      return newDenominationIndex;
    });
  }
  onClickMinLine() {
    this.onChangeBetAmount(function computeNewLineValue(denominationMinIndex) {
      return denominationMinIndex;
    });
  }
  oncClickMaxLine() {
    this.onChangeBetAmount(function computeNewLineValue({
      denominationMaxIndex,
    }) {
      return denominationMaxIndex;
    });
  }

  onChangeBetAmount(computeNewLineValue: (computeNewLineValueProps) => number) {
    this.defaultListDenominationsIndex = computeNewLineValue({
      currentDenominationIndex: this.defaultListDenominationsIndex,
      denominationListLength: this._listDenominationLenght,
      denominationMaxIndex: this._listDenominationsIndexMax,
      denominationMinIndex: this._listDenominationsIndexMin,
    });

    this.currentBetLineValue =
      this._listDenominations[this.defaultListDenominationsIndex];

    this.lbLineValue.string = this.currentBetLineValue.toString();
    EventBus.dispatchEvent(
      GAME_EVENT.CURRENT_BET_AMOUNT,
      this.currentBetLineValue
    );
  }
  getCurrentBetLineValue(): number {
    return this.currentBetLineValue;
  }
}
