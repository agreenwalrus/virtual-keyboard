export default class Key {
  /**
   *
   * @param {string} eng representation at English key
   * @param {Function} eventHandler
   * @param {string} type a - adds, t - translated, e - edits, n - does nothing, c - caps lock
   * @param {string} ru representation at Russian key
   * @param {*} altSymbol alternative value at the left corner
   * @param {*} translatedSymbol
   * @param {*} width
   */

  constructor(eng, eventCode, type, dark = true, ru = '', altSymbol = '', translatedSymbol = '', width = 1) {
    this.eng = eng;
    this.ru = ru;
    this.eventCode = eventCode;
    this.altSymb = altSymbol;
    this.translatedSymbol = translatedSymbol;
    this.width = width;
    this.type = type;
    this.dark = dark;
  }
}
