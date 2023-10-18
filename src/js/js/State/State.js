export class State {
  constructor(workTime = 0.2, breakTime = 0.1, relaxTime = 0.15) {
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

  getTime() {
    return this.time;
  }

  setTime(time) {
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

  getIsActive() {
    console.log(this.state.isActive);
    return this.state.isActive;
  }

  setIsActive(status) {
    this.state.isActive = status;
  }
}