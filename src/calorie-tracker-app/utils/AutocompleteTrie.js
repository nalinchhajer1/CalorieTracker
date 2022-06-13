import {isValidElement} from '../../auth/redux/LoginConstants';

const WORD_INDICATOR = '*';

/**
 *
 */
export class AutocompleteTrie {
  constructor() {
    this.root = {};
    this.validChar = new Set('abcdefghijklmnopqrstuvwxyz 1234567890'.split(''));
  }

  setRoot(savedRoot) {
    this.root = savedRoot;
  }

  insert(word, id) {
    const lowerCaseSentence = word.toLowerCase();
    let pointer = this.root;
    for (let i = 0; i < lowerCaseSentence.length; i++) {
      let x = lowerCaseSentence[i];
      if (this.validChar.has(x)) {
        if (!pointer[x]) {
          pointer[x] = {};
        }
        pointer = pointer[x];
      }
    }
    pointer[WORD_INDICATOR] = id;
  }

  /**
   * Check if contains word
   *
   * @param pattern
   * @returns {boolean}
   */
  contains(pattern) {
    return this._contains(pattern, true);
  }

  startWith(pattern) {
    return this._contains(pattern, false);
  }

  remove(pattern) {
    return this._remove(pattern, 0, this.root);
  }

  /** remove word if found
   *
   * @param pattern
   * @param index
   * @param node
   * @private
   */
  _remove(pattern, index, node) {
    if (!node) {
      throw 'Pattern not found';
    }
    if (index === pattern.length) {
      delete node[WORD_INDICATOR];
    }
    if (index < pattern.length) {
      this._remove(pattern, index + 1, node[pattern[index]]);
    }
    if (node[WORD_INDICATOR]) {
      delete node[pattern[index]];
    }
  }

  words() {
    const arr = [];
    this._traverse(arr, this.root, '');
    return arr;
  }

  _traverse(output, node, prefix) {
    for (let x in node) {
      if (x === WORD_INDICATOR) {
        output.push(node[x]);
      } else {
        this._traverse(output, node[x], prefix + x);
      }
    }
  }

  autoComplete(pattern) {
    const arr = [];
    if (pattern.length === 0) {
      return arr;
    }
    let pointer = this._pointerToPattern(pattern);
    if (pointer === null) {
      return arr;
    }

    this._traverse(arr, pointer, pattern);
    return arr;
  }

  _pointerToPattern(pattern) {
    let pointer = this.root;
    for (let x of pattern.toLowerCase()) {
      if (this.validChar.has(x)) {
        if (pointer[x]) {
          pointer = pointer[x];
        } else {
          return null;
        }
      }
    }
    return pointer;
  }

  _contains(pattern, checkWordEnd = true) {
    let pointer = this.root;
    for (let x of pattern.toLowerCase()) {
      if (this.validChar.has(x)) {
        if (pointer[x]) {
          pointer = pointer[x];
        } else {
          return false;
        }
      }
    }
    if (checkWordEnd) {
      return !!pointer[WORD_INDICATOR];
    } else {
      return true;
    }
  }

  _randomText() {
    let pointer = this.root;
    let charPattern = '';
    // Finding pattern k level deep
    for (let i = 0; i < 3; i++) {
      const keys = Object.keys(pointer);
      const randomKey = keys[(Math.random() * keys.length) | 0];
      charPattern += randomKey;
      pointer = pointer[randomKey];
      if (!isValidElement(pointer)) {
        break;
      }
    }
    return this.autoComplete(charPattern)[0];
  }
}
