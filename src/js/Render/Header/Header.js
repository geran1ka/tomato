import { addContainer } from "../addContainer";

import imgLogo from '../../../img/svg/noto_tomato.svg';

export class Header {
  static instance;

  constructor() {
    if (!Header.instance) {
      Header.instance = this;
      this.element = document.createElement('header');
      this.element.classList.add('header');
      this.containerElement = addContainer(this.element, 'header');
      this.isMounted = false;
    }

    return Header.instance;
  }

  mount() {
    if (this.isMounted) {
      return;
    }

    const logo = document.createElement('img');
    logo.classList.add('header__logo');
    logo.src = imgLogo;
    logo.alt = 'Tomato image';

    const title = document.createElement('h1');
    title.classList.add('header__title');
    title.textContent = 'Tomato timer';


    this.containerElement.append(logo, title);

    document.body.prepend(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
}
