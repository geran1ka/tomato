export class State {
  constructor(workTime = 25, breakTime = 5, relaxTime = 15) {
    this.work = workTime;
    this.break = breakTime;
    this.relax = relaxTime;
    this.status = 'work';
    this.count = 4;
    this.time = this.work * 60;
    this.isActive = false;
    this.timerId = 0;
    this.activeTodo = null;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }

  getCount() {
    return this.count;
  }

  setCount(count) {
    this.count = count;
  }

  getTimer() {
    return this.time;
  }

  setTimer(time) {
    this.time = time * 60;
  }

  getTimerId() {
    return this.timerId;
  }

  setTimerId(timerId) {
    this.timerId = timerId;
  }

  getActiveTodo() {
    return this.activeTodo;
  }

  setActiveTodo(todo) {
    this.activeTodo = todo;
  }
  // getIsActive() {
  //   return this.state.isActive;
  // }

  // setIsActive(status) {
  //   this.state.isActive = status;
  // }
}