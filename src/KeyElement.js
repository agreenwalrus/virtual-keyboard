export default class KeyElement {
  static getKeyElement(key) {
    const elem = document.createElement('button');
    elem.setAttribute('type', 'button');

    const eng = document.createElement('span');
    eng.classList.add('key__eng');
    eng.innerHTML = key.eng;
    elem.appendChild(eng);

    const ru = document.createElement('span');
    ru.classList.add('key__ru');
    ru.innerHTML = key.ru || key.eng;
    elem.appendChild(ru);

    elem.setAttribute('id', key.eventCode);
    elem.classList.add('key');
    switch (key.width) {
    case 2:
      elem.classList.add('key--wide');
      break;
    case 3:
      elem.classList.add('key--wider');
      break;
    case 4:
      elem.classList.add('key--widest');
      break;
    default:
      break;
    }

    if (key.altSymbol !== '') {
      const altSymb = document.createElement('span');
      altSymb.classList.add('key__double-right');
      altSymb.innerHTML = key.altSymb;
      elem.appendChild(altSymb);
    }

    if (key.dark) {
      elem.classList.add('key--service');
    }

    if (key.type === 'c') {
      elem.classList.add('key--activate');
    }

    return elem;
  }
}
