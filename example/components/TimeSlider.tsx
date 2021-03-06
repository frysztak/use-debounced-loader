import {
  HStack,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/core';
import * as React from 'react';

export interface TimeSliderProps {
  name: string;
  disabled: boolean;
  value: number;
  minValue: number;
  maxValue: number;
  onValueChange: (ms: number) => void;
}
export function TimeSlider(props: TimeSliderProps) {
  const { name, disabled, value, minValue, maxValue, onValueChange } = props;
  return (
    <HStack width={'full'} spacing={4}>
      <Box flexBasis={'30%'}>{name}</Box>
      <Slider
        flexBasis={'50%'}
        defaultValue={value}
        onChange={onValueChange}
        min={minValue}
        max={maxValue}
        step={20}
        isDisabled={disabled}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Box flexBasis={'20%'}>{value} ms</Box>
    </HStack>
  );
}
