import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import { Autocomplete } from '@react-google-maps/api';
import SearchIcon from '@material-ui/icons/Search';
import style from './Header.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AppplicationContext } from '../../context/AppplicationContext';

function setupCallback(script, callback) {
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => {
      callback();
    };
  }
}

const loadScript = (url, callback, id) => {
  let script;
  if (document.getElementById(id)) {
    // If the script already exists then add the new callback to the existing one
    script = document.getElementById(id);
    const oldFunc = script.onload;
    setupCallback(script, () => {
      oldFunc && oldFunc();
      callback();
    });
  } else {
    // If the script doesn't exists then create it
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.setAttribute('id', id);
    setupCallback(script, callback);
    document.getElementsByTagName('head')[0].appendChild(script);
  }
};

export default function Header() {
  const { actions } = useContext(AppplicationContext);
  const [autocomplete, setAutocomplete] = useState(null);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    loadScript(
      // eslint-disable-next-line no-undef
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&libraries=places`,
      () => { setIsReady(true); },
      '__googleMapsScriptId',
    );
  }, []);
  const handleOnLoad = (autoC) => setAutocomplete(autoC);

  const handleOnPlaceChanged = () => {
    const location = autocomplete?.getPlace()?.geometry?.location;
    if (location) {
      const lat = location.lat();
      const lng = location.lng();
      actions.updateCoordinatesData({
        center: {
          lat,
          lng,
        }
      });
    }
  };

  return (
    <AppBar className={style['header-container']} position='static'>
      <Toolbar className={style.toolbar}>
        <Box display='flex' className={style['search-container']}>
          {isReady && (
            <Autocomplete onLoad={handleOnLoad} onPlaceChanged={handleOnPlaceChanged}>
              <div className={style.search}>
                <div className={style.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase fullWidth placeholder='Search a new place ...' className={style.input} />
              </div>
            </Autocomplete>
          )}

        </Box>
        <Typography variant='h5' className={style.title}>
          Travel Advisor
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
