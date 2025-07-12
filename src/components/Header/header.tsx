import { Component } from 'react';
import Search from '../Search/search';
import { Api } from '../../services/api';

class Header extends Component {
  async render() {
    await Api.getAllCharacters();
    await Api.searchCharactersByName('Rick Sanchez');
    return (
      <header>
        header
        <Search />
      </header>
    );
  }
}

export default Header;
