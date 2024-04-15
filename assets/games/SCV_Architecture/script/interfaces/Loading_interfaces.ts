export interface IAudioModel_loading {
  getSoundDirsData(): string[];

  setSoundDirsData(soundPath: string): void;
}

export interface IAudioSevice_loading {
  init(): void;

  loadingAudio(): void;

  loadAudioWeb();

  initAudio();

  getAudios(): { [key: string]: string };
}

export interface IAssetsSevice_loading {
  init(loadingControler: ILoadingController);

  loadingAssets(): void;

  setProgressBarCurrent(progressCurrent: number): void;

  setAudiosData(audios: { [key: string]: string });
}

export interface ILoadingView_loading {
  init(loadingController: ILoadingController);

  startView(): void;

  updateProgressBar(updatePoint: number): void;

  getProgressBar(): number;

  showMessenger(mesenger: string): void;

  setVersion(version: string): void;
}

export interface IImageModel_loading {
  getImagesDirsData(): string[];

  setImagesDirsData(imagePath: string): void;
}

export interface IPrefabModel_loading {
  getPrefabDirds(): string[];

  getPrefabsPath(): string[];

  setPrefabDirs(prefabDir: string): void;

  setPrefabsPath(prefabPath: string): void;
}

export interface ILoadingController {
  initAudios(): void;

  startLoadingAsset(): void;

  getAudiosFromAudioSevice(): void;

  updateLoadingView_progressBar(updatePoint: number): void;

  showPopupMessage(message: string);

  screenChange();
}
