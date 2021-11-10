import GoogleMapReact from 'google-map-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useContext, useEffect, useState } from 'react';
import { AppplicationContext } from '../../context/AppplicationContext';
import style from './Map.module.scss';
import PlaceThumbnail from '../places/PlaceThumbnail';
import { useGetFilteredPlaceData } from '../../hooks/useGetFilteredPlaceData';
import useDebounce from '../../hooks/useDebounce';


export default function Map() {
  const [defaultCenter, setDefaultCenter] = useState();
  const { data, actions } = useContext(AppplicationContext);
  const [internalCoordinate, setInternalCoordinate] = useState(data?.coordinatesData);

  const center = data?.coordinatesData?.center || internalCoordinate?.center || { lat: 0, lng: 0 };

  const filtedPlaceData = useGetFilteredPlaceData();

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

  const debouncedCoordinateValue = useDebounce(internalCoordinate, 600);

  useEffect(() => {
    actions.updateCoordinatesData(debouncedCoordinateValue); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedCoordinateValue]);

  return (
    <div className={style['map-container']}>
      {defaultCenter ? (
        <GoogleMapReact
          // eslint-disable-next-line no-undef
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY, language: navigator.language.substring(0, 2) }}
          // defaultCenter={defaultCenter}
          center={center}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
          onChange={(value) => { 
            // actions.updateCoordinatesData(value); 
            setInternalCoordinate(value);
          }}
        // onChildClick={(child) => {
        //   console.log(child);
        // }}
        >

          {filtedPlaceData.length && filtedPlaceData.map((place, index) => (
            place.latitude && place.longitude && (
              <PlaceThumbnail
                className={style.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={`place-${place.location_id}-${index}`}
                place={place}
                onClick={() => {
                  actions.updateCurrentSelectedPlace(place);
                }}
              />
            )


          ))}
        </GoogleMapReact>
      ) : (
        <div className={style.loading}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
