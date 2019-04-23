import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Text, Rect } from 'react-konva';

function useTextSize() {
  const [ref, setRef] = useState(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function getTextSize() {
      const { width, height } = ref.getClientRect();

      setSize({ width, height });
    }

    if (!ref) return;

    getTextSize();
  }, [ref]);

  return [size, setRef];
}

export default function TextBox({
  text,
  color,
  borderColor,
  noBorder,
  position: { x, y },
  onMouseEnter,
  onMouseLeave,
  onClick
}) {
  const [size, ref] = useTextSize();

  return (
    <React.Fragment>
      {noBorder ? null : (
        <Rect
          x={x - size.width / 2}
          y={y - size.height / 2}
          width={size.width}
          height={size.height}
          fill="white"
          stroke={borderColor}
          strokeWidth={1}
          cornerRadius={2}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        />
      )}
      <Text
        ref={ref}
        text={text}
        x={x - size.width / 2}
        y={y - size.height / 2}
        fontSize="18"
        fontStyle="bold"
        fill={color}
        padding={7}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      />
    </React.Fragment>
  );
}

TextBox.defaultProps = {
  color: '#232323',
  noBorder: false,
  borderColor: '#232323',
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  onClick: undefined
};

TextBox.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  noBorder: PropTypes.bool,
  borderColor: PropTypes.string,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func
};
