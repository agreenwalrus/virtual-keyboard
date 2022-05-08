import Keyboard from './Keyboard';
import KEYBOARD_CONTENT from './data/keyboard-content';
import {} from './sass/main.scss';
import Text from './Text';

function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
const TEXTAREA = new Text();
const KEYBOARD = new Keyboard(KEYBOARD_CONTENT, TEXTAREA, getCookie('keyboardLang') || 'eng');

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

  let element = button.querySelector(`.key__${KEYBOARD.lang}`).innerHTML || ' ';
  if (KEYBOARD.shiftPressed) {
    element = button.querySelector('.key__double-right').innerHTML || element;
  }

  if (element.length === 1) {
    if (Boolean(KEYBOARD.capsLock) !== Boolean(KEYBOARD.shiftPressed)) {
      content += element.toUpperCase();
    } else {
      content += element.toLowerCase();
    }
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

  TEXTAREA.setContent(`${content}`);
}

function clickServiceButton(button, isActivated) {
  const element = button.querySelector(`.key__${KEYBOARD.lang}`).innerHTML || ' ';

  if (element === 'Caps Lock' && isActivated) {
    KEYBOARD.capsLock = 1 - KEYBOARD.capsLock;
    button.classList.toggle('key--active', KEYBOARD.capsLock);
  } else if (element === 'Shift') {
    KEYBOARD.shiftPressed = isActivated;
  } else if (element === 'Ctrl') {
    KEYBOARD.ctrlPressed = isActivated;
  } else if (element === 'Alt') {
    if (KEYBOARD.ctrlPressed && isActivated) {
      KEYBOARD.toggleLanguage();
      document.cookie = `keyboardLang=${KEYBOARD.lang}; SameSite=None; Secure`;
    }
  }
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
    clickServiceButton(button, 1);
  });

  document.body.addEventListener('keyup', (e) => {
    const button = document.getElementById(e.code);
    if (button === null) { return; }

    clickServiceButton(button, 0);
    button.classList.remove('key--pressed');
  });

  document.querySelectorAll('.key').forEach((elem) => {
    elem.addEventListener('mousedown', () => {
      updateTextArea(elem);
      clickServiceButton(elem, 1);
    });

    elem.addEventListener('mouseup', (event) => {
      clickServiceButton(event.target, 0);
    });
  });
});
