import { AudioType } from "../common/define";

export interface IAudioModel {
  getSoundDirsData(): string[];

  setSoundDirsData(soundPath: string): void;
}

export interface IAudioService {
  init(): void;

  initAudio(audios: AudioType);

  getAudios(): AudioType;
}

export interface IAssetsService {
  init();

  loadingAssets(): void;

  setProgressBarCurrent(progressCurrent: number): void;

  setAudiosData(audios: { [key: string]: string });
}

export interface ILoadingView {
  startView(): void;

  updateProgressBar(updatePoint: number): void;

  getProgressBar(): number;

  showMessenger(mesenger: string): void;
}

export interface IImageModel {
  getImagesDirsData(): string[];

  setImagesDirsData(imagePath: string): void;
}

export interface IPrefabModel {
  getPrefabDirds(): string[];
  setPrefabDirs(prefabDir: string): void;

  getPrefabsPath(): string[];
  setPrefabsPath(prefabPath: string): void;
}

export interface ILoadingController {
  initAudios(): void;

  startLoadingAsset(): void;

  getAudiosFromAudioSevice(): void;

  updateLoadingView_progressBar(updatePoint: number): void;

  showPopupMessage(message: string);

  checkResultLoadingAssets();

  screenChange();
}
export interface ILanguegeService {
  loadingLanguage(callBack: Function);
  getResultLoadLanguage(): boolean;
}
