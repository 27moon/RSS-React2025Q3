import { useDispatch, useSelector } from 'react-redux';
import type { Character } from '../../services/api';
import './selectedItemsBlock.css';
import { unselectAll } from '../../store/selectedCardsSlice';
import { SaveButton } from '../SaveButton/saveButton';
import { ThemeContext } from '../../context/themeContext';
import { useContext } from 'react';
import './selectedItemsBlock.css';

export function SelectedItems() {
  const context = useContext(ThemeContext);

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: { selectedCards: { selected: Character[] } }) =>
      state.selectedCards.selected
  );

  if (selectedItems.length === 0) return null;

  if (!context) {
    return null;
  }

  const { theme } = context;

  const count = selectedItems.length;
  const text = `${count} item${count !== 1 ? 's' : ''} selected`;

  return (
    <div className="selected-items-wrapper">
      <div className="selected-items-txt">{text}</div>
      <div className="btns-wrapper">
        <button
          className={`unselect-btn ${theme}`}
          onClick={() => {
            dispatch(unselectAll());
          }}
        >
          Unselect all
        </button>
        <SaveButton />
      </div>
    </div>
  );
}
