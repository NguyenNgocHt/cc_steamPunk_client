export interface ILandingView {
  moveCutrainToLeft(): void;
  moveCutranToRight(): void;
  moveCutranToUp(): void;
  moveAllCutrain(): void;
  setMoveCompleteCallback(callback: () => void);
}
export interface ILandingController {
  onStart();
}
