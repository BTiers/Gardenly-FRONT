import React from 'react';
// FIXME
//import PropTypes from 'prop-types';

import { Shape, Group } from 'react-konva';

import useTexture from 'hooks/canvas/UseTexture';
import Stripes from 'assets/Stripes.png';

// import getPolygonCentroid from './MathsHelpers/GetPolygonCentroid';
// import TextBox from './TextBox';

function House({ data }) {
  const [texture, status] = useTexture(Stripes);
  const fakeData = {
    name: 'Maison Principale',
    points: [
      { x: 350, y: 350 },
      { x: 450, y: 350 },
      { x: 450, y: 450 },
      { x: 550, y: 450 },
      { x: 550, y: 550 },
      { x: 350, y: 550 }
    ]
  };

  //  const centroid = getPolygonCentroid(fakeData.points);

  return (
    <Group>
      <Shape
        sceneFunc={(context, shape) => {
          const { points } = fakeData;
          context.beginPath();

          context.moveTo(points[0].x, points[0].y);
          points.forEach(({ x, y }, index) => {
            if (index === 0) return;
            context.lineTo(x, y);
          });
          context.closePath();
          context.fillStrokeShape(shape);
        }}
        fill={status === 'loading' || status === 'failed' ? 'rgba(0,0,0,0)' : undefined}
        fillPatternImage={status === 'loaded' ? texture : undefined}
        stroke="#232323"
        strokeWidth={2}
      />
    </Group>
  );
}

// FIXME: To be determined
// House.propTypes = {
//   data: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     points: PropTypes.arrayOf(
//       PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number.isRequired })
//     )
//   }).isRequired
// };

export default House;
