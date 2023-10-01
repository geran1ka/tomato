export class Counter {
  constructor(name, count = 0) {
    this.id = Math.floor(Math.random() * 1000);
    this._name = name;
    this._count = count;
  }

  setCount() {
    this._count += 1;
    return this
  }

  get count() {
    return this._count;
  }

  set name(newName) {
    this._name = newName;
  }

  get name() {
    return this._name;
  }
}

