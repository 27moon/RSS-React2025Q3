import './search.css';

type SearchProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export function Search({ value, onChange }: SearchProps) {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="find a country"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
