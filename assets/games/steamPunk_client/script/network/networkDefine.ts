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
  SEND_GAME_DATA: "send game data",
  SEND_BET_RESULT_DATA: "send bet result data",
  PENDING_DATA: "pending data",
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
  CURRENT_BET_AMOUNT: "current bet amount",
  //slotControl
  LIST_SYMBOL_INDEX: "list symbol index",
  WIN_GAME: "win game",
  LOSE_GAME: "lose game",
  //btn Bet
  ON_CLICK_BET_BUTTON: "on click bet button",
  //symbol view
  SPINING_STOP: "spinning stop",
  ON_SPIN_EFFECT_VER2: "on spin effect ver2",
  //slot view
  FINISH_RESET_POSITION_ALL_SYMBOL_GROUP: "finish reset position all symbol group",
  //connect to server
  INIT_EVENT_NETWORK: "init event network",
  //data Controller
  SHOW_EFFECT_WIN_GAME: "show effect win game",
  SEND_POOL_MODEL: "send pool model",
  //win game bonus view
  UPDATE_MONEY_PLAYER: " update money player",
  //bet controller
  BET_DATA: "bet data",
  //menu view
  ON_MENU_ICON: "on menu icon",
  ON_HELP_VIEW: "on help view",
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
