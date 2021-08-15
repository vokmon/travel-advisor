import { CircularProgress, Grid } from '@material-ui/core';
import { useContext } from 'react';
import { AppplicationContext } from '../../context/AppplicationContext';
import PlaceDetails from './PlaceDetails';
import style from './PlaceList.module.scss';

export default function PlaceList() {
  const { data } = useContext(AppplicationContext);
  const { loading, placesData } = data;
  return (
    <div className={style['place-list-container']}>
      {loading ? (
        <div className={style.loading}>
          <CircularProgress />
        </div>) :
        (
          <Grid container spacing={3} className={style['place-list']}>
            {placesData?.filter((place => Boolean(place.name))).map((place, i) => (
              <Grid item key={`place-${i}`} xs={12}>
                <PlaceDetails place={place} />
              </Grid>
            ))}
          </Grid>
        )
      }
    </div >
  );
}
