import * as cc from 'cc';
import GameLoop from '../common/GameLoop';
import ViewGroup from './ViewGroup';

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseScreen extends ViewGroup {
    @property
    hideCurScreenOnShow: boolean = true;

    protected needLooping: boolean = false;

    start() {
        if (this.needLooping) {
            this._createGameLoop();
        }
        // VDAsyncTaskMgr.instance.schedule();
    }

    onDisable() {
        if (this.needLooping) {
            GameLoop.instance.stop();
        }
    }

    _createGameLoop() {
        GameLoop.instance.start();
        GameLoop.instance.addFunc("update_screen", this, this.updateScreen.bind(this));
    }

    public updateScreen() { }
}