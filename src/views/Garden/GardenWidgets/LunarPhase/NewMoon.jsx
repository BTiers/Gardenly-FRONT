import React from 'react';
import PropTypes from 'prop-types';

const NewMoon = ({ size }) => (
  <svg width={`${size}%`} height={`${size}%`} viewBox="0 0 100 100" version="1.1" id="svg8">
    <g id="layer1" transform="translate(0,-197)">
      <circle
        id="path3719"
        cx="50"
        cy="247.00002"
        style={{ fill: '#ffffff', fillOpacity: '1', strokeWidth: '0.22' }}
        r="50"
      />
      <path
        style={{ fill: '#ffffff', strokewidth: '2.86' }}
        d=""
        id="path3750"
        transform="scale(0.26458333)"
      />
      <path
        style={{ fill: '#ffffff', strokewidth: '2.86' }}
        d=""
        id="path3752"
        transform="scale(0.26458333)"
      />
      <circle
        style={{ fill: '#262a2e', fillOpacity: '1', strokeWidth: '0.43' }}
        id="path3785"
        cx="50"
        cy="247"
        r="47.5"
      />
    </g>
  </svg>
);

NewMoon.propTypes = {
  size: PropTypes.number.isRequired
};

export default NewMoon;
