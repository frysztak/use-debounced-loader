import { Heading, HStack, Spinner } from '@chakra-ui/core';
import * as React from 'react';
import { PulseWave } from './PulseWave';

export interface WavesformsProps {
  totalLength: number;
  x: number;
  requestOffset: number;

  originalOffset: number;
  originalLength: number;
  debouncedOffset: number | null;
  debouncedLength: number;

  debouncedOffset2: number | null;
  debouncedLength2: number;

  isLoading: boolean;
  debouncedIsLoading: boolean;
  debouncedIsLoading2: boolean;
}

export function Waveforms(props: WavesformsProps) {
  const {
    totalLength,
    x,
    requestOffset,

    originalOffset,
    originalLength,
    debouncedOffset,
    debouncedLength,
    debouncedOffset2,
    debouncedLength2,

    isLoading,
    debouncedIsLoading,
    debouncedIsLoading2,
  } = props;

  return (
    <>
      <Heading size="lg">Original signal</Heading>
      <HStack width={'full'}>
        <PulseWave
          highOffset={((originalOffset ?? totalLength) * 100) / totalLength}
          highLength={((originalLength ?? totalLength) * 100) / totalLength}
          x={x}
          tickStart={requestOffset}
          totalLength={totalLength}
        />
        <Spinner opacity={isLoading ? 1 : 0} />
      </HStack>

      <Heading size="lg">useDebouncedLoader()</Heading>
      <HStack width={'full'}>
        <PulseWave
          highOffset={
            debouncedOffset !== null
              ? (debouncedOffset * 100) / totalLength
              : null
          }
          highLength={((debouncedLength ?? totalLength) * 100) / totalLength}
          x={x}
          tickStart={requestOffset}
          totalLength={totalLength}
        />
        <Spinner opacity={debouncedIsLoading ? 1 : 0} />
      </HStack>

      <Heading size="lg">useDebounce()</Heading>
      <HStack width={'full'}>
        <PulseWave
          highOffset={
            debouncedOffset2 !== null
              ? (debouncedOffset2 * 100) / totalLength
              : null
          }
          highLength={((debouncedLength2 ?? totalLength) * 100) / totalLength}
          x={x}
          tickStart={requestOffset}
          totalLength={totalLength}
        />
        <Spinner opacity={debouncedIsLoading2 ? 1 : 0} />
      </HStack>
    </>
  );
}
