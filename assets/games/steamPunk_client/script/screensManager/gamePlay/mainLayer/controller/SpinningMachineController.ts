import { _decorator, Component, Node } from "cc";
import { SymbolView } from "../view/SymbolView";
import { SymbolGroupController } from "../controller/SymbolGroupController";
import { SymbolController } from "./SymbolController";
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
        let symbolControl = this.symbolNodeList[i].getComponent(SymbolController);
        if (symbolControl) {
          symbolControl.spinning(this.loopIndex, this.timeSCale);
        }
      }
    }
  }

  setTimeScale(timeScale: number) {
    this.timeSCale = timeScale;
  }
}
