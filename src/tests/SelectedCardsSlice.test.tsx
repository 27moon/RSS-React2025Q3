import reducer, {
  addCard,
  removeCard,
  unselectAll,
} from '../store/selectedCardsSlice';
import { item } from './mockData';

describe('SelectedCardsSlice', () => {
  it('Adds a card', () => {
    const state = reducer({ selected: [] }, addCard(item));

    expect(state.selected).toHaveLength(1);
    expect(state.selected[0]).toEqual(item);
  });

  it('Removes card', () => {
    const state = reducer({ selected: [item] }, removeCard(item.id));

    expect(state.selected).toHaveLength(0);
  });

  it('Unselects all', () => {
    const state = reducer({ selected: [item] }, unselectAll());

    expect(state.selected).toHaveLength(0);
  });
});
