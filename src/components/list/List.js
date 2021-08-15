import { Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { useContext } from 'react';
import { LOCALES, PLACE_TYPE, RATING_TYPE } from '../../constants/Constants';
import { AppplicationContext } from '../../context/AppplicationContext';

import PlaceList from '../places/PlaceList';
import style from './List.module.scss';

const localeOptions = [
  LOCALES.th,
  LOCALES.en_US,
];

export default function List() {
  const { data, actions } = useContext(AppplicationContext);
  return (
    <div className={style['list-container']}>
      <Typography variant='h6'>
        Restaurants, Hotels & Attractions around you
      </Typography>
      <div className={style['form-container']}>
        <FormControl className={style['form-control-type']}>
          <InputLabel>Type</InputLabel>
          <Select value={data.type} onChange={(e) => { actions.updateType(e.target.value); }}>
            {PLACE_TYPE.map((m) => (
              <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={style['form-control-rating']}>
          <InputLabel>Rating</InputLabel>
          <Select value={data.rating} onChange={(e) => { actions.updateRating(e.target.value); }}>
            {RATING_TYPE.map((m) => (
              <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={style['form-control-locale']}>
          <InputLabel>Language</InputLabel>
          <Select value={data.locale.key} onChange={(e) => { actions.updateLocaleData(LOCALES[e.target.value]); }}>
            {localeOptions.map((m) => (
              <MenuItem key={m.key} value={m.key}>{m.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <PlaceList />

    </div>
  );
}
