import { useState } from 'react';

const useGetRemoteServiceWrapper = (initLoadingState = false) => {
  const [state, setState] = useState({
    loading: initLoadingState,
  });
  const callRemoteServiceWrapper = async (func) => {
    try {
      setState({
        loading: true,
      });
      await func();
      setState({
        loading: false,
      });
      return Promise.resolve();
    } catch (error) {
      console.error({
        ERROR: error,
      });
      setState({
        loading: false,
      });
      return Promise.reject();
    }
  };

  return {
    loading: state.loading,
    callRemoteServiceWrapper,
  };
};

export default useGetRemoteServiceWrapper;
