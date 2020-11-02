import {  useEffect, useReducer} from 'react';
import { useTimer } from './useTimer';

type State = 'off' | 'delay' | 'on';

const reducer = (state: State, isLoading: boolean): State => {
  switch (state) {
    case 'off': {
      return isLoading ? 'delay' : 'off';
    }
    case 'delay': {
      return isLoading ? 'on' : 'off';
    }


    case 'on': {
      return isLoading ? 'on' : 'off';
    }
  }
};

export function useDebouncedLoader(isLoading: boolean): boolean {
  const [state, dispatch] = useReducer(reducer, isLoading ? 'delay' : 'off');
  const { start, done } = useTimer();

  useEffect(() => {
    if (state === 'off') {
      dispatch(isLoading);
    } else if (state === 'delay') {
      if (done) {
        dispatch(isLoading);
      } else {
        start(300);
      }
    } else if (state === 'on') {
      if (done) {
        dispatch(isLoading);
      } else {
        start(400);
      }
    }
  }, [state, isLoading, start, done]);

  return state === 'on' ? true : false;
}

