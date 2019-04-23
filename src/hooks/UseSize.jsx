import { useState, useLayoutEffect } from 'react';

export default function useSize({ defaultHeight }) {
  const [ref, setRef] = useState(null);
  const [size, setSize] = useState({ width: 0, height: defaultHeight || 0 });

  useLayoutEffect(() => {
    function checkSize() {
      const width = ref.offsetWidth;
      const height = ref.offsetHeight;

      setSize({ width, height: defaultHeight || height });
    }

    if (!ref) return undefined;

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, [ref]);

  return [size, setRef];
}
