import * as cc from 'cc';

import type ScrollView from "./ScrollView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScrollContent extends cc.Component {
  public get scrollView(): ScrollView {
    return this._scrollView;
  }

  public set scrollView(value: ScrollView) {
    this._scrollView = value;
  }
  private _scrollView: ScrollView = null!;
}
