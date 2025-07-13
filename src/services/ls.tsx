import { Component } from 'react';

export class LS extends Component {
  static key = 'searchedChar';

  static saveLS(item: string): void {
    localStorage.setItem(LS.key, item);
  }

  static getLS(): string {
    return localStorage.getItem(LS.key) || '';
  }
}
