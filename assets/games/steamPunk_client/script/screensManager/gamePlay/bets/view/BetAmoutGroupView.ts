import { _decorator, Component, Node } from "cc";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import { SettingsData } from "../../../../dataModel/GameInfoDataType";
import { EditBox } from "cc";
const { ccclass, property } = _decorator;

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

  initDefaultValue() {
    this.defaultLineValue = this._listDenominations[0];
    this.currentBetLineValue = this.defaultLineValue;
    this.lbLineValue.string = this.defaultLineValue.toString();
    this._listDenominationLenght = this._listDenominations.length;
  }

  setGameInfoData(denominations: number[], settings: SettingsData) {
    this._listDenominations = denominations;
    this._listSettings = settings;
    this.initDefaultValue();
  }

  onClickAddLineValue() {
    this.onChangeBetValue(function computeNewLineValue(
      defaultListDenominationsIndex,
      listDenominationLenght,
      listDenominanyationsIndexMax,
      listDenominationsIndexMin
    ) {
      defaultListDenominationsIndex += 1;

      defaultListDenominationsIndex =
        defaultListDenominationsIndex >= listDenominationLenght - 1 ? listDenominationLenght - 1 : defaultListDenominationsIndex;
      return defaultListDenominationsIndex;
    });
  }

  onClickSubLineValue() {
    this.onChangeBetValue(function computeNewLineValue(
      defaultListDenominationsIndex,
      listDenominationLenght,
      listDenominationsIndexMax,
      listDenominationsIndexMin
    ) {
      defaultListDenominationsIndex -= 1;

      defaultListDenominationsIndex = defaultListDenominationsIndex <= 0 ? 0 : defaultListDenominationsIndex;
      return defaultListDenominationsIndex;
    });
  }

  onClickMinLineValue() {
    this.onChangeBetValue(function computeNewLineValue(
      defaultListDenominationsIndex,
      listDenominationLenght,
      listDenominationsIndexMax,
      listDenominationsIndexMin
    ) {
      return listDenominationsIndexMin;
    });
  }

  oncClickMaxLineValue() {
    this.onChangeBetValue(function computeNewLineValue(
      defaultListDenominationsIndex,
      listDenominationLenght,
      listDenominationsIndexMax,
      listDenominationsIndexMin
    ) {
      return listDenominationsIndexMax;
    });
  }

  onChangeBetValue(computeNewLineValue: (...args: any[]) => number) {
    this.defaultListDenominationsIndex = computeNewLineValue(
      this.defaultListDenominationsIndex,
      this._listDenominationLenght,
      this._listDenominationsIndexMax,
      this._listDenominationsIndexMin
    );

    this.currentBetLineValue = this._listDenominations[this.defaultListDenominationsIndex];

    this.lbLineValue.string = this.currentBetLineValue.toString();
    EventBus.dispatchEvent(GAME_EVENT.CURRENT_BET_VALUE, this.currentBetLineValue);
  }
  getCurrentBetLineValue(): number {
    return this.currentBetLineValue;
  }
}
