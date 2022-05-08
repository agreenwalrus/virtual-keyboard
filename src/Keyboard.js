import KeyElement from './KeyElement';

export default class Keyboard {
  #textArea = null;

  capsLock = false;

  shiftPressed = false;

  ctrlPressed = false;

  lang = null;

  constructor(keys, textArea, lang = 'eng') {
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.keyboardContent = document.createElement('div');
    this.keyboardContent.classList.add('keyboard__content');
    this.keyboard.appendChild(this.keyboardContent);
    this.lang = lang;
    this.init(keys);

    this.#textArea = textArea;
  }

  init(keys) {
    keys.forEach((key) => {
      const keyElem = KeyElement.getKeyElement(key);
      this.keyboardContent.appendChild(keyElem);
    });
    this.setUpLangualge();
  }

  getKeyboard() {
    return this.keyboard;
  }

  setUpLangualge() {
    this.keyboardContent.querySelectorAll('.key__eng').forEach((elem) => {
      elem.classList.toggle('key--hide', this.lang !== 'eng');
    });
    this.keyboardContent.querySelectorAll('.key__ru').forEach((elem) => {
      elem.classList.toggle('key--hide', this.lang !== 'ru');
    });
  }

  toggleLanguage() {
    this.lang = this.lang === 'ru' ? 'eng' : 'ru';
    this.setUpLangualge();
  }
}
