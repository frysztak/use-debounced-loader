import { act, renderHook } from '@testing-library/react-hooks';
import { useDebouncedLoader } from '../.';

jest.useFakeTimers();

describe('useDebouncedLoader', () => {
  it('stays low when tON < tDELAY', () => {
    const { result, rerender } = renderHook(
      ({ isLoading }) => useDebouncedLoader(isLoading, 400, 400),
      {
        initialProps: { isLoading: false },
      }
    );
    const advanceAndAssert = (ms: number, state: boolean) => {
      act(() => {
        jest.advanceTimersByTime(ms);
      });
      expect(result.current).toEqual(state);
    };

    expect(result.current).toEqual(false);

    advanceAndAssert(50, false);
    rerender({ isLoading: true });
    expect(result.current).toEqual(false);

    advanceAndAssert(50, false);
    rerender({ isLoading: false });
    expect(result.current).toEqual(false);

    advanceAndAssert(50, false);
  });

  it('goes high when tON > tDELAY', () => {
    const delay = 400;
    const minimalTimeOn = 200;

    const { result, rerender } = renderHook(
      ({ isLoading }) => useDebouncedLoader(isLoading, delay, minimalTimeOn),
      {
        initialProps: { isLoading: false },
      }
    );

    const advanceAndAssert = (ms: number, state: boolean) => {
      act(() => {
        jest.advanceTimersByTime(ms);
      });
      expect(result.current).toEqual(state);
    };

    expect(result.current).toEqual(false);

    rerender({ isLoading: true });
    advanceAndAssert(delay - 1, false);
    advanceAndAssert(1, true);

    rerender({ isLoading: false });

    advanceAndAssert(minimalTimeOn - 1, true);
    advanceAndAssert(1, false);
    advanceAndAssert(201, false);
  });

  it('stays high when tON > tDELAY + tMIN', () => {
    const delay = 400;
    const minimalTimeOn = 200;

    const { result, rerender } = renderHook(
      ({ isLoading }) => useDebouncedLoader(isLoading, delay, minimalTimeOn),
      {
        initialProps: { isLoading: false },
      }
    );

    const advanceAndAssert = (ms: number, state: boolean) => {
      act(() => {
        jest.advanceTimersByTime(ms);
      });
      expect(result.current).toEqual(state);
    };

    expect(result.current).toEqual(false);

    rerender({ isLoading: true });
    advanceAndAssert(delay - 1, false);
    advanceAndAssert(1, true);

    advanceAndAssert(minimalTimeOn, true);
    rerender({ isLoading: false });
    expect(result.current).toEqual(false);
    advanceAndAssert(50, false);
  });
});
