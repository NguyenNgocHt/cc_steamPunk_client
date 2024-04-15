import TaskContainer from "./TaskContainer";

export default class ParallelTask extends TaskContainer {
  update(dt: number) {
    let removeThisTask = false;
    for (let i = 0; i < this._listTask.length /* i increase below, if need */; ) {
      removeThisTask = false;
      // if (this._listTask) {
      this._listTask[i].update(dt);

      if (this._listTask[i].isDone()) {
        removeThisTask = true;
        this._listTask[i].cleanUp();
      }

      if (removeThisTask) {
        // remove the task
        this._listTask.splice(i, 1);
      } else {
        ++i;
      }
    }
  }
}
