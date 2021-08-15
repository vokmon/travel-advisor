import GoogleMapReact from 'google-map-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useContext, useEffect, useState } from 'react';
import { AppplicationContext } from '../../context/AppplicationContext';
import style from './Map.module.scss';

export default function Map() {
  const [defaultCenter, setDefaultCenter] = useState();

  const { data, actions } = useContext(AppplicationContext);
  const center = data?.coordinatesData?.center || { lat: 0, lng: 0 };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      const cooridates = {
        lat: latitude,
        lng: longitude,
      };
      actions.updateCoordinatesData({
        center: cooridates,
      });
      setDefaultCenter(cooridates);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style['map-container']}>
      {defaultCenter ? (
        <GoogleMapReact
          // eslint-disable-next-line no-undef
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY, language: navigator.language.substring(0, 2) }}
          defaultCenter={defaultCenter}
          center={center}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
          onChange={(value) => { actions.updateCoordinatesData(value); }}
          onChildClick={() => { }}
        >

        </GoogleMapReact>
      ) : (
        <div className={style.loading}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
