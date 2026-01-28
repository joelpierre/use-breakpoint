import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { BreakpointProvider, useBreakPoint } from '..';

const createMatchMediaMock = (matches: boolean = false) => {
  return (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
};

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation(createMatchMediaMock(false));
});

afterEach(() => {
  vi.restoreAllMocks();
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <BreakpointProvider>{children}</BreakpointProvider>
);

describe('useBreakPoint', () => {
  it('should return min and max breakpoints', () => {
    const { result } = renderHook(() => useBreakPoint(), { wrapper });
    expect(result.current).toMatchSnapshot();
  });

  it('should return min breakpoints', () => {
    const { result } = renderHook(() => useBreakPoint('min'), { wrapper });
    expect(result.current).toMatchSnapshot();
  });

  it('should return max breakpoints', () => {
    const { result } = renderHook(() => useBreakPoint('max'), { wrapper });
    expect(result.current).toMatchSnapshot();
  });

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useBreakPoint());
    }).toThrow(
      'useBreakPoint must be used within a BreakpointProvider. Wrap your app in a BreakpointProvider',
    );
  });
});
