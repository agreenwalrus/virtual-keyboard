export default class Text {
  #length = 97;

  #content = '';

  #textArea = null;

  getTextArea() {
    const text = document.createElement('textarea');
    text.setAttribute('name', 'Text');
    text.setAttribute('id', 'text');
    text.setAttribute('rows', 8);
    text.classList.add('textarea');
    this.#textArea = text;
    return text;
  }

  getContent() {
    return this.#content;
  }

  setContent(content) {
    this.#content = content;
    this.#textArea.innerHTML = content;
  }
}
