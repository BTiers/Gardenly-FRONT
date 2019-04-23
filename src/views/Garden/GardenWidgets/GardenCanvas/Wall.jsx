import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-konva';

// import useTexture from 'components/Hooks/Canvas/UseTexture';
// import Stripes from 'assets/Stripes.png';

function Wall({ data: { start, end, width } }) {
  //  const [texture, status] = useTexture(Stripes);

  return (
    <Line
      points={[10 * start.x, 10 * Math.abs(start.z), 10 * end.x, 10 * Math.abs(end.z)]}
      stroke="black"
      strokeWidth="5"
    />
  );
}

Wall.propTypes = {
  data: PropTypes.shape({
    width: PropTypes.number,
    start: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number
    }).isRequired,
    end: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number
    }).isRequired
  }).isRequired
};

export default Wall;
