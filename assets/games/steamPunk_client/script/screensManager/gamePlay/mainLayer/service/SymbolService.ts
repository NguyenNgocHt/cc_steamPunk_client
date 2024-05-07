import { _decorator, Component, CCFloat, Vec2, Size, sp, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("SymbolService")
export class SymbolService extends Component {
  @property(CCFloat)
  symbolScaleList: number[] = [];

  @property(Vec2)
  symbolPos: Vec2[] = [];

  @property(Size)
  symbolSize: Size[] = [];

  @property(sp.SkeletonData)
  skeletonDataList: sp.SkeletonData[] = [];

  @property(SpriteFrame)
  symbolImageList: SpriteFrame[] = [];

  getSymbolScaleList(): number[] {
    return this.symbolScaleList ? this.symbolScaleList : [];
  }

  getSymbolPosition(): Vec2[] {
    return this.symbolPos ? this.symbolPos : [];
  }

  getSymbolSize(): Size[] {
    return this.symbolSize ? this.symbolSize : [];
  }

  getSkeletonDataList(): sp.SkeletonData[] {
    return this.skeletonDataList ? this.skeletonDataList : [];
  }

  getSymbolImageList(): SpriteFrame[] {
    return this.symbolImageList ? this.symbolImageList : [];
  }
}
