export const GAME_EVENT = {
  //loading  screen event mesenger

  START_LOADING_ASSETS: "start loading assets",
  PROGRESS_BAR_POINT: "progress bar point",
  GET_PROGRESS_BAR_CURRENT: "get progress current",
  GET_AUDIOS: "get audios",
  INIT_AUDIOS: "init audios",
  RESOURCE_LOADING_ERR: "resource loading error",
  SCREEN_CHANGE: "screen change",

  //game play controller
  SEND_TO_PLAYER_INFO: "send to player info",
  SEND_GAME_INFO: "send game info",
  //game info
  SEND_TO_GAME_INFO: "send to game info",
  //landingGroup
  END_SHOW_LANDING: "end show landing",
  //play screen view
  BET_LAYER_TO_UP_END: "bet layer to up end",
  //BetLineGroup
  ONCLICK_SUB_LINE: "onClick sub line",
  ONCLICK_ADD_LINE: " onClick add line",
  SEND_CURRENT_BET_LINE: "send current bet line",
  //betAmoutgroup
  GET_GAME_INFO: "get game info",
  CURRENT_BET_VALUE: "current bet value",
};
export const SOCKET_EVENT = {
  //sys event---------
  CONNECTION: "connection",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  CONNECT_ERROR: "connect_error",

  UPDATE_COIN: "updatecoin",
  GAME_INFO: "gameinfo",
  LOGIN: "login",
  BET: "bet",
  CASH_OUT: "cashout",
  BALANCE: "balance",
};
