import { _decorator, Component, Node } from "cc";
import { SymbolView } from "../view/SymbolView";
import { SymbolGroupController } from "../controller/SymbolGroupController";
const { ccclass, property } = _decorator;

@ccclass("SpinningMachineController")
export class SpinningMachineController extends Component {
  @property(Node)
  symbolGroup: Node = null;

  @property(SymbolGroupController)
  slotView: SymbolGroupController = null;

  symbolNodeList: Node[] = [];

  loopIndex: number = 21;

  timeSCale: number = 1;

  showPositionSymbols() {
    this.symbolNodeList = [];
    this.symbolNodeList = this.slotView.getSymbolNodeList();
    if (this.symbolNodeList) {
      for (let i = 0; i < this.symbolNodeList.length; i++) {
        let symbolView = this.symbolNodeList[i].getComponent(SymbolView);
        if (symbolView) {
          symbolView.spinning(this.loopIndex, this.timeSCale);
        }
      }
    }
  }

  setTimeScale(timeScale: number) {
    this.timeSCale = timeScale;
  }
}
