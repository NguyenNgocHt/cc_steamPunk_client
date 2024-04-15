export default abstract class BaseDirector {
  protected _eventNames: string[] = null!;

  _registerListeners() {}

  _unregisterListeners() {}

  protected abstract processEvent(eventData: any): void;
}
