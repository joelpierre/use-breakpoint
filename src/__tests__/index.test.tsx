import { renderHook } from '@testing-library/react';
import { useBreakPoint } from '..';

describe('useBeakPoint', () => {
  it('should return min and max breakpoints', () => {
    const { result } = renderHook(() => useBreakPoint());
    expect(result.current).toMatchSnapshot();
  });

  it('should return min breakpoints', () => {
    const { result } = renderHook(() => useBreakPoint('min'));
    expect(result.current).toMatchSnapshot();
  });

  it('should return max breakpoints', () => {
    const { result } = renderHook(() => useBreakPoint('max'));
    expect(result.current).toMatchSnapshot();
  });
});
