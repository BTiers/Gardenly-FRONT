import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Stage, Layer } from 'react-konva';
import ReactResizeDetector from 'react-resize-detector';

import useBounds from 'hooks/canvas/UseBounds';

import ItemFactory from './ItemsFactory';
import House from './House';
import Bounds from './Bounds';

const StageContainer = styled.div`
  width: 100%;
  height: 100%;
  line-height: 0px;
  background-color: white;
`;

export default function GardenCanvas({ onElementFocus, gardenData: { garden, boundaries } }) {
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState({ factor: 1, offset: { x: 0, y: 0 } });
  const [focus, setFocus] = useState(null);
  const [bounds] = useBounds(boundaries);

  useEffect(() => {
    const PADDING = 20;
    const scaleX = stageSize.width / bounds.width;
    const scaleY = stageSize.height / bounds.height;

    const calcScale = Math.min(scaleX, scaleY);

    const offsetX = (stageSize.width - bounds.width * calcScale) / 2;
    const offsetY = (stageSize.height + PADDING - bounds.height * calcScale) / 2;

    setScale({ factor: calcScale, offset: { x: offsetX, y: offsetY } });
  }, [bounds, stageSize]);

  return (
    <React.Fragment>
      <StageContainer id="StageContainer">
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          x={focus ? focus.offset.x : scale.offset.x}
          y={focus ? focus.offset.y : scale.offset.y}
          scaleX={focus ? focus.factor : scale.factor}
          scaleY={focus ? focus.factor : scale.factor}
        >
          <Layer>
            <Bounds data={boundaries} />
            {garden.map(({ type, data }, idx) => {
              const Component = ItemFactory(type);
              if (Component !== null)
                return (
                  <Component
                    data={data}
                    setFocus={(focusScale, focusData, releaseCb) => {
                      setFocus(focusScale);
                      onElementFocus({ ...focusData, releaseCallback: releaseCb });
                    }}
                    key={`${idx}`}
                  />
                );
              return null;
            })}
            <House data={null} />
          </Layer>
        </Stage>
      </StageContainer>
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={(width, height) => setStageSize({ ...stageSize, height, width })}
        resizableElementId="StageContainer"
      />
    </React.Fragment>
  );
}

GardenCanvas.propTypes = {
  onElementFocus: PropTypes.func.isRequired,
  gardenData: PropTypes.shape({
    boundaries: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
      })
    ).isRequired,
    garden: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        data: PropTypes.shape().isRequired
      }).isRequired
    ).isRequired
  }).isRequired
};
//
// onWheel={e => {
//   e.evt.preventDefault();
//
//   const scaleBy = 1.01;
//   const stage = e.target.getStage();
//   const oldScale = stage.scaleX();
//   const mousePointTo = {
//     x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
//     y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
//   };
//
//   const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
//
//   stage.scale({ x: newScale, y: newScale });
//
//   setScale({
//     ratio: newScale,
//     x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
//     y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
//   });
// }}
//

// dragBoundFunc={pos => {
//   const clamp = (number, nb1, nb2) => {
//     if (nb2 > nb1) return Math.max(nb1, Math.min(number, nb2));
//     return Math.max(nb2, Math.min(number, nb1));
//   };
//   const newX = clamp(
//     pos.x,
//     bounds.x * scale,
//     stageSize.width - (bounds.x + bounds.width) * scale
//   );
//   const newY = clamp(
//     pos.y,
//     bounds.y * scale,
//     stageSize.height - (bounds.y + bounds.height) * scale
//   );
//
//   return { x: newX, y: newY };
// }}
