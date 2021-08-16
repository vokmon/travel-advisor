import { useContext, useMemo } from 'react';
import { AppplicationContext } from '../context/AppplicationContext';

export const useGetFilteredPlaceData = () => {
  const { data } = useContext(AppplicationContext);
  const { placesData, rating } = data;
  const result = useMemo(() => {
    const filtedPlaceData = placesData?.filter((place => Boolean(place.name) && place.latitude && place.longitude && Number(place.rating) > rating));
    return filtedPlaceData || [];
  }, [placesData, rating]);

  return result;
};
