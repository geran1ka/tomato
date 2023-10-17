export class Task {
  constructor(title, count = 0) {
    this.id = Math.random().toString(16).substring(2, 8);
    this._title = title;
    this._count = count;
  }

  setCount() {
    this._count += 1;
    return this;
  }

  get count() {
    return this._count;
  }

  set title(newText) {
    this._title = newText;
  }

  get title() {
    return this._title;
  }
}

export class ImportantTask extends Task {
  constructor(title) {
    super(title);
    this.importance = 'important';
  }
}

export class StandartTask extends Task {
  constructor(title) {
    super(title);
    this.importance = 'standart';
  }
}

export class UnimportantTask extends Task {
  constructor(title) {
    super(title);
    this.importance = 'default';
  }
}

