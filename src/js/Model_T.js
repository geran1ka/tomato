class Model {
  constructor(view) {
    this.value = 0;
    this.view = view;
  }

  increment() {
    this.value += 1;
    this.view.updateNumber();
  }

  decrement() {
    this.value -= 1;
    this.view.updateNumber();
  }
}

class Controller {
  constructor(model) {
    this.model = model;
  }

  handleIncrement() {
    this.model.increment();
  }

  handleDecrement() {
    this.model.decrement();
  }
}

class View {
  constructor(root) {
    this.root = root;
    this.model = new Model(this);
    this.controller = new Controller(this.model);
    this.text = document.createElement('p');
    this.text.textContent = 0;
    this.incrementButton = document.createElement('button');
    this.incrementButton.textContent = '+';
    this.decrementButton = document.createElement('button');
    this.decrementButton.textContent = '-';
    this.bindListeners();
  }

  bindListeners() {
    this.incrementButton.addEventListener(
      'click',
      this.controller.handleIncrement.bind(this),
    );
    this.decrementButton.addEventListener(
      'click',
      this.controller.handleDecrement.bind(this),
    );
  }

  updateNumber() {
    this.text.textContent = this.model.value;
  }

  render() {
    this.root.append(this.text);
    this.root.append(this.incrementButton);
    this.root.append(this.decrementButton);
  }
}

const view = new View(document.getElementById('app'));

view.render();
