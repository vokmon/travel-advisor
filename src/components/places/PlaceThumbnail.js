import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import style from './PlaceThumbnail.module.scss';

export default function PlaceThumbnail({
  place,
  onClick,
}) {
  return (
    <div className={style['place-thumbnail-container']} onClick={onClick}>
      <LocationOnOutlinedIcon className={style['place-thumbnail-icon']} color='primary' fontSize='large' />
      <Paper elevation={3} className={style['place-thumbnail']}>
        <Typography className={style.typography} variant='subtitle2' gutterBottom> {place.name}</Typography>
        {place.photo && (
          <img
            className={style.pointer}
            src={place.photo.images.large.url}
          />
        )}

        <Rating name='read-only' size='small' value={Number(place.rating)} readOnly />
      </Paper>
    </div>
  );
}

PlaceThumbnail.defaultProps = {
  place: {},
  onClick: () => null,
};

PlaceThumbnail.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.any,
    rating: PropTypes.string,
  }),
  onClick: PropTypes.func,
};