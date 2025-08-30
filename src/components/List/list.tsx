import './list.css';
import { co2Resource } from '../helpers/getData';
import { useState } from 'react';
import { YearPicker } from '../YearPicker/yearPicker';

export default function List() {
  const data = co2Resource.read();
  const countries = Object.keys(data);
  const years = data[countries[0]].data.map((el) => el.year);

  const [selectedYear, setSelectedYear] = useState(2023);
  const [prevYear, setPrevYear] = useState<number | null>(null);
  const [highlight, setHighlight] = useState(false);

  const handleYearChange = (year: number) => {
    setPrevYear(selectedYear);
    setSelectedYear(Number(year));
    setHighlight(true);

    setTimeout(() => {
      setHighlight(false);
    }, 2000);
  };

  return (
    <>
      <h2>CO2 Data</h2>
      <YearPicker
        years={years}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      <div className="table-wrapper">
        <div className="header-row">
          <div className="cell">Country</div>
          <div className="cell">ISO</div>
          <div className="cell">Year</div>
          <div className="cell">Population</div>
          <div className="cell">CO2</div>
          <div className="cell">CO2 per Capita</div>
        </div>

        {countries.map((el) => {
          const country = data[el];

          const yearData = country.data.find((el) => el.year === selectedYear);

          const prevYearData = country.data.find((el) => el.year === prevYear);

          const changed = (cellName: string) => {
            if (!prevYearData) return false;
            return yearData?.[cellName] !== prevYearData?.[cellName];
          };

          return (
            <div className="row" key={el}>
              <div className="cell country">{el}</div>
              <div className="cell">{country.iso_code ?? 'N/A'}</div>
              <div
                className={`cell ${highlight && changed('year') ? 'highlight' : ''}`}
              >
                {yearData?.year ?? 'N/A'}
              </div>
              <div
                className={`cell ${highlight && changed('population') ? 'highlight' : ''}`}
              >
                {yearData?.population?.toLocaleString() ?? 'N/A'}
              </div>
              <div
                className={`cell ${highlight && changed('co2') ? 'highlight' : ''}`}
              >
                {yearData?.co2 ?? 'N/A'}
              </div>
              <div
                className={`cell ${highlight && changed('co2_per_capita') ? 'highlight' : ''}`}
              >
                {yearData?.co2_per_capita ?? 'N/A'}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
