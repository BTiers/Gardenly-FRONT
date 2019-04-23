import { useState, useEffect } from 'react';

export default function useBounds(boundary) {
  const [bounds, setBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const PADDING = 10;

  useEffect(() => {
    const calcScale = () => {
      setBounds({
        x: boundary[0].x,
        y: boundary[0].y,
        width: (boundary[1].x - boundary[0].x) * 10 + PADDING * 2,
        height: (boundary[1].y - boundary[0].y) * 10 + PADDING * 2
      });
    };
    calcScale();
  }, []);

  return [bounds];
}
