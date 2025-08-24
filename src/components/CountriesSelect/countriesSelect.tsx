import { useDispatch, useSelector } from 'react-redux';
import { selectCountry } from '../../store/countriesSlice';
import type { RootState } from '../../store/store';
import './countriesSelect.css';

type CountriesSelectProps = {
  error?: string;
};

export function CountriesSelect({ error }: CountriesSelectProps) {
  const dispatch = useDispatch();
  const countries = useSelector(
    (state: RootState) => state.countries.allCountries
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(selectCountry({ name: e.target.value }));
  };

  return (
    <div className="countries-container">
      <label htmlFor="country">Country:</label>
      <input
        list="countries"
        name="country"
        id="country"
        type="text"
        onChange={handleChange}
        autoComplete="off"
      />

      <datalist id="countries">
        {countries.map((country) => (
          <option key={country.name} value={country.name} />
        ))}
      </datalist>
      <span className="error">{error || ''}</span>
    </div>
  );
}
