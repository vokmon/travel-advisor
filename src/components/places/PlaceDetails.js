/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { Rating } from '@material-ui/lab';
import style from './PlaceDetails.module.scss';

const day = new Date();
const dayOfWeek = day.getDay();

const padding = (num) => (
  String(num).padStart(2, '0')
);

// eslint-disable-next-line react/display-name
const PlaceDetails = React.forwardRef(({
  place,
}, ref) => {
  return (
    <Card ref={ref} elevation={6} className={style['place-detail-container']}>
      {place.photo && (
        <CardMedia
          className={style['card-media']}
          image={place.photo.images.large.url}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        <Box display='flex' justifyContent='space-between' my={2}>
          <Rating name='read-only' value={Number(place.rating)} readOnly />
          <Typography component='legend'>{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography component='legend'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>
            {place.price_level}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography component='legend'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1' className={style.right}>
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box key={`award-${award.display_name}`} display='flex' justifyContent='space-between' my={1} alignItems='center'>
            <img src={award.images.small} />
            <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size='small' label={name} className={style.chip} />
        ))}
        {place.address && (
          <Typography gutterBottom variant='body2' color='textSecondary' className={style.subtitle}>
            <LocationOnIcon />{place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant='body2' color='textSecondary' className={style.spacing}>
            <PhoneIcon /> <a className={style.tel} href={`tel:${place.phone}`}>{place.phone}</a>
          </Typography>
        )}
        {place.is_closed !== undefined && place.is_closed !== null && (
          <Typography variant='body2' color='textSecondary' className={style.isOpen}>
            <AccessAlarmIcon className={place.is_closed ? style['close-icon'] : style['open-icon']} /> {place.open_now_text}
          </Typography>
        )}
        {place.hours && (
          <Typography variant='body2' color='textSecondary' className={style.openHour}>
            Open hour {place.hours.week_ranges[dayOfWeek].map((times, i) => {
              return (
                <span key={`time-${i}`}>
                  
                  {padding(Math.floor(times.open_time / 60))}:{padding(Math.floor(times.open_time % 60))} - {padding(Math.floor(times.close_time / 60))}:{padding(Math.floor(times.close_time % 60))}
                </span>
              );
            })}
          </Typography>
        )}
      </CardContent>
      <CardActions className={style.actions}>
        <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
        <Button size='small' color='primary' onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${place.address}&destination_place_id=${place.location_id}`, '_blank')}>
          <div className={style.direction}>Direction <div>({place.distance_string})</div></div>
        </Button>
      </CardActions>

    </Card>
  );
});

PlaceDetails.defaultProps = {
  place: {},
};

PlaceDetails.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.any,
    rating: PropTypes.string,
    num_reviews: PropTypes.string,
    price_level: PropTypes.string,
    awards: PropTypes.array,
    ranking: PropTypes.string,
    cuisine: PropTypes.array,
    address: PropTypes.string,
    phone: PropTypes.string,
    web_url: PropTypes.string,
    website: PropTypes.string,
    is_closed: PropTypes.bool,
    open_now_text: PropTypes.string,
    hours: PropTypes.any,
    distance_string: PropTypes.string,
    location_id: PropTypes.string,
  }),
};

export default PlaceDetails;
