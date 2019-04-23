import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Shape, Group } from 'react-konva';

import Flower from './Flower';

const calcBounds = coords => {
  let xMin;
  let xMax;
  let yMin;
  let yMax;

  xMin = coords[0].x;
  xMax = coords[0].x;
  yMin = coords[0].y;
  yMax = coords[0].y;

  coords.forEach(({ x, y }) => {
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  });

  return { width: xMax - xMin, height: yMax - yMin, x: xMin, y: yMin };
};

function FlowerBed({ data, setFocus }) {
  const [settings, SetSettings] = useState({ borderColor: '#232323' });

  // ABS value is used to inverse from Unity coordinate system
  const toKonvaCoords = ({ points }) =>
    points.map(({ x, y }) => ({ x: x * 10, y: Math.abs(y) * 10 }));

  const konvaCoords = toKonvaCoords(data);
  const selfBounds = calcBounds(konvaCoords);

  const scaleToFit = stageSize => {
    const PADDING = 10;
    const scaleX = stageSize.width / selfBounds.width;
    const scaleY = stageSize.height / selfBounds.height;

    const calcScale = Math.floor(Math.min(scaleX, scaleY)) / 2;

    const offsetX = -(selfBounds.x * calcScale) - PADDING + selfBounds.x / 2;
    const offsetY = -(selfBounds.y * calcScale) - PADDING + selfBounds.y / 2;

    return { factor: calcScale, offset: { x: offsetX, y: offsetY } };
  };

  const onMouseEnter = () => SetSettings({ ...settings, borderColor: '#298ed4ff' });
  const onMouseLeave = () => SetSettings({ ...settings, borderColor: '#232323' });

  return (
    <Group>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();

          context.moveTo(konvaCoords[0].x, Math.abs(konvaCoords[0].y));
          konvaCoords.forEach(({ x, y }, index) => {
            if (index === 0) return;
            context.lineTo(x, Math.abs(y));
          });
          context.closePath();
          context.fillStrokeShape(shape);
        }}
        fill="white"
        stroke={settings.borderColor}
        strokeWidth="2"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={e =>
          setFocus(scaleToFit(e.target.getStage().getSize()), data, () => setFocus(null))
        }
      />
      {data.elements.map(({ position }) => (
        <Flower position={position} key={`${position.x}${position.y}`} />
      ))}
    </Group>
  );
}

FlowerBed.propTypes = {
  setFocus: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    points: PropTypes.arrayOf(
      PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number.isRequired })
    )
  }).isRequired
};

export default FlowerBed;
