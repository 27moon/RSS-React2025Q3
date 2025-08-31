import type { CO2Data } from '../types/types';
import '../List/list.css';
import React from 'react';

type CO2TableProps = {
  data: CO2Data;
  countries: string[];
  selectedYear: number;
  prevYear: number | null;
  highlight: boolean;
  selectedColumns: string[];
};

const basicColumns = [
  'country',
  'ISO',
  'year',
  'population',
  'CO2',
  'CO2 per Capita',
];

export const CO2Table = React.memo(function CO2Table({
  data,
  countries,
  selectedYear,
  prevYear,
  highlight,
  selectedColumns,
}: CO2TableProps) {
  return (
    <div className="table-wrapper">
      <div className="header-row">
        {basicColumns.map((column) => (
          <div
            className={`cell ${
              column === 'ISO' ? 'iso' : column === 'year' ? 'year' : ''
            }`}
            key={column}
          >
            {column}
          </div>
        ))}

        {selectedColumns.map((column) => (
          <div className="cell" key={column}>
            {column}
          </div>
        ))}
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
            <div className="cell iso">{country.iso_code ?? 'N/A'}</div>
            <div
              className={`cell year ${highlight && changed('year') ? 'highlight' : ''}`}
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
              className={`cell ${
                highlight && changed('co2_per_capita') ? 'highlight' : ''
              }`}
            >
              {yearData?.co2_per_capita ?? 'N/A'}
            </div>

            {selectedColumns.map((col) => (
              <div
                className={`cell ${highlight && changed(col) ? 'highlight' : ''}`}
                key={col}
              >
                {yearData?.[col] ?? 'N/A'}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
});
