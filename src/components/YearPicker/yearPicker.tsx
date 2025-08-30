type YearPickerProps = {
  years: (number | undefined)[];
  selectedYear: number;
  onYearChange: (year: number) => void;
};

export function YearPicker({
  years,
  selectedYear,
  onYearChange,
}: YearPickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onYearChange(Number(e.target.value));
  };

  return (
    <div className="year-selector">
      <label>
        Select year:{' '}
        <select value={selectedYear} onChange={handleChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
