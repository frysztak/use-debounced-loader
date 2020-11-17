import { useEffect, useReducer } from 'react';
import { useTimer } from './useTimer';

type State =
  | 'off'
  | 'delayTrigger'
  | 'delayWait'
  | 'onTrigger'
  | 'onWait'
  | 'on';
type Action = {
  isLoading: boolean;
  timerDone: boolean;
};

const reducer = (state: State, action: Action): State => {
  const { isLoading, timerDone } = action;
  switch (state) {
    case 'off': {
      return isLoading ? 'delayTrigger' : 'off';
    }
    case 'delayTrigger': {
      return isLoading ? 'delayWait' : 'off';
    }
    case 'delayWait': {
      return isLoading ? (timerDone ? 'onTrigger' : 'delayWait') : 'off';
    }
    case 'onTrigger': {
      return isLoading ? 'onWait' : 'off';
    }
    case 'onWait': {
      return timerDone ? 'on' : 'onWait';
    }
    case 'on': {
      return isLoading ? 'on' : 'off';
    }
  }
};

/**
 * Debounces `isLoading` input. If `isLoading` remains `true` for at least `initialDelay` miliseconds, this hook
 * will returns `true` for `minimalTimeOn` miliseconds.
 * @param isLoading - Input signal you wish to debounce (usually it connects to a spinner and indicates a pending operation)
 * @param initialDelay - Delay in miliseconds. Requests shorter than `initialDelay` will be ignored.
 * @param minimalTimeOn - Once spinner appears, it will stay on screen for a least `minimalTimeOn` miliseconds.
 * @returns Debounced `isLoading` signal
 */
export function useDebouncedLoader(
  isLoading: boolean,
  initialDelay: number = 400,
  minimalTimeOn: number = 400
): boolean {
  const [state, dispatch] = useReducer(reducer, 'off');
  const { start, done } = useTimer();

  useEffect(() => {
    if (state === 'delayTrigger') {
      start(initialDelay);
    } else if (state === 'onTrigger') {
      start(minimalTimeOn);
    }
    dispatch({ isLoading, timerDone: done });
  }, [state, isLoading, start, done, initialDelay, minimalTimeOn]);

  return state === 'on' || state === 'onWait';
}
