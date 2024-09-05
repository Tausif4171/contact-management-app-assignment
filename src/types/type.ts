export type CountryInfo = {
  _id: number;
  iso2: string;
  iso3: string;
  lat: number;
  long: number;
  flag: string;
};

export type CountryData = {
  country: string;
  countryInfo: CountryInfo;
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
};
