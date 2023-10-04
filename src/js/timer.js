export class Timer {
  constructor({timerTime = 25, timerPause = 5, timerBigPause = 15, tasks = []}) {
    this.timerTime = timerTime;
    this.timerPause = timerPause;
    this.timerBigPause = timerBigPause;
    this.tasks = tasks;
    this.activeTask = null;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  activateTask(taskId) {
    const task = this.tasks.find(item => item.id === taskId);
    console.log('task: ', task);

    if (task) {
      this.activeTask = task;
    } else {
      console.log(`Задача с id=${taskId} отсутствует`);
    }
  }

  startTask() {
    if (!this.activeTask) {
      return console.log(`Активная задача отсутствует`);
    }
    console.log(this.activeTask.count);
    this.timer(this.timerTime);
    console.log(`Запущена задача ${this.activeTask.name}`);

    setTimeout(() => {
      this.activeTask.setCount();
      if (this.activeTask.count % 3 === 0) {
        this.timer(this.timerBigPause);
        console.log(`Запущена длинная пауза на ${this.timerBigPause} минут`);
        setTimeout(() => {
          this.startTask();
          console.log(`Закончен большой перерыв`);
        }, this.timerBigPause * 60 * 1000);
      } else {
        this.timer(this.timerPause);
        console.log(`Запущена короткая пауза на ${this.timerPause} минут`);
        setTimeout(() => {
          this.startTask();
        }, this.timerPause * 60 * 1000);
      }
    }, this.timerTime * 60 * 1000);
  }

  getNum(num) {
    return ('0' + num).slice(-2);
  }

  timer(time, cb = () => {}) {
    const endTime = Date.now() + time * 60 * 1000;

    const timetrId = setInterval(() => {
      const now = Date.now();
      const timeCountDown = endTime - now;

      const minutes = Math.floor(timeCountDown / (60 * 1000));
      const seconds = Math.floor((timeCountDown % (60 * 1000) / 1000));

      console.log(`Время до завершения ${this.getNum(minutes)}:${this.getNum(seconds)}`);

      if (Math.floor(timeCountDown / 1000) <= 0) {
        clearInterval(timetrId);
        cb();
      }
    }, 1000);
  }

  incrementCountTask(taskId) {
    const task = this.tasks.find(item => item.id === taskId);

    if (task) {
      this.setCount();
    } else {
      console.log(`Задача с id=${taskId} отсутствует`);
    }
  }
}
