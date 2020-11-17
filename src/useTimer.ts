import { useState, useRef, useCallback, useEffect } from 'react';

type TimerHandle = ReturnType<typeof setTimeout>;
type State = {
  time: number | null;
  done: boolean;
};

/**
 * Hook-based wrapper for `setTimeout()`.
 */
export function useTimer(): {
  /**
   * Indicates whether timer has finished.
   */
  done: boolean;

  /**
   * Function that starts the timer. Takes number of miliseconds to wait out.
   */
  start: (ms: number) => void;
} {
  const [state, setState] = useState<State>({ time: null, done: false });
  const timerId = useRef<TimerHandle | null>(null);

  const start = useCallback(
    (ms: number) => {
      setState({ time: ms, done: false });
    },
    [setState]
  );

  useEffect(() => {
    if (!timerId.current && state.time) {
      timerId.current = setTimeout(() => {
        setState({ time: null, done: true });
        timerId.current = null;
      }, state.time);
    }

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [state, setState]);

  return {
    start: start,
    done: state.done,
  };
}
