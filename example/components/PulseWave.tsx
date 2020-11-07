import { useToken } from '@chakra-ui/core';
import * as React from 'react';
import { clamp } from '../hooks/utils';

export interface PulseWaveProps {
  highOffset: number | null;
  highLength: number | null;
  x: number;
}

export function PulseWave(props: PulseWaveProps) {
  const { highLength, highOffset, x } = props;

  const blue = useToken('colors', 'blue.300');

  const height = 80;
  const margin = 8;

  const lowY = height - margin;
  const highY = margin;

  const line = () => {
    if (highOffset !== null && highLength !== null) {
      const highX = clamp(highOffset + highLength, 0, 100);
      return (
        <>
          <line x1="0" y1={lowY} x2={`${highOffset}%`} y2={lowY} />
          <line
            x1={`${highOffset}%`}
            y1={lowY}
            x2={`${highOffset}%`}
            y2={highY}
          />
          <line x1={`${highOffset}%`} y1={highY} x2={`${highX}%`} y2={highY} />
          <line x1={`${highX}%`} y1={highY} x2={`${highX}%`} y2={lowY} />
          <line x1={`${highX}%`} y1={lowY} x2={`100%`} y2={lowY} />
        </>
      );
    } else {
      return <line x1="0" y1={lowY} x2="100%" y2={lowY} />;
    }
  };

  return (
    <svg
      width="100%"
      height={`${height}px`}
      preserveAspectRatio="none"
      strokeWidth="3"
      shapeRendering="crispedges"
      style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}
    >
      <g stroke={blue}>{line()}</g>
    </svg>
  );
}
