import React from 'react';
import PropTypes from 'prop-types';

import { Rect } from 'react-konva';

import GrassTexture from 'assets/Grass.jpg';
import useTexture from 'hooks/canvas/UseTexture';

function Bounds({ data }) {
  const [texture, status] = useTexture(GrassTexture);

  const width = (data[1].x - data[0].x) * 10;
  const height = (data[1].y - data[0].y) * 10;

  return (
    <Rect
      width={width}
      height={height}
      x={data[0].x}
      y={data[0].y}
      fill={status === 'loading' || status === 'failed' ? 'rgba(0,0,0,0)' : undefined}
      fillPatternImage={status === 'loaded' ? texture : undefined}
      stroke="#232323"
      strokeWidth="2"
    />
  );
}

Bounds.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

export default Bounds;
