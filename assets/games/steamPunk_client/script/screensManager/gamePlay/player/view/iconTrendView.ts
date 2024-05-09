import { Label } from "cc";
import { _decorator, Component } from "cc";
import { IIconTrendView } from "../../../../interfaces/gamePlay/player_interfaces";
const { ccclass, property } = _decorator;

@ccclass("iconTrendView")
export class iconTrendView extends Component implements IIconTrendView {
  @property(Label)
  lbIconValue: Label = null;

  updateValue(value: number) {
    let iconValue = value;
    
    if (!Number.isInteger(iconValue)) {
      iconValue = parseFloat(iconValue.toFixed(2));
    }

    this.lbIconValue.string = iconValue.toString();
  }
}
