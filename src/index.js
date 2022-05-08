import Keyboard from './Keyboard';
import KEYBOARD_CONTENT from './data/keyboard-content';
import {} from './sass/main.scss';
import Text from './Text';

const TEXTAREA = new Text();
const KEYBOARD = new Keyboard(KEYBOARD_CONTENT, TEXTAREA);

function populateWindow() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const header = document.createElement('h1');
  header.classList.add('header');
  header.innerHTML = 'RSS Виртуальная клавиатура';
  wrapper.appendChild(header);

  wrapper.appendChild(TEXTAREA.getTextArea());

  wrapper.appendChild(KEYBOARD.getKeyboard());

  const description = document.createElement('div');
  description.classList.add('description');

  const p1 = document.createElement('p');
  p1.innerHTML = 'Клавиатура создана в операционной системе Windows';
  description.appendChild(p1);
  const p2 = document.createElement('p');
  p2.innerHTML = 'Для переключения языка комбинация: левыe ctrl + alt';
  description.appendChild(p2);

  wrapper.appendChild(description);

  document.body.appendChild(wrapper);
}

function updateTextArea(button) {
  let content = TEXTAREA.getContent();

  const element = button.firstChild.data || ' ';

  if ((element || ' ').length === 1) {
    content += KEYBOARD.capsLock ? element.toUpperCase() : element.toLowerCase();
  } else if (element === 'Tab') {
    // eslint-disable-next-line no-tabs
    content += '	';
  } else if (element === 'ENTER') {
    content += '\n';
  } else if (element === 'Backspace') {
    content = content.slice(0, -1);
  } else if (element === 'ArrowUp') {
    content += '▲';
  } else if (element === 'ArrowDown') {
    content += '▼';
  } else if (element === 'ArrowLeft') {
    content += '◄';
  } else if (element === 'ArrowRight') {
    content += '►';
  }
  if (element === 'Caps Lock') {
    KEYBOARD.capsLock = 1 - KEYBOARD.capsLock;
    button.classList.toggle('key--active', KEYBOARD.capsLock);
  }

  TEXTAREA.setContent(`${content}`);
}

window.addEventListener('DOMContentLoaded', () => {
  populateWindow();

  document.body.addEventListener('keydown', (e) => {
    e.preventDefault();
    const button = document.getElementById(e.code);
    if (button === null) {
      return;
    }

    button.classList.add('key--pressed');
    updateTextArea(button);
  });

  document.body.addEventListener('keyup', (e) => {
    const button = document.getElementById(e.code);
    if (button === null) { return; }
    button.classList.remove('key--pressed');
  });

  document.querySelectorAll('.key').forEach((elem) => {
    elem.addEventListener('click', () => {
      updateTextArea(elem);
    });
  });
});
