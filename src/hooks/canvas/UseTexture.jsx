import { useState, useEffect } from 'react';

export default function useTexture(src) {
  const [img, setImg] = useState({ image: undefined, status: 'loading' });
  const { image, status } = img;

  useEffect(() => {
    if (!src) return;
    const newImg = new window.Image();

    newImg.onload = () => setImg({ image: newImg, status: 'loaded' });
    newImg.onerror = () => {
      setImg({ image: undefined, status: 'failed' });
    };
    newImg.src = src;
  }, [src]);

  return [image, status];
}
