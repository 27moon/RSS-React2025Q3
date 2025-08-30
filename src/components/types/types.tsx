export type YearData = {
  year?: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: number | undefined;
};

export type Country = {
  iso_code?: string;
  data: YearData[];
};

export type CO2Data = {
  [countryName: string]: Country;
};
