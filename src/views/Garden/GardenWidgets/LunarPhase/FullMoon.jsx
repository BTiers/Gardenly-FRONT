import React from 'react';
import PropTypes from 'prop-types';

const FullMoon = ({ size }) => (
  <svg width={`${size}%`} height={`${size}%`} viewBox="0 0 100 100" version="1.1" id="svg8">
    <g id="layer1" transform="translate(0,-197)">
      <circle
        id="path3719"
        cx="51"
        cy="247"
        style={{ fill: '#ffffff', fillOpacity: '1', strokeWidth: '0.22' }}
        r="50"
        transform="rotate(0.2)"
      />
      <path style={{ fill: '#ffffff', strokeWidth: '0.76' }} d="" id="path3750" />
      <path style={{ fill: '#ffffff', strokeWidth: '0.76' }} d="" id="path3752" />
    </g>
  </svg>
);

FullMoon.propTypes = {
  size: PropTypes.number.isRequired
};

export default FullMoon;
