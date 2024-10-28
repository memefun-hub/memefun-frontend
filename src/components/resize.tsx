'use client';

import { useEffect } from 'react';

export const Resize = () => {
  const setFontSize = async () => {
    document.documentElement.style.fontSize = `${window.innerWidth / (window.innerWidth > 768 ? 120 : 48)}px`;
  };

  useEffect(() => {
    setFontSize();
    window.addEventListener('resize', setFontSize);
  }, []);

  return <></>;
};
