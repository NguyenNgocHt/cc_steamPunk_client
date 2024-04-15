export interface GameListener {
  onSocketOpen();

  onSocketReconnect();

  onSocketMessage(cmd: number, data: string);

  onSocketError();

  onSocketClose();

  onSocketDisconnect();
}
