import { type CO2Data } from '../types/types';

export const co2Resource = (() => {
  let data: CO2Data | null;

  const promise = fetch('./src/data/co2-data.json')
    .then((res) => res.json())
    .then((json: CO2Data) => {
      data = json;
    });

  return {
    read() {
      if (!data) throw promise;
      return data;
    },
  };
})();
