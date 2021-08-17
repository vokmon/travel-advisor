/* eslint-disable */
import axios from 'axios';
import mockData from './mockData.json';
import mockDataTh from './mockDataTh.json';

const headers = {
  'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
  'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
};

export default {
  getPlacesData: async (type, bounds, locale) => {
    const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
    const { sw, ne } = bounds;
    const { currency, lang } = locale;
    const options = {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        currency,
        lang,
      },
      headers,
    };

    const { data: { data }} = await axios.get(URL, options);
    // const { data } = lang === 'th_TH' ? mockDataTh : mockData;
    return data;
  }
};
