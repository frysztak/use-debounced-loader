import { act, renderHook } from '@testing-library/react-hooks';
import { useTimer } from '../.';

jest.useFakeTimers();

describe('useTimer', () => {
  it('updates `done` flag', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.done).toEqual(false);
    act(() => {
      result.current.start(200);
    });

    act(() => {
      jest.advanceTimersByTime(199);
    });
    expect(result.current.done).toEqual(false);

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current.done).toEqual(true);
  });

  it('calls `clearTimeout` when unmounted', () => {
    const spy = jest.spyOn(window, 'clearTimeout');
    const { result, unmount } = renderHook(() => useTimer());
    expect(result.current.done).toEqual(false);
    act(() => {
      result.current.start(200);
    });

    act(() => {
      jest.advanceTimersByTime(20);
    });
    expect(result.current.done).toEqual(false);

    unmount();
    expect(spy).toHaveBeenCalled();
  });

  it('can be reused', () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.done).toEqual(false);
    act(() => {
      result.current.start(200);
    });

    // run 1
    act(() => {
      jest.advanceTimersByTime(199);
    });
    expect(result.current.done).toEqual(false);

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current.done).toEqual(true);

    // run 2
    act(() => {
      result.current.start(50);
    });
    expect(result.current.done).toEqual(false);
    act(() => {
      jest.advanceTimersByTime(49);
    });
    expect(result.current.done).toEqual(false);

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current.done).toEqual(true);
  });
});
