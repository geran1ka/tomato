import { audioPlay, getTimeMinSec } from "../utils";

export class Timer {
  constructor(state) {
    this.state = state
  }


  startTimer(elem) {
    const countdown = new Date().getTime() + this.state.getTimer() * 1000;
    this.state.timerId = setInterval(() => {
      elem.textContent = getTimeMinSec(this.state);

      this.state.time -= 1;
      if (this.state.time > 0 && this.state.isActive) {
        return;
      }

      clearTimeout(this.state.timerId);


      if(this.state.status === 'work') {
        console.log('this.state.activeTodo: ', this.state);
        this.state.activeTodo._count += 1;
        if(this.state.activeTodo._count % this.state.count !== 0) {
          this.state.status = 'break';

        } else {
          this.state.status = 'relax';

        }
      } else {
        this.state.status = 'work'
      }

      this.state.time = this.state[this.state.status] * 60;
      this.startTimer(elem);
    }, 1000)
  }

  stop() {
    clearTimeout(this.state.timerId);
    this.state.isActive = false;
    this.state.time = this.state[this.state.status] * 60;
  }
}