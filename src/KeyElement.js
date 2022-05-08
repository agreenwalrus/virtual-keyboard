export default class KeyElement {
  static getKeyElement(key) {
    const elem = document.createElement('button');
    elem.setAttribute('type', 'button');
    elem.innerHTML = key.eng;
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
      const altSymb = document.createElement('p');
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
