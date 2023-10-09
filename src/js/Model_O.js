//  Model
class Model {
  constructor() {
    this.value = 0;
  }

  increment() {
    this.value += 1;
    return this.value;
  }

  decrement() {
    this.value -= 1;
    return this.value;
  }
}

//  Controller
class Controller {
  constructor() {
    this.model = new Model();
  }

  handleIncrement() {
    return this.model.increment();
  }

  handleDecrement() {
    return this.model.decrement();
  }

  handleMultiply() {
    return this.model.multipleAndDivide();
  }
}

//  View
class View {
  constructor(root) {
    this.root = root;
    this.controller = new Controller();

    this.text = document.createElement('p');
    this.text.textContent = 0;

    this.incrementButton = document.createElement('button');
    this.incrementButton.textContent = '+';
    this.decrementButton = document.createElement('button');
    this.decrementButton.textContent = '-';
    this.bindListeners();
  }

  onIncrementClick = () => {
    this.updateNummer(this.controller.handleIncrement());
  };

  onDecrementClick = () => {
    this.updateNummer(this.controller.handleDecrement());
  };

  bindListeners() {
    this.incrementButton.addEventListener('click', this.onIncrementClick);
    this.decrementButton.addEventListener('click', this.onDecrementClick);
  }

  updateNummer(value) {
    this.text.textContent = value;
  }

  mount() {
    this.root.append(this.text);
    this.root.append(this.incrementButton);
    this.root.append(this.decrementButton);
  }
}

// use

const view = new View(document.getElementById('app'));
view.mount();