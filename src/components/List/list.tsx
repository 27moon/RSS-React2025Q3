import './list.css';
import { co2Resource } from '../helpers/getData';
import { useState } from 'react';
import { YearPicker } from '../YearPicker/yearPicker';
import { CO2Table } from '../Table/table';
import { ColumnsPicker } from '../ColumnsPicker/columnsPicker';
import { extraColumns } from '../../helpers/helpers';

export default function List() {
  const data = co2Resource.read();
  const countries = Object.keys(data);
  const years = data[countries[0]].data.map((el) => el.year);

  const [selectedYear, setSelectedYear] = useState(2023);
  const [prevYear, setPrevYear] = useState<number | null>(null);
  const [highlight, setHighlight] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  const handleYearChange = (year: number) => {
    setPrevYear(selectedYear);
    setSelectedYear(Number(year));
    setHighlight(true);

    setTimeout(() => {
      setHighlight(false);
    }, 2000);
  };

  const toggleColumn = (col: string) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
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
      <button onClick={() => setIsModalOpen(true)}>Select extra columns</button>
      {isModalOpen && (
        <ColumnsPicker
          extraColumns={extraColumns}
          selectedColumns={selectedColumns}
          toggleColumn={toggleColumn}
          close={() => setIsModalOpen(false)}
        />
      )}

      <CO2Table
        data={data}
        countries={countries}
        selectedYear={selectedYear}
        prevYear={prevYear}
        highlight={highlight}
        selectedColumns={selectedColumns}
      />
    </>
  );
}
