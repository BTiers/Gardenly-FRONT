import React from 'react';
import PropTypes from 'prop-types';

const ThirdQuarter = ({ size }) => (
  <svg width={`${size}%`} height={`${size}%`} viewBox="0 0 100 100" version="1.1" id="svg8">
    <g id="layer1" transform="translate(0,-197)">
      <circle
        id="path3719"
        cx="50"
        cy="247"
        style={{ fill: '#ffffff', fillOpacity: '1', strokeWidth: '0.22' }}
        r="50"
      />
      <path
        style={{ fill: '#ffffff', strokeWidth: '2.86' }}
        d=""
        id="path3750"
        transform="scale(0.26458333)"
      />
      <path
        style={{ fill: '#ffffff', strokeWidth: '2.86' }}
        d=""
        id="path3752"
        transform="scale(0.26458333)"
      />
      <path
        style={{ fill: '#262a2e', fillOpacity: '1', strokeWidth: '0.43' }}
        id="path3785"
        d="m 49.9,199.5 a 47.5,47.5 0 0 1 41.2,23.8 47.5,47.5 0 0 1 -0.1,47.6 47.5,47.5 0 0 1 -41.3,23.7"
      />
    </g>
  </svg>
);

ThirdQuarter.propTypes = {
  size: PropTypes.number.isRequired
};

export default ThirdQuarter;
