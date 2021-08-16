import { LOCALES, PLACE_TYPE, RATING_TYPE } from '../constants/Constants';
import Logger from '../utils/Logger';

export const initialState = {
  loading: true,
  type: PLACE_TYPE[0].value,
  rating: RATING_TYPE[0].value,
  placesData: [],
  coordinatesData: null,
  locale: {
    ...LOCALES.th,
  },
  currentSelectedPlace: null,
};

const actionName = {
  UPDATE_DATA_LOADING: 'UPDATE_DATA_LOADING',
  UPDATE_TYPE: 'UPDATE_TYPE',
  UPDATE_RATING: 'UPDATE_RATING',
  UPDATE_PLACES_DATA: 'UPDATE_PLACES_DATA',
  UPDATE_COORDINATES_DATA: 'UPDATE_COORDINATES_DATA',
  UPDATE_LOCALE_DATA: 'UPDATE_LOCALE_DATA',
  UPDATE_CURRENT_SELECTED_PLACE: 'UPDATE_CURRENT_SELECTED_PLACE',
};

const reducerFunc = (state, action) => {
  switch (action.type) {
    case actionName.UPDATE_DATA_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionName.UPDATE_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case actionName.UPDATE_RATING:
      return {
        ...state,
        rating: action.payload,
      };
    case actionName.UPDATE_PLACES_DATA:
      return {
        ...state,
        placesData: action.payload.placesData,
        loading: action.payload.loading,
      };
    case actionName.UPDATE_COORDINATES_DATA:
      return {
        ...state,
        coordinatesData: action.payload,
      };
    case actionName.UPDATE_LOCALE_DATA:
      return {
        ...state,
        locale: action.payload,
      };
    case actionName.UPDATE_CURRENT_SELECTED_PLACE:
      return {
        ...state,
        currentSelectedPlace: action.payload,
      };
    default: return state;
  }
};

export const reducer = (state, action) => {
  const newState = reducerFunc(state, action);
  Logger.logWhenDebugModeIsOn({
    OLD_STATE: state,
    ACTION: action,
    NEW_STATE: newState,
  });
  return newState;
};

export const createActions = (dispatch) => {
  return {
    updateLoading: (isLoading) => {
      return dispatch({
        type: actionName.UPDATE_DATA_LOADING,
        payload: isLoading,
      });
    },
    updateType: (type) => {
      return dispatch({
        type: actionName.UPDATE_TYPE,
        payload: type,
      });
    },
    updateRating: (rating) => {
      return dispatch({
        type: actionName.UPDATE_RATING,
        payload: rating,
      });
    },
    updatePlacesData: (placesData, loading = false) => {
      return dispatch({
        type: actionName.UPDATE_PLACES_DATA,
        payload: {
          placesData,
          loading,
        },
      });
    },
    updateCoordinatesData: (coordinatesData) => {
      return dispatch({
        type: actionName.UPDATE_COORDINATES_DATA,
        payload: coordinatesData,
      });
    },
    updateLocaleData: (localeData) => {
      return dispatch({
        type: actionName.UPDATE_LOCALE_DATA,
        payload: localeData,
      });
    },
    updateCurrentSelectedPlace: (currentSelectedPlace) => {
      return dispatch({
        type: actionName.UPDATE_CURRENT_SELECTED_PLACE,
        payload: currentSelectedPlace,
      });
    },
  };
};
