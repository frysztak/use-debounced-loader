import { VStack, Container, Heading } from '@chakra-ui/core';
import * as React from 'react';
import { useEffect } from 'react';
import { TimeSlider } from './components/TimeSlider';
import { Waveforms } from './components/Waveforms';
import { useWaveforms } from './hooks/useWaveforms';

export function LoaderDemo() {
  const [runAnimation, setRunAnimation] = React.useState(true);
  const [requestOffset, setRequestOffset] = React.useState(150);
  const [requestDuration, setRequestDuration] = React.useState(800);
  const [debounceDelay, setDebounceDelay] = React.useState(300);
  const [debounceTimeOn, setDebounceTimeOn] = React.useState(500);

  const totalLength = 4000;

  const {
    x,
    done,
    reset,
    originalOffset,
    originalLength,

    debouncedOffset,
    debouncedLength,

    debouncedOffset2,
    debouncedLength2,

    isLoading,
    debouncedIsLoading,
    debouncedIsLoading2,
  } = useWaveforms({
    scanMode: runAnimation,
    requestOffset: requestOffset,
    requestDuration: requestDuration,
    debounceDelay: debounceDelay,
    debounceTimeOn: debounceTimeOn,
    totalLength: totalLength,
  });

  useEffect(() => {
    reset();

    setRunAnimation(true);
  }, [requestOffset, requestDuration, debounceDelay, debounceTimeOn, reset]);

  useEffect(() => {
    if (done) {
      setRunAnimation(false);
    }
  }, [done]);

  return (
    <Container maxWidth={'4xl'}>
      <VStack spacing={4}>
        <Heading size="lg">Controls</Heading>
        <TimeSlider
          name="Request offset"
          value={requestOffset}
          minValue={0}
          maxValue={400}
          onValueChange={setRequestOffset}
        />
        <TimeSlider
          name="Request duration"
          value={requestDuration}
          minValue={20}
          maxValue={1000}
          onValueChange={setRequestDuration}
        />
        <TimeSlider
          name="Debounce delay"
          value={debounceDelay}
          minValue={1}
          maxValue={1000}
          onValueChange={setDebounceDelay}
        />
        <TimeSlider
          name="Debounce time on"
          value={debounceTimeOn}
          minValue={1}
          maxValue={1000}
          onValueChange={setDebounceTimeOn}
        />

        <Waveforms
          totalLength={totalLength}
          x={x}
          originalLength={originalLength ?? totalLength}
          originalOffset={originalOffset ?? totalLength}
          debouncedLength={debouncedLength ?? totalLength}
          debouncedOffset={debouncedOffset}
          debouncedLength2={debouncedLength2 ?? totalLength}
          debouncedOffset2={debouncedOffset2}
          isLoading={isLoading}
          debouncedIsLoading={debouncedIsLoading}
          debouncedIsLoading2={debouncedIsLoading2}
        />
      </VStack>
    </Container>
  );
}
