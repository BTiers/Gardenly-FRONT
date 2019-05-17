import React from 'react';
import PropTypes from 'prop-types';

function FillableDroplet({ color, fillAt, size, id }) {
  const fillStop = 100 - fillAt * 10;

  return (
    <svg
      stroke="currentColor"
      fill={`url(#grad-${id})`}
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      size={size}
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <linearGradient id={`grad-${id}`} x1="0" x2="0" y1="0" y2="100%">
        <stop offset={`${fillStop}%`} stopColor="white" />
        <stop offset={`${fillStop === 100 ? 0 : fillStop}%`} stopColor={color} />
      </linearGradient>
    </svg>
  );
}

FillableDroplet.propTypes = {
  color: PropTypes.string.isRequired,
  fillAt: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};

export { FillableDroplet };
