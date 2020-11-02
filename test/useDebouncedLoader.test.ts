import { renderHook } from '@testing-library/react-hooks';
import { useDebouncedLoader } from '../.';
import { wait } from './utils';


describe('useDebouncedLoader', () => {
  it('ee', async () => {
    const { result, rerender } = renderHook(
      ({ isLoading }) => useDebouncedLoader(isLoading),
      {
        initialProps: { isLoading: false },
      }
    );
    expect(result.current).toEqual(false);

    await wait(50);
    rerender({ isLoading: true });
    await wait(50);
    expect(result.current).toEqual(false);
    rerender({ isLoading: false });
    await wait(50);
    expect(result.current).toEqual(false);
  });

  it('ee2', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ isLoading }) => useDebouncedLoader(isLoading),
      {
        initialProps: { isLoading: false },
      }
    );
    expect(result.current).toEqual(false);

    await wait(50);
    rerender({ isLoading: true });
    await wait(350);
    expect(result.current).toEqual(false);
    rerender({ isLoading: false });
    await wait(50);
    expect(result.current).toEqual(true);
    await waitForNextUpdate();
    expect(result.current).toEqual(false);
  });
});
