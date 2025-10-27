"use client";

import { useEffect } from 'react';

export const useOnExitIntent = (onExitIntent: () => void) => {
  useEffect(() => {
    const handleMouseOut = (event: MouseEvent) => {
      if (
        event.clientY <= 0 &&
        event.relatedTarget == null &&
        event.target
      ) {
        onExitIntent();
      }
    };

    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [onExitIntent]);
};
