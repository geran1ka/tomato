export class Storage {
  constructor(key) {
    this.key = key;
    this.arr = new Set(this.get());
  }

  get() {
    const value = localStorage.getItem(this.key);

    if (value) {
      return value;
    }

    return null;
  }

  set(data) {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }
    localStorage.setItem(this.key, data);
  }

  delete() {
    localStorage.removeItem(this.key);
  }
}


export class TaskService extends Storage {
  static instance;
  constructor (key = 'tomato') {
    if (!TaskService.instance) {
      super(key);
      this.arr = new Set(this.get());
      TaskService.instance = this;
    }
    return TaskService.instance;
  }

  get() {
    const data = super.get();
    if (data) {
      const arr = JSON.parse(data);
      if (Array.isArray(arr)) {

        return arr;
      }
    }

    return [];
  }

  add(value) {
    this.arr.add(value);
    this.set([...this.arr]);
  }

  remove(value) {
    if (this.check(value)) {
      this.arr.delete(value);
      this.set([...this.arr]);
      return true;
    }
    return false;
  }

  check(value) {
    return this.arr.has(value);
  }
}
