export class Timer {
  constructor({timerTime = 25 , timerPause = 5, timerBigPause = 15, tasks = []}) {
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

    console.log(`Запущена задача ${this.activeTask.name}`);

    this.activeTask.setCount();

    if (this.activeTask.count % 3 === 0) {
      console.log(`Запущена длинная пауза на ${this.timerBigPause} минут`);
    } else {
      console.log(`Запущена короткая пауза на ${this.timerPause} минут`);

    }
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

