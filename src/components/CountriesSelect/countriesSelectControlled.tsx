import { useDispatch, useSelector } from 'react-redux';
import { selectCountry } from '../../store/countriesSlice';
import type { RootState } from '../../store/store';
import { useState } from 'react';
import './countriesSelect.css';

type CountriesSelectProps = {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  error?: string;
};

export function CountriesSelectControlled({
  value,
  onChange,
  onBlur,
  error,
}: CountriesSelectProps) {
  const dispatch = useDispatch();
  const countries = useSelector(
    (state: RootState) => state.countries.allCountries
  );

  const [showList, setShowList] = useState(false);

  const filtered = countries.filter((country) =>
    country.name.toLocaleLowerCase().startsWith(value.toLowerCase())
  );

  const handleSuggestions = (countryName: string) => {
    dispatch(selectCountry({ name: countryName }));
    onChange(countryName);
    setShowList(false);
  };

  return (
    <div className="countries-container">
      <label htmlFor="country">Country:</label>
      <input
        value={value}
        name="country"
        id="country"
        type="text"
        onFocus={() => setShowList(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setShowList(true);
        }}
        onBlur={onBlur}
        autoComplete="off"
      ></input>

      {showList && filtered.length > 0 && (
        <ul id="countries" className="countries-list">
          {filtered.map((country) => (
            <li
              className="country"
              key={country.name}
              onMouseDown={() => handleSuggestions(country.name)}
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}
      <span className="error">{error || ''}</span>
    </div>
  );
}
