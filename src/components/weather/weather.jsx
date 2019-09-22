import React from 'react';
import Weather from './index.js';

//Quand j'aurais pas la flemme de faire un truc joli, pour le moment ca sera bon pour le rendu.

function GardenWeather({ city, APIKEY }) {
  return <Weather city={city} APIKEY={APIKEY} />;
}

export { GardenWeather };
