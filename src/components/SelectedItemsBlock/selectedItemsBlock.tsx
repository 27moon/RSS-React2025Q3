import { useSelector } from 'react-redux';
import type { Character } from '../../services/api';
import './selectedItemsBlock.css';

export function SelectedItems() {
  const selectedItems = useSelector(
    (state: { selectedCards: { selected: Character[] } }) =>
      state.selectedCards.selected
  );

  if (selectedItems.length === 0) return null;

  const count = selectedItems.length;
  const text = `${count} item${count !== 1 ? 's' : ''} selected`;

  return (
    <div className="selected-items-wrapper">
      <div className="selected-items-txt">{text}</div>
      <div className="btns-wrapper">
        <button>Unselect all</button>
        <button>Download</button>
      </div>
    </div>
  );
}
