import { _decorator, Component, Node } from "cc";
import { MenuView } from "../view/MenuView";
import { EventBus } from "../../../../../../../framework/common/EventBus";
import { GAME_EVENT } from "../../../../network/networkDefine";
import ScreenManager from "../../../../../../../framework/ui/ScreenManager";
import { PATH } from "../../../../common/define";
import { Prefab } from "cc";
import { instantiate } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MenuController")
export class MenuController extends Component {
  @property(MenuView)
  menuView: MenuView = null;
  countOnClick: number = 0;
  onLoad() {
    this.registerEvent();
  }

  registerEvent() {
    EventBus.on(GAME_EVENT.ON_MENU_ICON, this.setMoveIconList.bind(this));
    EventBus.on(GAME_EVENT.ON_HELP_VIEW, this.showHelpView.bind(this));
  }

  unRegisterEvent() {
    EventBus.off(GAME_EVENT.ON_MENU_ICON, this.setMoveIconList.bind(this));
    EventBus.off(GAME_EVENT.ON_HELP_VIEW, this.showHelpView.bind(this));
  }
  setMoveIconList() {
    this.countOnClick++;
    if (this.countOnClick == 1) {
      this.menuView.moveDownListIcon();
    } else if (this.countOnClick == 2) {
      this.menuView.moveUpListIcon();
      this.countOnClick = 0;
    }
  }

  showHelpView() {
    let helpView = ScreenManager.instance.assetBundle.get(PATH.HELP_LAYER, Prefab)!;
    if (helpView) {
      console.log(helpView);
      let helpViewNode = instantiate(helpView);
      if (helpViewNode) {
        this.menuView.showHelpView(helpViewNode);
      }
    }
  }
}
