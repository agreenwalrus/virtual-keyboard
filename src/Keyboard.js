import KeyElement from './KeyElement';

export default class Keyboard {
  #textArea = null;

  #capsLock = false;

  #isEng = true;

  constructor(keys, textArea) {
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.keyboardContent = document.createElement('div');
    this.keyboardContent.classList.add('keyboard__content');
    this.keyboard.appendChild(this.keyboardContent);
    this.init(keys);

    this.#textArea = textArea;
  }

  init(keys) {
    keys.forEach((key) => {
      const keyElem = KeyElement.getKeyElement(key);
      this.keyboardContent.appendChild(keyElem);
      keyElem.addEventListener('click', (e) => {
        const content = this.#textArea.getContent();
        this.#textArea.setContent(`${content}${e.target.firstChild.data}`);
        console.log(e);
      });
    });
  }

  getKeyboard() {
    return this.keyboard;
  }
}
