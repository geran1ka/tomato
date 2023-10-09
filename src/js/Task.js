export class Task {
  constructor(text, count = 0) {
    this.id = Math.floor(Math.random() * 1000);
    this._text = text;
    this._count = count;
  }

  setCount() {
    this._count += 1;
    return this;
  }

  get count() {
    return this._count;
  }

  set text(newText) {
    this._text = newText;
  }

  get text() {
    return this._text;
  }
}

export class ImportantTask extends Task {
  constructor(text) {
    super(text);
    this.importance = 'важная';
  }
}

export class StandartTask extends Task {
  constructor(text, importance) {
    super(text);
    this.importance = 'стандартная';
  }
}

export class UnimportantTask extends Task {
  constructor(text, importance) {
    super(text);
    this.importance = 'неважная';
  }
}

