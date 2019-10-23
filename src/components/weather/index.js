import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getIcons } from './utils';

const titleStyles = {
  padding: '10px',
  margin: '0'
};

function Weather({ city, APIKEY, orderFlipped }) {
  const [weather, setWeather] = useState();

  const weatherContainerStyles = {
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: `${orderFlipped ? 'row-reverse' : 'row'}`
  };

  useEffect(() => {
    if (!city) {
      city = 'France';
    }
    if (!APIKEY) {
      console.error('Please add an api key from https://openweathermap.org/api');
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
      .catch(error => {
        console.error('whoops!', error);
      })
      .then(res => {
        res
          .json()
          .catch(error => {
            console.error('ok', error);
          })
          .then(data => {
            if (data.cod === 401 || data.cod === '404') {
              console.error(data.message);
            } else {
              setWeather(data);
            }
          });
      });
    return () => {};
  }, []);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <React.Fragment>
      {!weather ? (
        <React.Fragment>...</React.Fragment>
      ) : (
        <div style={weatherContainerStyles} className="text-muted small">
          {getIcons(weather.weather[0].icon)}
          <br />
          <span className="text-center" style={titleStyles}>
            {weather.name === 'France' ? 'Non renseigné' : `${weather.main.temp} °C`}
          </span>
        </div>
      )}
    </React.Fragment>
  );
}

Weather.propTypes = {
  city: PropTypes.string,
  APIKEY: PropTypes.string
};

export default Weather;
