import { PoolController } from "../../common/PoolController";
export interface IMainLayerControl {
  moveMetalgateToUp();
  startGameEffect();
}

export interface IGameLayerControl {
  metalgateToUp();
}

export interface IEffectLayerControl {
  initEffectStartGame();
  onAllEffect();
}

export interface IGameLayerView {
  metalgateToUp();
}

export interface IPlayScreenView {
  betGroupToUp();
}

export interface ILampView {
  onLamp();
  offLamp();
}

export interface IGearView {
  onSpinAnimGear();
  offSpinAnimGear();
  offLbWinStatus();
  onLbWinStatus();
  onLightStart();
  offLightStart();
}

export interface IEffectLayerView {
  initStartGame();
  openingEnding();
  showLineSelectView(totalLines: number);
}

export interface ILineSelectView {
  showLineSelect(TotalLines: number);
  offAllLines();
}

export interface ILightView {
  turnsOnLightContinuously();
  onLight(buldIndex: number, timeDelay: number);
}

export interface ISlotService {
  generateRandomSymbolList(): number[][];
  changeNewSymbolIndexList(oldSymbolIndexList: number[][], newList: number[][]): number[][];
}

export interface ISlotController {
  initSymbolGroup(poolControl: PoolController);
}
export interface ISlotView {
  initSlotGroup(symbolIndexList: number[][], poolControl: PoolController);
}
