/**
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react-hooks';
import { useTimer } from '../src';

jest.useFakeTimers();

describe('useTimer', () => {
  it('updates `done` flag', () => {
    const { result } = renderHook(() => useTimer());
    const advanceAndAssert = (ms: number, state: boolean) => {
      act(() => {
        jest.advanceTimersByTime(ms);
      });
      expect(result.current.done).toEqual(state);
    };

    const time = 200;

    expect(result.current.done).toEqual(false);
    act(() => {
      result.current.start(time);
    });

    advanceAndAssert(time - 1, false);
    advanceAndAssert(1, true);
  });

  it('calls `clearTimeout` when unmounted', () => {
    const spy = jest.spyOn(window, 'clearTimeout');
    const { result, unmount } = renderHook(() => useTimer());

    act(() => {
      result.current.start(200);
    });

    unmount();
    expect(spy).toHaveBeenCalled();
  });

  it('can be reused', () => {
    const { result } = renderHook(() => useTimer());
    const advanceAndAssert = (ms: number, state: boolean) => {
      act(() => {
        jest.advanceTimersByTime(ms);
      });
      expect(result.current.done).toEqual(state);
    };

    const times = [200, 50];
    for (const time of times) {
      act(() => {
        result.current.start(time);
      });

      advanceAndAssert(time - 1, false);
      advanceAndAssert(1, true);
    }
  });
});
