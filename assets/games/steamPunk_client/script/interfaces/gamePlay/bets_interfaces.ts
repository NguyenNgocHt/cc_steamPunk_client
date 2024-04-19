import { SettingsData } from "../../dataModel/GameInfoDataType";
export interface IBtnBetGroupView {
  startGameEffect();
}

export interface IBetController {
  onGameEffect();
}

export interface IBetLineGroupView {
  setCurrentBetLineValue(currentBetLineValue: number);
}

export interface IBetAmoutGroupView {
  getListDenominations(data: number[]);

  getListSettings(data: SettingsData);
}
