import React from 'react';
import Weather from './index.js';

// Quand j'aurais pas la flemme de faire un truc joli, pour le moment ca sera bon pour le rendu.

const APIKEY = '6e7323f336a75fd0267574487b9f5c85';

function GardenWeather({ city }) {
  return <Weather city={city} APIKEY={APIKEY} />;
}

export { GardenWeather };
