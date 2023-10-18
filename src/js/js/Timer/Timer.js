import {changeStatusInfo, getTimeMinSec } from "../utils";

export class Timer {
  constructor(state) {
    this.state = state
  }


  startTimer(elemTimer, elemInfo, elemCount) {
    const countdown = new Date().getTime() + this.state.time * 1000;
    this.state.timerId = setInterval(() => {
      elemTimer.textContent = getTimeMinSec(this.state);

      this.state.time -= 1;
      if (this.state.time > 0 && this.state.isActive) {
        return;
      }

      clearTimeout(this.state.timerId);


      if(this.state.status === 'work') {
        this.state.activeTodo._count += 1;
        elemCount.textContent = this.state.activeTodo._count;
        if(this.state.activeTodo._count % this.state.count !== 0) {
          this.state.status = 'break';

        } else {
          this.state.status = 'relax';

        }
      } else {
        this.state.status = 'work'
      }

      elemInfo.textContent = changeStatusInfo(this.state);

      this.state.time = this.state[this.state.status] * 60;
      this.startTimer(elemTimer, elemInfo, elemCount);
    }, 1000)
  }

  stop() {
    clearTimeout(this.state.timerId);
    this.state.isActive = false;
    this.state.time = this.state[this.state.status] * 60;
  }
}