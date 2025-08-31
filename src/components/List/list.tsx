import './list.css';
import { co2Resource } from '../helpers/getData';
import { useCallback, useMemo, useState } from 'react';
import { YearPicker } from '../YearPicker/yearPicker';
import { CO2Table } from '../Table/table';
import { ColumnsPicker } from '../ColumnsPicker/columnsPicker';
import { extraColumns } from '../../helpers/helpers';
import { Search } from '../Search/search';
import { Sort } from '../Sort/sort';

export default function List() {
  const data = co2Resource.read();
  const countries = Object.keys(data);
  const years = data[countries[0]].data.map((el) => el.year);

  const [selectedYear, setSelectedYear] = useState(2023);
  const [prevYear, setPrevYear] = useState<number | null>(null);
  const [highlight, setHighlight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const [search, setSearch] = useState('');

  const [sortOption, setSortOption] = useState<
    'name-asc' | 'name-desc' | 'pop-asc' | 'pop-desc'
  >('name-asc');

  function getPopulation(country: string) {
    const yearData = data[country].data.find((el) => el.year === selectedYear);

    if (yearData && yearData.population) {
      return yearData.population;
    }
    return 0;
  }

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) =>
        country.toLowerCase().startsWith(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOption === 'name-asc') return a.localeCompare(b);
        if (sortOption === 'name-desc') return b.localeCompare(a);

        const populationA = getPopulation(a);
        const populationB = getPopulation(b);

        if (sortOption === 'pop-desc') return populationB - populationA;
        if (sortOption === 'pop-asc') return populationA - populationB;

        return 0;
      });
  }, [countries, search, sortOption, selectedYear]);

  const memoSelectedColumns = useMemo(() => selectedColumns, [selectedColumns]);

  const handleYearChange = useCallback(
    (year: number) => {
      setPrevYear(selectedYear);
      setSelectedYear(Number(year));
      setHighlight(true);

      setTimeout(() => {
        setHighlight(false);
      }, 2000);
    },
    [selectedYear]
  );

  const toggleColumn = (col: string) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((el) => el !== col) : [...prev, col]
    );
  };

  return (
    <>
      <h2>CO2 Data</h2>
      <YearPicker
        years={years}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      <div className="controlls-wrapper">
        <Search value={search} onChange={setSearch} />
        <Sort value={sortOption} onChange={setSortOption} />
        <button onClick={() => setIsModalOpen(true)}>
          Select extra columns
        </button>
      </div>

      {isModalOpen && (
        <ColumnsPicker
          extraColumns={extraColumns}
          selectedColumns={memoSelectedColumns}
          toggleColumn={toggleColumn}
          close={() => setIsModalOpen(false)}
        />
      )}
      <CO2Table
        data={data}
        countries={filteredCountries}
        selectedYear={selectedYear}
        prevYear={prevYear}
        highlight={highlight}
        selectedColumns={memoSelectedColumns}
      />
    </>
  );
}
