import { _decorator, Component, Node } from "cc";
import { PoolController } from "../../../../common/PoolController";
import { iconTrendView } from "./iconTrendView";
import { IIconTrendView } from "../../../../interfaces/gamePlay/player_interfaces";
import { Layout } from "cc";
import { UITransform } from "cc";
import { tween } from "cc";
import { Vec3 } from "cc";
import { Tween } from "cc";
const { ccclass, property } = _decorator;

@ccclass("TrendHistoryView")
export class TrendHistoryView extends Component {
  @property(Node)
  originNode: Node = null;

  @property(Node)
  tagetNode: Node = null;

  @property(Node)
  conten: Node = null;

  poolControl: PoolController = null;

  _iconTrendView: IIconTrendView = null;

  handlePoolControl(poolControl: PoolController) {
    this.poolControl = poolControl;
    console.log(this.poolControl);
  }

  pushBlueIconInConten(iconValue: number) {
    console.log("add blue", iconValue);
    let trendBlueNode = this.poolControl.getTrendBlueNode();
    console.log(trendBlueNode);
    if (trendBlueNode) {
      trendBlueNode.active = true;
      let iconView = trendBlueNode.getComponent(iconTrendView);
      this._iconTrendView = iconView;
      this._iconTrendView.updateValue(iconValue);
      this.changeNodePositionInLayout(trendBlueNode);
    }
  }
  pushGreenIconInConten(iconValue: number) {
    console.log("add green", iconValue);
    let trendGreenNode = this.poolControl.getTrendGreenNode();
    console.log(trendGreenNode);
    if (trendGreenNode) {
      trendGreenNode.active = true;
      let iconView = trendGreenNode.getComponent(iconTrendView);
      this._iconTrendView = iconView;
      this._iconTrendView.updateValue(iconValue);
      this.changeNodePositionInLayout(trendGreenNode);
    }
  }
  changeNodePositionInLayout(iconNode: Node) {
    let layout = this.conten.getComponent(Layout);
    if (layout) {
      this.moveIcons(iconNode);
      this.moveNewIcon(iconNode);
    }
  }

  moveNewIcon(iconNode: Node) {
    let originPos = this.originNode.getWorldPosition();
    let tagetPos = this.tagetNode.getWorldPosition();

    iconNode.setWorldPosition(originPos.x, originPos.y, 0);

    tween(iconNode)
      .to(0.5, { position: new Vec3(tagetPos.x, tagetPos.y, 0) })
      .call(() => {
        this.conten.addChild(iconNode);
        let layout = this.conten.getComponent(Layout);
        layout.updateLayout();
      })
      .start();
  }
  moveIcons(iconNode: Node) {
    let uiTransformIconNode = iconNode.getComponent(UITransform);
    let childen = this.conten.children;
    let spacing = this.conten.getComponent(Layout).spacingX;
    let xOffset = uiTransformIconNode.width + spacing;
    if (childen.length >= 1) {
      for (let i = 0; i < childen.length; i++) {
        let iconNode = childen[i];
        tween(iconNode)
          .to(0.5, { position: new Vec3(iconNode.position.x + 100, iconNode.position.y, 0) })
          .start();
      }
    }
  }
}
