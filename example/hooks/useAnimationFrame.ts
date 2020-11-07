import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimationFrameHandle } from './types';

/**
 * @param callback The callback that is invoked in the next animation frame
 */
const useAnimationFrame = <T extends (timestamp: number) => unknown>(
  callback: T
): (() => void) => {
  const rafCallback = useRef<T>(callback);
  const [handle, setHandle] = useState<AnimationFrameHandle | null>(null);

  useEffect(() => {
    rafCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (handle) {
        cancelAnimationFrame(handle);
      }
    };
  }, [handle]);

  return useCallback(() => {
    const h = requestAnimationFrame((timestamp: number) =>
      rafCallback.current(timestamp)
    );
    setHandle(h);
  }, []);
};

export default useAnimationFrame;
