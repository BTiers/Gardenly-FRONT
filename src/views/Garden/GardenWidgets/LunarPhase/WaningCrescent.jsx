import React from 'react';
import PropTypes from 'prop-types';

const WaningCrescent = ({ size }) => (
  <svg width={`${size}%`} height={`${size}%`} viewBox="0 0 100 100" version="1.1" id="svg8">
    <g id="layer1" transform="translate(0,-197)">
      <circle
        id="path3719"
        cx="-50.874226"
        cy="-246.82144"
        style={{ fill: '#ffffff', fillOpacity: '1', strokeWidth: '0.22' }}
        r="50"
        transform="rotate(-180)"
      />
      <path style={{ fill: '#ffffff', strokeWidth: '0.76' }} d="" id="path3750" />
      <path style={{ fill: '#ffffff', strokeWidth: '0.76' }} d="" id="path3752" />
      <path
        style={{ fill: '#262a2e', fillOpacity: '1', strokeWidth: '0.43' }}
        id="path3785"
        d="m -50.7,-199.3 a 47.5,47.5 0 0 1 -41.3,-23.7 47.5,47.5 0 0 1 -0.1,-47.6 47.5,47.5 0 0 1 41.2,-23.8"
        transform="rotate(-180)"
      />
      <ellipse
        style={{ fill: '#262a2e', fillOpacity: '1', strokeWidth: '6.12' }}
        id="path4671"
        cx="-51"
        cy="-247"
        rx="30"
        ry="47.5"
        transform="rotate(-180)"
      />
    </g>
  </svg>
);

WaningCrescent.propTypes = {
  size: PropTypes.number.isRequired
};

export default WaningCrescent;
