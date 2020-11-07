import { Heading } from '@chakra-ui/core';
import * as React from 'react';
import { PulseWave } from './PulseWave';

export interface WavesformsProps {
  totalLength: number;
  originalOffset: number;
  originalLength: number;
  debouncedOffset: number | null;
  debouncedLength: number;
  x: number;
}

export function Waveforms(props: WavesformsProps) {
  const {
    totalLength,
    x,
    originalOffset,
    originalLength,
    debouncedOffset,
    debouncedLength,
  } = props;

  return (
    <>
      <Heading size="lg">Original signal</Heading>
      <PulseWave
        highOffset={((originalOffset ?? totalLength) * 100) / totalLength}
        highLength={((originalLength ?? totalLength) * 100) / totalLength}
        x={x}
      />
      <Heading size="lg">Debounced signal</Heading>
      <PulseWave
        highOffset={
          debouncedOffset !== null
            ? (debouncedOffset * 100) / totalLength
            : null
        }
        highLength={((debouncedLength ?? totalLength) * 100) / totalLength}
        x={x}
      />
    </>
  );
}
