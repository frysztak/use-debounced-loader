import { useCallback, useState } from 'react';
import { useDebouncedLoader } from './../../';
import useAnimationFrameLoop from './useAnimationFrameLoop';
import { unstable_batchedUpdates } from 'react-dom';

export interface WaveformHooksParams {
  totalLength: number;

  requestDuration: number;
  requestOffset: number;

  debounceDelay: number;
  debounceTimeOn: number;

  scanMode: boolean;
}

type Status = 'low' | 'delay' | 'high' | 'done';

export function useWaveforms(params: WaveformHooksParams) {
  const {
    totalLength,
    requestDuration,
    requestOffset,
    debounceDelay,
    debounceTimeOn,
    scanMode,
  } = params;

  const [x, setX] = useState(0);
  const [status, setStatus] = useState<Status>('low');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [debouncedOffset, setDebouncedOffset] = useState<number | null>(null);
  const [debouncedLength, setDebouncedLength] = useState<number | null>(null);

  const [originalOffset, setOriginalOffset] = useState<number | null>(null);
  const [originalLength, setOriginalLength] = useState<number | null>(null);

  const debouncedIsLoading = useDebouncedLoader(
    isLoading,
    debounceDelay,
    debounceTimeOn
  );

  const reset = useCallback(() => {
    unstable_batchedUpdates(() => {
      setX(0);
      setStatus('low');
      setStartTime(null);
      setIsLoading(false);
      setDebouncedOffset(null);
      setDebouncedLength(null);
      setOriginalLength(null);
      setOriginalOffset(null);
    });
  }, []);

  const relativeTime = (time: number) => (startTime ? time - startTime : 0);

  useAnimationFrameLoop((time: number) => {
    if (status === 'done') {
      return;
    }
    console.log('time', time);
    console.log('deb', debouncedIsLoading);
    if (scanMode && !startTime) {
      console.log('startTime', time);
      setStartTime(time);
      setStatus('delay');
    }

    const now = relativeTime(time);

    if (status === 'delay' && now >= requestOffset) {
      setStatus('high');
      setOriginalOffset(now);
      setIsLoading(true);
      console.log('isloading start', time);
    } else if (status === 'high' && now >= requestOffset + requestDuration) {
      setStatus('low');
      setOriginalLength(now - originalOffset!);
      setIsLoading(false);
      console.log('isloading end', time);
    } else if (status === 'low' && now >= totalLength) {
      setStatus('done');
    }

    if (debouncedIsLoading && !debouncedOffset) {
      setDebouncedOffset(now);

      console.log('start', time);
    } else if (!debouncedIsLoading && !debouncedLength && debouncedOffset) {
      setDebouncedLength(now - debouncedOffset);
      console.log('end', now - debouncedOffset);
    }

    setX((now * 100) / totalLength);
  });

  return {
    done: status === 'done',
    reset: reset,
    originalOffset,
    originalLength,
    debouncedOffset,
    debouncedLength,
    x,
  };
}
