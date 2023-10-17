import { State } from "../State.js";

export class Timer {
  constructor(state) {
    this.state = state
  }


  startTimer(elem) {
    const countdown = new Date().getTime() + this.state.getTimer() * 1000;
    this.state.timerId = setInterval(() => {
      const minutes = this.getNum(Math.floor(this.state.time / 60));
      const seconds = this.getNum(this.state.time % 60);
      elem.textContent = `${minutes}:${seconds}`

      this.state.time -= 1;
      if (this.state.time > 0 && this.state.isActive) {
        return;
      }

      clearTimeout(this.state.timerId);

      // if(this.state.status === 'work') {
      //   this.state.activeTodo.count += 1;
      //   if(this.state.activeTodo.count % this.state.count !== 0) {
      //     this.state.count = 'break';
      //   } else {
      //     this.state.count = 'relax';
      //   }
      // } else {
      //   this.state.status = 'work'
      // }

      // this.state.time = this.state[this.state.status] * 60;

      this.startTimer(elem);
    }, 1000)
  }

  getNum(n) {
    return ('0' + n).slice(-2);
  }

  stop() {
    clearTimeout(this.state.timerId);
    this.state.isActive = false;
    // btnStart.textContent = 'Старт'
    this.state.setTimer = this.state[this.state.status] * 60;
    // showTime(state.timeLeft);
  }
}