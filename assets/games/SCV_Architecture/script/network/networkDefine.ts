export const GAME_EVENT = {
  //loading  screen event mesenger

  START_LOADING_ASSETS: "start loading assets",
  PROGRESS_BAR_POINT: "progress bar point",
  GET_PROGRESS_BAR_CURRENT: "get progress current",
  GET_AUDIOS: "get audios",
  INIT_AUDIOS: "init audios",
  RESOURCE_LOADING_ERR: "resource loading error",
  SCREEN_CHANGE: "screen change",

  //login screen event messenger
  //login group
  ONCICK_REGISTRATION_BUTTON: "onClick registration button",
  ONCLICK_PLAY_NOW_BUTTON_FROM_LOGIN_NODE: "onClick play now button from login node",
  CALL_REGISTER_NODE: "call register node",
  CALL_PLAY_NOW_NODE_FROM_LOGIN_CTR: "call play now node from login controler",
  LOGIN_DATA: "login data",
  SEND_DATA_TO_DIRECTOR_FROM_LOGIN: "send data to director from login",
  SWITCH_TO_THE_HOME_SCREEN: "swith to the home screen",

  //register group
  ON_CLICK_LOGIN_BUTTON: "onClick login button",
  CALL_LOGIN_NODE: "call login node",
  ONCLICK_PLAY_NOW_BUTTON_FROM_REGISTER_NODE: "onclick play now button from register node",
  CALL_PLAY_NOW_NODE_FROM_REGISTER_CTR: "call play now node from register controler",
  REGISTER_DATA: "register data",

  //play now group
  ON_CLICK_LOGIN_BUTTON_IN_PLAY_NOW: "onClick login button in play now",
  ON_LICK_REGISTER_BUTTON_IN_PLAY_NOW: "onClick register button in play now",
  CALL_LOGIN_NODE_IN_PLAY_NOW_CTR: "call login node in play now controler",
  CALL_REGISTER_NODE_IN_PLAY_NOW_CTR: "call register node in play now controler",

  //directorSendDataControler
  SEND_LOGIN_NODE_DATA_FROM_DIRECTOR: "send login node data from director",
  SEND_PLAYER_IN_HOME_NODE_DATA_FROM_DIRECTOR: "send player in home node data from director",

  //sendDataToSever
  SEND_LOGIN_NODE_DATA_TO_SEVER: "send login node data to sever",
  SEND_PLAYER_IN_HOME_DATA_TO_SEVER: "send player in home data to sever",

  //eventListtener
  SEND_PLAYER_INFO_TO_DIRECTOR: "player info to director",
  SEND_LOGIN_RESULT_DATA_TO_DIRECTOR: "login result data to director",

  //handleDatafromServerModel
  SEND_PLAYER_INFO_TO_SCREENS_CONTROLER: "send player info to screens controler",
  SEND_LOGIN_RESULT_DATA_TO_SCREENS_CONTROLER: "send login result data to screens controler",

  //director_sendDataToScreenControler
  SEND_LOGIN_RESULT_TO_LOGIN_MODEL: "send data login result to login model",
  SEND_TO_PLAYER_INFO: "send to player info",
  SEND_PLAYER_INFO_TO_PLAYER_MODEL_IN_HOME: "send player info to home_player model",

  //loginModel
  SEND_LOGIN_RESULT_TO_LOGIN_SEVICE: "send login result to login sevice",

  //loginSevice
  LOGIN_SUCCESS: "login success",
  USER_NAME_WRONG: "user name wrong",
  PASSWORD_WRONG: "password wrong",
  PASSWORD_AND_USER_NAME_WRONG: "password and user name wrong",

  //home_playerControler
  HOME_SEND_PLAYER_ID_TO_DIRECTOR: "send player id to director",

  //sever_playerModel
  SEND_PLAYER_ID_TO_SERVER_PLAYER_CONTROLER: "send player id to sever player controler",

  //home playerModel
  SEND_PLAYER_INFO_TO_PLAYER_CONTROLER_IN_HOME: "send player info to player controler in home",
  //player info
};
