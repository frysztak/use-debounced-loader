import { Heading } from '@chakra-ui/core';
import * as React from 'react';
import { PulseWave } from './PulseWave';

export interface WavesformsProps {
  totalLength: number;
  x: number;
  originalOffset: number;
  originalLength: number;
  debouncedOffset: number | null;
  debouncedLength: number;

  debouncedOffset2: number | null;
  debouncedLength2: number;
}

export function Waveforms(props: WavesformsProps) {
  const {
    totalLength,
    x,
    originalOffset,
    originalLength,
    debouncedOffset,
    debouncedLength,
    debouncedOffset2,
    debouncedLength2,
  } = props;

  return (
    <>
      <Heading size="lg">Original signal</Heading>
      <PulseWave
        highOffset={((originalOffset ?? totalLength) * 100) / totalLength}
        highLength={((originalLength ?? totalLength) * 100) / totalLength}
        x={x}
      />
      <Heading size="lg">useDebouncedLoader()</Heading>
      <PulseWave
        highOffset={
          debouncedOffset !== null
            ? (debouncedOffset * 100) / totalLength
            : null
        }
        highLength={((debouncedLength ?? totalLength) * 100) / totalLength}
        x={x}
      />
      <Heading size="lg">useDebounce()</Heading>
      <PulseWave
        highOffset={
          debouncedOffset2 !== null
            ? (debouncedOffset2 * 100) / totalLength
            : null
        }
        highLength={((debouncedLength2 ?? totalLength) * 100) / totalLength}
        x={x}
      />
    </>
  );
}
