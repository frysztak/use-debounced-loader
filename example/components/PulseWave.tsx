import { useToken } from '@chakra-ui/core';
import * as React from 'react';
import { useMemo } from 'react';
import { clamp } from '../hooks/utils';

export interface PulseWaveProps {
  highOffset: number | null;
  highLength: number | null;
  x: number;
  tickStart: number;
  totalLength: number;
}

export function PulseWave(props: PulseWaveProps) {
  const { highLength, highOffset, x, tickStart, totalLength } = props;

  const [blue, gray] = useToken('colors', ['blue.300', 'gray.300']);

  const arrowSize = 6;
  const axisMargin = arrowSize * 2;

  const height = 80 + 2 * axisMargin + arrowSize;
  const margin = 8;

  const lowY = height - margin - 2 * axisMargin;
  const highY = margin;

  const axisY = height - arrowSize - axisMargin;

  const tickStep = 200;

  const line = useMemo(() => {
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
  }, [highLength, highOffset, highY, lowY]);

  const ticks = useMemo(() => {
    const nTicks = Math.floor((totalLength - tickStart) / tickStep);
    return [...Array(nTicks).keys()].map(x => tickStart + tickStep * x);
  }, [tickStart, totalLength]);

  return (
    <svg
      width="100%"
      height={`${height}px`}
      preserveAspectRatio="none"
      strokeWidth="3"
      shapeRendering="crispedges"
      style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}
    >
      <g stroke={blue}>{line}</g>
      <g stroke={gray} strokeWidth="2">
        <line x1="0" x2="100%" y1={axisY} y2={axisY} />
        <line
          x1="0"
          x2={arrowSize}
          y1={axisY - axisMargin / 2}
          y2={axisY}
          style={{ transform: `translate(calc(100% - ${arrowSize}px))` }}
        />
        <line
          x1={arrowSize}
          x2="0"
          y1={axisY}
          y2={axisY + axisMargin / 2}
          style={{ transform: `translate(calc(100% - ${arrowSize}px))` }}
        />

        {ticks.map(x => (
          <g key={x}>
            <line
              x1={`${(x * 100) / totalLength}%`}
              x2={`${(x * 100) / totalLength}%`}
              y1={axisY}
              y2={axisY - axisMargin / 2}
            />
            <text
              x={`${(x * 100) / totalLength}%`}
              y={axisY + axisMargin}
              textAnchor="middle"
              dominantBaseline="middle"
              strokeWidth="0"
              fontSize="small"
              fill={gray}
            >
              {x}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
