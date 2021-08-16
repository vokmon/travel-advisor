import { CircularProgress, Grid } from '@material-ui/core';
import { useContext, useEffect, useRef } from 'react';
import { AppplicationContext } from '../../context/AppplicationContext';
import { useGetFilteredPlaceData } from '../../hooks/useGetFilteredPlaceData';
import PlaceDetails from './PlaceDetails';
import style from './PlaceList.module.scss';

export default function PlaceList() {
  const { data, actions } = useContext(AppplicationContext);
  const { loading, currentSelectedPlace } = data;
  const filtedPlaceData = useGetFilteredPlaceData();

  const placeDetailsRefs = useRef({});
  useEffect(() => {
    if (currentSelectedPlace === null) {
      return;
    }
    const index = filtedPlaceData.findIndex((p) => p === currentSelectedPlace);
    const selectedPlace = placeDetailsRefs.current[index];

    if (selectedPlace) {
      setTimeout(() => {
        selectedPlace.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedPlace]);

  useEffect(() => {
    actions.updateCurrentSelectedPlace(null);
    placeDetailsRefs.current[0] && placeDetailsRefs.current[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtedPlaceData]);

  return (
    <div className={style['place-list-container']}>
      {loading ? (
        <div className={style.loading}>
          <CircularProgress />
        </div>) :
        (
          <Grid container spacing={3} className={style['place-list']}>
            {filtedPlaceData.map((place, i) => (
              <Grid item key={`place-${i}`} xs={12}>
                <PlaceDetails place={place} ref={(r) => {
                  placeDetailsRefs.current[i] = r;
                }} />
              </Grid>
            ))}
          </Grid>
        )
      }
    </div >
  );
}
