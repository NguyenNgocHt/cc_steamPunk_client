import { math } from "cc";
import { _decorator, Component, Node } from "cc";
import BasePopup from "../../../../../framework/ui/BasePopup";
import TableView, { TableViewDataSource } from "../../../../../framework/ui/TableView";
import { Item_TableView } from "./Item_TableView";
const { ccclass, property } = _decorator;

@ccclass("Popup_TableView")
export class Popup_TableView extends BasePopup implements TableViewDataSource {
  @property(TableView)
  protected tableView: TableView = null!;

  protected _listItems: any[] = [];
  private numItems: number = 10;

  numberOfCellsInTableView(tableView: TableView): number {
    return this._listItems.length;
  }
  tableCellAtIndex(tableView: TableView, idx: number): Node {
    let cell = tableView.dequeueCell();
    let comp = cell?.getComponent(Item_TableView);
    comp?.setData(this._listItems[idx]);
    return cell;
  }

  onEnable() {
    this.tableView.dataSource = this;

    this.initListData();
    this.tableView && this.tableView.reloadData();
  }

  initListData() {
    this._listItems = [];
    for (let i = 0; i < this.numItems; i++) {
      this._listItems.push({
        id: i + 1,
        content: "content " + (i + 1),
      });
    }
  }
}
