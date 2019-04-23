import React from 'react';
import PropTypes from 'prop-types';

import { Circle } from 'react-konva';

function Flower({ position, onMouseEnter, onMouseLeave }) {
  // ABS value is used to inverse from Unity coordinate system
  const toKonvaCoords = ({ x, z }) => ({ x: x * 10, y: Math.abs(z) * 10 });
  const { x, y } = toKonvaCoords(position);

  return (
    <Circle
      x={x}
      y={y}
      radius={5}
      fill="red"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
}

Flower.defaultProps = {
  onMouseEnter: undefined,
  onMouseLeave: undefined
};

Flower.propTypes = {
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired
  }).isRequired
};

export default Flower;
