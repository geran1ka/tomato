import { State } from "../State/State";
import { StorageTask } from "../Storage/StorageTask";
import { Timer } from "../Timer/Timer";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { SectionMain } from "./SectionMain/SectionMain";

export class View {
constructor(root) {
  this.root = root;
  this.storage = new StorageTask();
  this.state = new State();
  this.timer = new Timer(this.state);
  this.header = new Header();
  this.main = new Main();
  this.section = new SectionMain(this.storage, this.state, this.timer);
  this.render = this.getRender(this.root);
}

  getRender(root) {
    this.section.mount(this.main.element);
    root.append(this.header.mount(), this.main.mount())
  }
}