import { Component } from 'react';
import { Api, type AllCharacters, type Character } from '../../services/api';
import { LS } from '../../services/ls';

type SearchProps = {
  onSearchResults: (characters: Character[]) => void;
  onLoading: (loading: boolean) => void;
};

type SearchState = {
  searchedName: string;
  loading: boolean;
  error: string | null;
};

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchedName: LS.getLS(),
      loading: false,
      error: null,
    };
  }

  getCharacters = async (name: string) => {
    this.setState({ loading: true, error: null });
    this.props.onLoading(true);
    try {
      let data: AllCharacters;

      if (name) {
        data = await Api.searchCharactersByName(name);
      } else {
        data = await Api.getAllCharacters();
      }

      this.props.onSearchResults(data.results);
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message });
      } else {
        this.setState({ error: 'no such character' });
      }
    } finally {
      this.setState({ loading: false });
      this.props.onLoading(false);
    }
  };

  componentDidMount() {
    this.getCharacters(this.state.searchedName);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchedName: e.target.value });
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleSearch = () => {
    const trimmedValue = this.state.searchedName.trim();

    LS.saveLS(trimmedValue);
    this.getCharacters(trimmedValue);
  };

  render() {
    const { searchedName, error } = this.state;

    return (
      <div>
        <input
          type="text"
          value={searchedName}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Search..."
        />
        <button onClick={this.handleSearch}>Search</button>

        {error && <div>Error occurred: {error}</div>}
      </div>
    );
  }
}
