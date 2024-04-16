import { GameConfig } from "../../../../framework/common/GameConfig";

export type ConfigType = GameConfig & {
  win_coin: number;
};

export const Config: ConfigType = {
  GAME_ID: "1000",
  GAME_NAME: "steamPunkClient",
  versionGame: "1.0.0",
  isShowFPS: true,
  isUnitTest: true,
  //------ extends
  win_coin: 1000,
};
