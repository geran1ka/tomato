class Task {
  constructor(name, count = 0) {
    this.id = Math.floor(Math.random() * 1000);
    this.name = name;
    this.counter = count;
  }

  setCounter() {
    this.counter += 1;
    return this;
  }

  setName(newName) {
    this.name = newName;
    return this;
  }
}

export const task = new Task ('Решить задача модуля 8 урок 3', 1);
