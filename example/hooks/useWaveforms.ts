import { useCallback, useState } from 'react';
import { useDebouncedLoader } from './../../';
import useAnimationFrameLoop from './useAnimationFrameLoop';
import { unstable_batchedUpdates } from 'react-dom';
import { useDebounce } from 'use-debounce';

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

  const [originalOffset, setOriginalOffset] = useState<number | null>(null);
  const [originalLength, setOriginalLength] = useState<number | null>(null);

  const [debouncedOffset, setDebouncedOffset] = useState<number | null>(null);
  const [debouncedLength, setDebouncedLength] = useState<number | null>(null);

  const [debouncedOffset2, setDebouncedOffset2] = useState<number | null>(null);
  const [debouncedLength2, setDebouncedLength2] = useState<number | null>(null);

  const debouncedIsLoading = useDebouncedLoader(
    isLoading,
    debounceDelay,
    debounceTimeOn
  );
  const [debouncedIsLoading2] = useDebounce(isLoading, debounceDelay);

  const reset = useCallback(() => {
    unstable_batchedUpdates(() => {
      setX(0);
      setStatus('low');
      setStartTime(null);
      setIsLoading(false);
      setOriginalLength(null);
      setOriginalOffset(null);

      setDebouncedOffset(null);
      setDebouncedLength(null);

      setDebouncedOffset2(null);
      setDebouncedLength2(null);
    });
  }, []);

  const relativeTime = (time: number) => (startTime ? time - startTime : 0);

  useAnimationFrameLoop((time: number) => {
    if (status === 'done') {
      return;
    }
    if (scanMode && !startTime) {
      setStartTime(time);
      setStatus('delay');
    }

    const now = relativeTime(time);

    if (status === 'delay' && now >= requestOffset) {
      setStatus('high');
      setOriginalOffset(now);
      setIsLoading(true);
    } else if (status === 'high' && now >= requestOffset + requestDuration) {
      setStatus('low');
      setOriginalLength(now - originalOffset!);
      setIsLoading(false);
    } else if (status === 'low' && now >= totalLength) {
      setStatus('done');
    }

    if (debouncedIsLoading && !debouncedOffset) {
      setDebouncedOffset(now);
    } else if (!debouncedIsLoading && !debouncedLength && debouncedOffset) {
      setDebouncedLength(now - debouncedOffset);
    }

    if (debouncedIsLoading2 && !debouncedOffset2) {
      setDebouncedOffset2(now);
    } else if (!debouncedIsLoading2 && !debouncedLength2 && debouncedOffset2) {
      setDebouncedLength2(now - debouncedOffset2);
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
    debouncedOffset2,
    debouncedLength2,
    x,
    isLoading,
    debouncedIsLoading,
    debouncedIsLoading2,
  };
}
