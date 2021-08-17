import { CssBaseline } from '@material-ui/core';
import { useEffect } from 'react';
import Signature from './utils/Signature';
import Main from './components/main/Main';
import AppplicationContextProvider from './context/AppplicationContext';

function App() {
  useEffect(() => {
    Signature.signToConsole();

  }, []);

  return (
    <>
      <CssBaseline />
      <AppplicationContextProvider>
        <Main />
      </AppplicationContextProvider>
    </>
  );
}

export default App;
