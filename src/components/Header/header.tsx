import { Component } from 'react';
import { Search } from '../Search/search';
import type { Character } from '../../services/api';

type HeaderProps = {
  onSearchResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
};

export class Header extends Component<HeaderProps> {
  render() {
    return (
      <header>
        <Search
          onSearchResults={this.props.onSearchResults}
          onLoading={this.props.onLoading}
        />
      </header>
    );
  }
}
