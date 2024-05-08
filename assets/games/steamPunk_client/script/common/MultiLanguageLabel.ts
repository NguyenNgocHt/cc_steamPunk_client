import { CCInteger } from "cc";
import { CCString } from "cc";
import { _decorator, Component, Node } from "cc";
import { EventBus } from "../../../../framework/common/EventBus";
import { GAME_EVENT } from "../network/networkDefine";
import { LanguageManager } from "../../../../framework/languge/LanguageManager";
import { TEXT_TYPE } from "./Enum";
import { Enum, Label } from "cc";
import Utils from "../../../../framework/utils/Utils";
import { EDITOR } from "cc/env";
const { ccclass, property, disallowMultiple, requireComponent, menu } = _decorator;

@ccclass("MultiLanguageLabel")
@requireComponent(Label)
@disallowMultiple()
export class MultiLanguageLabel extends Component {
  @property(CCString)
  key: string = "";

  @property(CCInteger)
  count: number = 0;

  @property({ type: Enum(TEXT_TYPE) })
  textType: TEXT_TYPE = TEXT_TYPE.NONE;

  @property({ readonly: true })
  get string() {
    return this.label?.string || "";
  }
  label?: Label | null = undefined;

  protected onLoad(): void {
    this.label = this.node.getComponent(Label);
  }

  start() {
    this.registerEvent();
  }
  registerEvent() {
    EventBus.on(GAME_EVENT.LANGUAGE_CHANGED, this.onChangeLanguage.bind(this));
  }

  setKey(key: string) {
    this.key = key;
  }

  getKey(): string {
    return this.key;
  }

  setCount(count: number) {
    this.count = count;
  }

  getCount(): number {
    return this.count;
  }

  onChangeLanguage() {
    let transLatedString = this.key;
    if (this.key == null || this.key.length <= 0) {
      return;
    }
    transLatedString = LanguageManager.getText(this.key);
    console.log("transLated", transLatedString);
    if (transLatedString.length <= 0) {
      return;
    }

    if (this.textType == TEXT_TYPE.FIRST_UP) {
      transLatedString = Utils.capitalizeFirstLetter(transLatedString);
    } else if (this.textType == TEXT_TYPE.UP_CASE) {
      transLatedString = transLatedString.toUpperCase();
    } else if (this.textType == TEXT_TYPE.NORMAL) {
      transLatedString = transLatedString.toLowerCase();
    }

    if (EDITOR) {
      console.log("come in editor");
      this.preview(transLatedString);
    } else {
      console.log("come in editor false");
      this.label.string = transLatedString;
    }
  }

  preview(value: string) {
    console.log("value", value);
    if (this.label && EDITOR) {
      console.log("value", value);
      const originalString = this.label.string;
      this.label.string = value;
      this.label.updateRenderData(true);

      this.label.string = originalString;
    }
  }
}
