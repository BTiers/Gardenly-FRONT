import React from 'react';
import PropTypes from 'prop-types';

const WaxingGibbous = ({ size }) => (
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
      <path
        style={{ fill: '#262a2e', fillOpacity: '1', strokeWidth: '0.43' }}
        id="path3785"
        d="M 51,294 A 47.5,47.5 0 0 1 9.8,270.7 47.5,47.5 0 0 1 9.7,223.1 47.5,47.5 0 0 1 51,199.3"
        transform="rotate(0.2)"
      />
      <ellipse
        style={{ fill: '#ffffff', fillOpacity: '1', strokeWidth: '6.12' }}
        id="path4671"
        cx="51"
        cy="247"
        rx="30"
        ry="47"
        transform="rotate(0.2)"
      />
    </g>
  </svg>
);

WaxingGibbous.propTypes = {
  size: PropTypes.number.isRequired
};

export default WaxingGibbous;
