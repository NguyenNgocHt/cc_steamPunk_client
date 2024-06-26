import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Item_TableView')
export class Item_TableView extends Component {

    @property(Label)
    lbItem: Label = null!;

    @property(Label)
    lbContent: Label = null!;

    setData(itemData: any) {
        this.lbItem && (this.lbItem.string = itemData.id);
        this.lbContent && (this.lbContent.string = itemData.content);
    }
}

