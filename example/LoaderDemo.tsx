import { VStack, Container, Heading, Button } from '@chakra-ui/core';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { TimeSlider } from './components/TimeSlider';
import { Waveforms } from './components/Waveforms';
import { useWaveforms } from './hooks/useWaveforms';

export function LoaderDemo() {
  const [runAnimation, setRunAnimation] = useState(false);
  const [requestOffset, setRequestOffset] = useState(100);
  const [requestDuration, setRequestDuration] = useState(500);
  const [debounceDelay, setDebounceDelay] = useState(300);
  const [debounceTimeOn, setDebounceTimeOn] = useState(500);
  const [startClicked, setStartClicked] = useState(false);

  const totalLength = 3000;

  const {
    x,
    done,
    reset,

    isLoading,
    originalOffset,
    originalLength,

    debouncedIsLoading,
    debouncedOffset,
    debouncedLength,

    debouncedIsLoading2,
    debouncedOffset2,
    debouncedLength2,
  } = useWaveforms({
    scanMode: runAnimation,
    requestOffset: requestOffset,
    requestDuration: requestDuration,
    debounceDelay: debounceDelay,
    debounceTimeOn: debounceTimeOn,
    totalLength: totalLength,
  });

  const start = useCallback(() => {
    setStartClicked(true);
    reset();
    setRunAnimation(true);
  }, [reset]);

  useEffect(() => {
    if (startClicked) {
      start();
    }
  }, [
    requestOffset,
    requestDuration,
    debounceDelay,
    debounceTimeOn,
    reset,
    start,
    startClicked,
  ]);

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

        <Button size="lg" onClick={start} disabled={runAnimation}>
          Start
        </Button>

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
