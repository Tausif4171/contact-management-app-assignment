import axios from "axios";
import { CountryData } from "../types/type";

const BASE_URL = "https://disease.sh/v3/covid-19";

type HistoricalData = {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
};

export const fetchWorldwideData = async () => {
  const { data } = await axios.get(`${BASE_URL}/all`);
  return data;
};

export const fetchCountryData = async (): Promise<CountryData[]> => {
  const { data } = await axios.get(`${BASE_URL}/countries`);
  return data;
};

export const fetchGraphData = async (): Promise<HistoricalData> => {
  const { data } = await axios.get(`${BASE_URL}/historical/all?lastdays=all`);
  return data;
};
