import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';
import { createActions, initialState, reducer } from './ApplicationReducer';

export const AppplicationContext = createContext();

const AppplicationContextProvider = ({
  children,
}) => {
  const [data, dispatch] = useReducer(reducer, initialState);
  const actions = createActions(dispatch);
  return (
    <AppplicationContext.Provider
      value={{ data, actions }}
    >
      {children}
    </AppplicationContext.Provider>
  );
};

AppplicationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppplicationContextProvider;
