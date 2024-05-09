import { _decorator, Component, Node } from "cc";
import { PoolController } from "../../../../common/PoolController";
import { iconTrendView } from "./iconTrendView";
import { IIconTrendView } from "../../../../interfaces/gamePlay/player_interfaces";
import { Layout } from "cc";
import { UITransform } from "cc";
import { tween } from "cc";
import { Vec3 } from "cc";
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
  }

  pushBlueIconInConten(iconValue: number): void {
    let trendBlueNode = this.poolControl.getTrendNode(1);

    //early return
    if (!trendBlueNode) {
      return;
    }

    trendBlueNode.active = true;

    let iconView = trendBlueNode.getComponent(iconTrendView);
    this._iconTrendView = iconView;
    this._iconTrendView.updateValue(iconValue);

    this.changeNodePositionInLayout(trendBlueNode);
  }

  pushGreenIconInConten(iconValue: number) {
    let trendGreenNode = this.poolControl.getTrendNode(2);
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

  //update
  //append
  moveIcons(newNode: Node): void {
    let children = this.conten.children;
    if (children.length == 0) return;

    let spacing = this.conten.getComponent(Layout).spacingX;

    let component = newNode.getComponent(UITransform);

    for (let i = 0; i < children.length; i++) {
      let node = children[i];

      tween(node)
        .to(0.5, { position: new Vec3(node.position.x + component.width + spacing, node.position.y, 0) })
        .start();
    }
  }
}
