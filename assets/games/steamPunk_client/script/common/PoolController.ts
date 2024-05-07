import { MAP_SYMBOL } from "./define";
import { instantiate } from "cc";
import { Prefab } from "cc";
import { _decorator, Component, Node } from "cc";
import { IPoolController } from "../interfaces/Common_interfaces";
const { ccclass, property } = _decorator;

/*
Pool -> stateless

interface Pool<T> where T:IDisposal{
  T Get();
  Return<T>(T object);
}

class XXX:IPool<T>{
  public XXX(Func<T> create){

  }
}

Pool [] _pools = new Pool[2];

Math.Add(int a,int b);
*/

@ccclass("PoolController")
export class PoolController extends Component implements IPoolController {
  @property(Prefab)
  listSymbolPrefab: Prefab[] = [];

  @property(Node)
  listSymbolGroup: Node[] = [];

  @property(Prefab)
  listTrendPrefab: Prefab[] = [];

  @property(Node)
  listTrendGroupNode: Node[] = [];

  listSymbolNodes: any[] = [];

  listTrendNodes: any[] = [];

  trendBlueList: Node[] = [];
  trendGreenList: Node[] = [];
  trendYellowList: Node[] = [];

  /*
  list -> remove
  -> limit | max ,....
  -> const 
  -> variable -> inject into constructor
  */
  symbolListLenght: number = 30;
  listSymbolLenght: number = 10;
  listTrendLenght: number = 3;

  init() {
    this.initListSymbolNodes();
    this.initListTrendNodes();
    this.initSymbolPools();
    this.initTrendPools();
  }

  private initListSymbolNodes() {
    for (let i = 0; i < this.listSymbolLenght; i++) {
      let symbolNodes: Node[] = [];
      this.listSymbolNodes.push(symbolNodes);
    }
  }

  private initListTrendNodes() {
    for (let i = 0; i < this.listTrendLenght; i++) {
      let trendNodes: Node[] = [];
      this.listTrendNodes.push(trendNodes);
    }
  }

  private initSymbolPools() {
    this.initPools(this.listSymbolPrefab, this.listSymbolNodes, this.listSymbolGroup);
  }

  private initTrendPools() {
    this.initPools(this.listTrendPrefab, this.listTrendNodes, this.listTrendGroupNode);
  }

  private initPools(listPrefab: Prefab[], listSymbol: any[], listNode: Node[]) {
    for (let i = 0; i < listPrefab.length; i++) {
      this.initPool(listPrefab[i], listSymbol[i], listNode[i], i + 1);
    }
  }

  private initPool(iconPrefab: Prefab, nodeList: Node[], iconGroup: Node, iconIndex: number) {
    for (let i = 0; i < this.symbolListLenght; i++) {
      this.instantiateNode(iconPrefab, nodeList, iconGroup, iconIndex);
    }
  }

  private instantiateNode(symbolPrefab: Prefab, symbolListNode: Node[], symbolNodeGroup: Node, symbolIndex: number) {
    let symbolNode = instantiate(symbolPrefab);
    if (symbolNode) {
      symbolNode.name = symbolIndex.toString();
      symbolNodeGroup.addChild(symbolNode);
      symbolListNode.push(symbolNode);
      symbolNode.active = false;
    }
  }

  getSymbolNode(symbolIndex: number): Node {
    return this.findNode(symbolIndex, this.listSymbolPrefab, this.listSymbolNodes, this.listSymbolGroup);
  }

  getTrendNode(trendIndex: number): Node {
    return this.findNode(trendIndex, this.listTrendPrefab, this.listTrendNodes, this.listTrendGroupNode);
  }

  pushSymbolNode(symbolName: string, symbolNode: Node) {
    this.pushNode(symbolName, symbolNode, this.listSymbolNodes, this.listSymbolGroup);
  }

  pushTrendNode(symbolName: string, symbolNode: Node) {
    this.pushNode(symbolName, symbolNode, this.listTrendNodes, this.listTrendGroupNode);
  }

  //findNode
  private findNode(symbolNumber: number, symbolPrefab: Prefab[], symbolListNodes: any[], symbolNodeGroup: Node[]): Node {
    for (let i = 0; i < symbolListNodes.length; i++) {
      if (symbolNumber == i + 1) {
        let symbolNodes = symbolListNodes[i] as Node[];

        if (symbolNodes) {
          if (symbolNodes.length > 0) {
            let symbolNode = symbolNodes.pop();
            symbolNode.removeFromParent();
            return symbolNode;
          } else {
            this.initPool(symbolPrefab[i], symbolListNodes[i], symbolNodeGroup[i], symbolNumber);
            let symbolNodes = symbolListNodes[i] as Node[];
            let symbolNode = symbolNodes.pop();
            symbolNode.removeFromParent();
            return symbolNode;
          }
        }
      }
    }
  }

  private pushNode(NodeName: string, iconNode: Node, listIconNodes: any[], listIconGroup: Node[]) {
    this.resetNodePropertyesToOrigin(iconNode);
    let symbolIndex = parseInt(NodeName);
    if (iconNode.parent) {
      iconNode.removeFromParent();
    }
    listIconNodes[symbolIndex - 1].push(iconNode);

    listIconGroup[symbolIndex - 1].addChild(iconNode);
    iconNode.active = false;
  }

  private resetNodePropertyesToOrigin(symbolNode: Node) {}
}
