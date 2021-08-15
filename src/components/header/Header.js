import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
// eslint-disable-next-line no-unused-vars
import { Autocomplete } from '@react-google-maps/api';
import SearchIcon from '@material-ui/icons/Search';
import style from './Header.module.scss';

export default function Header() {
  return (
    <AppBar className={style.header} position='static'>
      <Toolbar className={style.toolbar}>
        <Typography variant='h5' className={style.title}>
          Travel Advisor
        </Typography>
        <Box display='flex' className={style['search-container']}>
          {/* <Autocomplete> */}
          <div className={style.search}>
            <div className={style.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase placeholder='Search a new place ...' className={style.input} />
          </div>
          {/* </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
