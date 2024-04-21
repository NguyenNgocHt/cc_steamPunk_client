import { MAP_SYMBOL } from "./define";
import { instantiate } from "cc";
import { Prefab } from "cc";
import { _decorator, Component, Node } from "cc";
import { IPoolController } from "../interfaces/Common_interfaces";
const { ccclass, property } = _decorator;

@ccclass("PoolController")
export class PoolController extends Component implements IPoolController {
  @property(Prefab)
  aPrefab: Prefab = null;

  @property(Prefab)
  freeSpinPrefab: Prefab = null;

  @property(Prefab)
  gearPrefab: Prefab = null;

  @property(Prefab)
  girlPrefab: Prefab = null;

  @property(Prefab)
  guysPrefab: Prefab = null;

  @property(Prefab)
  jPrefab: Prefab = null;

  @property(Prefab)
  qPrefab: Prefab = null;

  @property(Prefab)
  kPrefab: Prefab = null;

  @property(Prefab)
  wildPrefab: Prefab = null;

  @property(Prefab)
  jackpotPrefab: Prefab = null;

  @property(Node)
  aGroup: Node = null;

  @property(Node)
  freeSpinGroup: Node = null;

  @property(Node)
  gearGroup: Node = null;

  @property(Node)
  girlGroup: Node = null;

  @property(Node)
  guysGroup: Node = null;

  @property(Node)
  jGroup: Node = null;

  @property(Node)
  jackpotGroup: Node = null;

  @property(Node)
  qGroup: Node = null;

  @property(Node)
  kGroup: Node = null;

  @property(Node)
  wildGroup: Node = null;

  aList: Node[] = [];
  freeSpinList: Node[] = [];
  gearList: Node[] = [];
  girlList: Node[] = [];
  guysList: Node[] = [];
  jList: Node[] = [];
  qList: Node[] = [];
  kList: Node[] = [];
  wildList: Node[] = [];
  jackpotList: Node[] = [];

  symbolListLenght: number = 30;

  init() {
    this.initPoolA();
    this.initPoolFreeSpin();
    this.initPoolGear();
    this.initPoolGirl();
    this.initPoolGuys();
    this.initPoolJ();
    this.initPoolQ();
    this.initPoolK();
    this.initPoolWild();
    this.initPoolJackpot();
  }

  initPoolA() {
    for (let i = 0; i < this.symbolListLenght; i++) {
      this.instantiateSymbolNode(this.aPrefab, this.aList, this.aGroup, MAP_SYMBOL.a);
    }
    console.log(this.aList);
  }

  initPoolFreeSpin() {
    for (let i = 0; i < this.symbolListLenght; i++) {
      this.instantiateSymbolNode(this.freeSpinPrefab, this.freeSpinList, this.freeSpinGroup, MAP_SYMBOL.freespin);
    }
  }

  initPoolGear() {
    for (let i = 0; i < this.symbolListLenght; i++) {
      this.instantiateSymbolNode(this.gearPrefab, this.gearList, this.gearGroup, MAP_SYMBOL.gear);
    }
  }

  initPoolGirl() {
    for (let i = 0; i < this.symbolListLenght; i++) {
      this.instantiateSymbolNode(this.girlPrefab, this.girlList, this.girlGroup, MAP_SYMBOL.girl);
    }
  }

  initPoolGuys() {
    for (let i = 0; i < this.symbolListLenght; i++) {
      this.instantiateSymbolNode(this.guysPrefab, this.guysList, this.guysGroup, MAP_SYMBOL.guys);
    }
  }

  initPoolJ() {
    for (let i = 0; i < this.symbolListLenght; i++) {
      this.instantiateSymbolNode(this.jPrefab, this.jList, this.jGroup, MAP_SYMBOL.j);
    }
  }
  initPoolQ() {
    for (let i = 0; i < this.symbolListLenght; i++) {
      this.instantiateSymbolNode(this.qPrefab, this.qList, this.qGroup, MAP_SYMBOL.q);
    }
  }

  initPoolK() {
    for (let i = 0; i < this.symbolListLenght; i++) {
      this.instantiateSymbolNode(this.kPrefab, this.kList, this.kGroup, MAP_SYMBOL.k);
    }
  }
  initPoolWild() {
    for (let i = 0; i < this.symbolListLenght; i++) {
      this.instantiateSymbolNode(this.wildPrefab, this.wildList, this.wildGroup, MAP_SYMBOL.wild);
    }
  }

  initPoolJackpot() {
    for (let i = 0; i < this.symbolListLenght; i++) {
      this.instantiateSymbolNode(this.jackpotPrefab, this.jackpotList, this.jackpotGroup, MAP_SYMBOL.jackpot);
    }
  }

  instantiateSymbolNode(symbolPrefab: Prefab, symbolListNode: Node[], symbolNodeGroup: Node, symbolName: number) {
    let symbolNode = instantiate(symbolPrefab);
    if (symbolNode) {
      symbolNode.name = symbolName.toString();
      symbolNodeGroup.addChild(symbolNode);
      symbolListNode.push(symbolNode);
      symbolNode.active = false;
    }
  }

  getSymbolNode(symbolNumber: number): Node {
    switch (symbolNumber) {
      case MAP_SYMBOL.a:
        return this.getNode(this.aList, this.initPoolA);
        break;
      case MAP_SYMBOL.freespin:
        return this.getNode(this.freeSpinList, this.initPoolFreeSpin);
        break;
      case MAP_SYMBOL.gear:
        return this.getNode(this.gearList, this.initPoolGear);
        break;
      case MAP_SYMBOL.girl:
        return this.getNode(this.girlList, this.initPoolGirl);
        break;
      case MAP_SYMBOL.guys:
        return this.getNode(this.guysList, this.initPoolGuys);
        break;
      case MAP_SYMBOL.j:
        return this.getNode(this.jList, this.initPoolJ);
        break;
      case MAP_SYMBOL.jackpot:
        return this.getNode(this.jackpotList, this.initPoolJackpot);
        break;
      case MAP_SYMBOL.q:
        return this.getNode(this.qList, this.initPoolQ);
        break;
      case MAP_SYMBOL.k:
        return this.getNode(this.kList, this.initPoolK);
        break;
      case MAP_SYMBOL.wild:
        return this.getNode(this.wildList, this.initPoolWild);
    }
  }

  pushSymbolNode(symbolName: string, symbolNode: Node) {
    switch (symbolName) {
      case MAP_SYMBOL.a.toString():
        this.pushNode(symbolNode, this.aList, this.aGroup);
        break;

      case MAP_SYMBOL.freespin.toString():
        this.pushNode(symbolNode, this.freeSpinList, this.freeSpinGroup);

        break;

      case MAP_SYMBOL.gear.toString():
        this.pushNode(symbolNode, this.gearList, this.gearGroup);
        break;

      case MAP_SYMBOL.girl.toString():
        this.pushNode(symbolNode, this.girlList, this.girlGroup);
        break;

      case MAP_SYMBOL.guys.toString():
        this.pushNode(symbolNode, this.guysList, this.guysGroup);
        break;

      case MAP_SYMBOL.j.toString():
        this.pushNode(symbolNode, this.jList, this.jGroup);
        break;

      case MAP_SYMBOL.jackpot.toString():
        this.pushNode(symbolNode, this.jackpotList, this.jackpotGroup);
        break;

      case MAP_SYMBOL.q.toString():
        this.pushNode(symbolNode, this.qList, this.qGroup);
        break;

      case MAP_SYMBOL.k.toString():
        this.pushNode(symbolNode, this.kList, this.kGroup);
        break;

      case MAP_SYMBOL.wild.toString():
        this.pushNode(symbolNode, this.wildList, this.wildGroup);
        break;
    }
  }

  resetNodePropertyesToOrigin(symbolNode: Node) {}

  getNode(symbolList: Node[], initNewPool: Function): Node {
    if (symbolList.length > 0) {
      let symbolNode = symbolList.pop();
      symbolNode.removeFromParent();
      return symbolNode;
    } else {
      initNewPool();
      let symbolNode = this.freeSpinList.pop();
      symbolNode.removeFromParent();
      return symbolNode;
    }
  }

  pushNode(symbolNode: Node, symbolList: Node[], symbolGroup: Node) {
    this.resetNodePropertyesToOrigin(symbolNode);

    if (symbolNode.parent) {
      symbolNode.removeFromParent();
    }
    symbolGroup.addChild(symbolNode);

    symbolList.push(symbolNode);

    symbolNode.active = false;
  }
}
