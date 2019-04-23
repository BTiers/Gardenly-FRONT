import React from 'react';
import PropTypes from 'prop-types';

const FirstQuarter = ({ size }) => (
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
        style={{ fill: '#ffffff', strokeWidth: '2.9' }}
        d=""
        id="path3750"
        transform="scale(0.26)"
      />
      <path
        style={{ fill: '#ffffff', strokeWidth: '2.9' }}
        d=""
        id="path3752"
        transform="scale(0.26)"
      />
      <path
        style={{ fill: '#262a2e', fillOpacity: '1', strokeWidth: '0.423' }}
        id="path3785"
        d="M 50.2,294.5 A 47.5,47.5 0 0 1 8.9,270.8 47.5,47.5 0 0 1 8.9,223.3 47.5,47.5 0 0 1 50.1,199.5"
      />
    </g>
  </svg>
);

FirstQuarter.propTypes = {
  size: PropTypes.number.isRequired
};

export default FirstQuarter;
