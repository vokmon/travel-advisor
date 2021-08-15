import style from './PlaceDetails.module.scss';
import PropTypes from 'prop-types';

export default function PlaceDetails({
  place,
}) {
  // console.log(place);
  return (
    <div className={style['place-detail-container']}>
      {place.name}
    </div>
  );
}

PlaceDetails.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string,
  }),
};
