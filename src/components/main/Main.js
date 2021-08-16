import { Grid } from '@material-ui/core';
import { useGetPlaceData } from '../../hooks/useGetPlaceData';
import Header from '../header/Header';
import List from '../list/List';
import Map from '../map/Map';
import style from './Main.module.scss';

export default function Main() {
  // Get data when type or coordinate changes
  useGetPlaceData();

  return (
    <div className={style['main-container']}>
      <Header />
      <Grid container className={style.grid}>
        <Grid item xs={12} md={4} className={style.left}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </div>
  );
}
