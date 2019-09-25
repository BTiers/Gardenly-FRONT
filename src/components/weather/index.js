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

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`)
      .catch(error => {
        console.error('whoops!', error);
        return;
      })
      .then(res => {
        res
          .json()
          .catch(error => {
            console.error('ok', error);
            return;
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
    <>
      {!weather ? (
        <>...</>
      ) : (
        <div style={weatherContainerStyles}>
          <h4 className="text-center" style={titleStyles}>{weather.name}</h4>
          {getIcons(weather.weather[0].icon)}
          <h4 className="text-center" style={titleStyles}>{weather.main.temp}°C</h4>
        </div>
      )}
    </>
  );
}

Weather.propTypes = {
  city: PropTypes.string,
  APIKEY: PropTypes.string
};

export default Weather;
