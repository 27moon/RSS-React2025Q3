import './sort.css';
type SortOption = 'name-asc' | 'name-desc' | 'pop-desc' | 'pop-asc';

type SortProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export function Sort({ value, onChange }: SortProps) {
  return (
    <div className="sort-wrapper">
      <label htmlFor="sort">Sort by: </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <option value="name-asc">Name (A - Z)</option>
        <option value="name-desc">Name (Z - A)</option>
        <option value="pop-desc">Population (High - Low)</option>
        <option value="pop-asc">Population (Low - High)</option>
      </select>
    </div>
  );
}
