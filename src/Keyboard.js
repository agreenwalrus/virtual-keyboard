import KeyElement from './KeyElement';

export default class Keyboard {
  #textArea = null;

  capsLock = false;

  shiftPressed = false;

  #lang = null;

  constructor(keys, textArea, lang = 'eng') {
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.keyboardContent = document.createElement('div');
    this.keyboardContent.classList.add('keyboard__content');
    this.keyboard.appendChild(this.keyboardContent);
    this.#lang = lang;
    this.init(keys);

    this.#textArea = textArea;
  }

  init(keys) {
    keys.forEach((key) => {
      const keyElem = KeyElement.getKeyElement(key, this.#lang);
      this.keyboardContent.appendChild(keyElem);
    });
  }

  getKeyboard() {
    return this.keyboard;
  }
}
