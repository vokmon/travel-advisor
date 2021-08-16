import { useContext, useEffect } from 'react';
import { AppplicationContext } from '../context/AppplicationContext';
import PlaceService from '../services/PlaceService';
import Logger from '../utils/Logger';
import useGetRemoteServiceWrapper from './useGetRemoteServiceWrapper';

export const useGetPlaceData = () => {
  const {
    callRemoteServiceWrapper,
  } = useGetRemoteServiceWrapper();

  const { data, actions } = useContext(AppplicationContext);

  useEffect(() => {
    if (!data.coordinatesData || !data.coordinatesData.bounds || !data.type || !data.locale) {
      return;
    }
    callRemoteServiceWrapper(async () => {
      try {
        await actions.updateLoading(true);
        const { type, coordinatesData: { bounds }, locale } = data;
        const result = await PlaceService.getPlacesData(type, bounds, locale);
        actions.updatePlacesData(result, false);
      } catch (e) {
        Logger.logError(e);
        actions.updateLoading(false);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.type, data.locale, data.coordinatesData]);
};
