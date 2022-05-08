import Keyboard from './Keyboard';
import KEYBOARD_CONTENT from './data/keyboard-content';
import {} from './sass/main.scss';
import Text from './Text';

const TEXTAREA = new Text();

function populateWindow() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const header = document.createElement('h1');
  header.classList.add('header');
  header.innerHTML = 'RSS Виртуальная клавиатура';
  wrapper.appendChild(header);

  wrapper.appendChild(TEXTAREA.getTextArea());

  wrapper.appendChild((new Keyboard(KEYBOARD_CONTENT, TEXTAREA)).getKeyboard());

  const description = document.createElement('div');
  description.classList.add('description');

  const p1 = document.createElement('p');
  p1.innerHTML = 'Клавиатура создана в операционной системе Windows';
  description.appendChild(p1);
  const p2 = document.createElement('p');
  p2.innerHTML = 'Для переключения языка комбинация: левыe alt + shift';
  description.appendChild(p2);

  wrapper.appendChild(description);

  document.body.appendChild(wrapper);
}

window.addEventListener('DOMContentLoaded', () => {
  populateWindow();

  document.body.addEventListener('keydown', (e) => {
    console.log(e.Key);
    const button = document.getElementById(e.code);
    if (button === null) { return; }
    button.classList.add('key--pressed');

    const content = TEXTAREA.getContent();
    TEXTAREA.setContent(`${content}${e.key}`);
  });

  document.body.addEventListener('keyup', (e) => {
    const button = document.getElementById(e.code);
    if (button === null) { return; }
    button.classList.remove('key--pressed');
  });
});
