class Counter {
  constructor(name, count = 0) {
    this.id = Math.floor(Math.random() * 1000);
    this._name = name;
    this._count = count;
  }

  incrementCounter() {
    this._count += 1;
    return this;
  }

  get count() {
    return this._count;
  }

  setName(newName = '') {
    this._name = newName;
    return this;
  }

  get name() {
    return this._name;
  }
}

export const counter = new Counter ('Решить задача модуля 8 урок 3', 1);
