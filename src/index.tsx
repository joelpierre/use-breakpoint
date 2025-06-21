'use client';

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ValueOf<
  ObjectType,
  ValueType extends keyof ObjectType = keyof ObjectType,
> = ObjectType[ValueType];

export type TBreakpointDirection = 'min' | 'max';
export type TBreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TScreenSize = `${string | number}`;
export type TMediaQueries = ValueOf<
  | ReturnType<typeof minMatchMediaQueries>
  | ReturnType<typeof maxMatchMediaQueries>
>[];
export type TMediaMatches = boolean[];
export type TBreakpointVal = string | number;
export type TBreakpointOverrides = Partial<{
  xs: TBreakpointVal;
  sm: TBreakpointVal;
  md: TBreakpointVal;
  lg: TBreakpointVal;
  xl: TBreakpointVal;
  '2xl': TBreakpointVal;
}>;

export const DEFAULT_BREAK_POINTS = Object.freeze({
  xs: '360',
  sm: '640',
  md: '960',
  lg: '1280',
  xl: '1440',
  '2xl': '1680',
});

export const replacePxInString = (value?: TBreakpointVal) =>
  typeof value === 'string' ? value.replace(/px/gi, '') : value;

const minMatchMediaQueries = ({
  xl,
  sm,
  md,
  lg,
  xs,
  ...overrides
}: TBreakpointOverrides = {}): Record<
  TBreakpointSize,
  `(min-width: ${TScreenSize}px)`
> => {
  return {
    xs: `(min-width: ${replacePxInString(xs ?? DEFAULT_BREAK_POINTS.xs)}px)`,
    sm: `(min-width: ${replacePxInString(sm ?? DEFAULT_BREAK_POINTS.sm)}px)`,
    md: `(min-width: ${replacePxInString(md ?? DEFAULT_BREAK_POINTS.md)}px)`,
    lg: `(min-width: ${replacePxInString(lg ?? DEFAULT_BREAK_POINTS.lg)}px)`,
    xl: `(min-width: ${replacePxInString(xl ?? DEFAULT_BREAK_POINTS.xl)}px)`,
    '2xl': `(min-width: ${replacePxInString(
      overrides['2xl'] ?? DEFAULT_BREAK_POINTS['2xl'],
    )}px)`,
  };
};

const maxMatchMediaQueries = ({
  xl,
  sm,
  md,
  lg,
  xs,
  ...overrides
}: TBreakpointOverrides = {}): Record<
  TBreakpointSize,
  `(max-width: ${TScreenSize}px)`
> => ({
  xs: `(max-width: ${replacePxInString(xs ?? DEFAULT_BREAK_POINTS.xs)}px)`,
  sm: `(max-width: ${replacePxInString(sm ?? DEFAULT_BREAK_POINTS.sm)}px)`,
  md: `(max-width: ${replacePxInString(md ?? DEFAULT_BREAK_POINTS.md)}px)`,
  lg: `(max-width: ${replacePxInString(lg ?? DEFAULT_BREAK_POINTS.lg)}px)`,
  xl: `(max-width: ${replacePxInString(xl ?? DEFAULT_BREAK_POINTS.xl)}px)`,
  '2xl': `(max-width: ${replacePxInString(
    overrides['2xl'] ?? DEFAULT_BREAK_POINTS['2xl'],
  )}px)`,
});

/**
 * The MatchMedia API had a change of spec
 * originally it used `addListener` and `removeListener` so this still works in legacy browsers.
 * Then it was changed to `addEventListener` and `removeEventListener`
 * below we do checks to see if these methods are available, if not we use the old way
 */
const useMatchMedia = (queries: TMediaQueries): TMediaMatches => {
  const [matches, setMatches] = useState<TMediaMatches>(
    queries.map(() => false),
  );

  useEffect(
    () => {
      const mediaQueryList = queries.map(query => window.matchMedia(query));
      const getMatch = () => mediaQueryList.map(mql => mql.matches);
      const handleResize = () => setMatches(getMatch());

      handleResize();

      mediaQueryList.forEach(list => {
        if (list.addEventListener) {
          return list.addEventListener('change', handleResize);
        }
        return list.addListener(handleResize);
      });

      return () =>
        mediaQueryList.forEach(list => {
          if (list.removeEventListener) {
            return list.removeEventListener('change', handleResize);
          }
          return list.removeListener(handleResize);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    queries,
  );

  return matches;
};

export type TBreakPoint = {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
};

export const defaultBreakPointContext: Record<
  TBreakpointDirection,
  TBreakPoint
> = {
  min: {
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2Xl: false,
  },
  max: {
    isXs: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2Xl: false,
  },
};

const BreakPointContext = createContext<typeof defaultBreakPointContext>(
  defaultBreakPointContext,
);

export function useBreakPoint(
  key: keyof typeof defaultBreakPointContext,
): TBreakPoint;
export function useBreakPoint(key?: undefined): typeof defaultBreakPointContext;
export function useBreakPoint(key?: keyof typeof defaultBreakPointContext) {
  const context = useContext(BreakPointContext);
  if (context === undefined) {
    throw new Error(
      'useBreakPoint must be used within a BreakpointProvider. Wrap your app in a BreakpointProvider',
    );
  }
  return key ? context[key] : context;
}

export const BreakpointProvider: FC<{
  children: ReactNode;
  breakpointOverrides?: TBreakpointOverrides;
  mediaQueryMethods?: {
    min: typeof minMatchMediaQueries;
    max: typeof maxMatchMediaQueries;
  };
}> = ({ children, breakpointOverrides, mediaQueryMethods }) => {
  const min = useMemo(
    () =>
      mediaQueryMethods?.min
        ? mediaQueryMethods.min(breakpointOverrides)
        : minMatchMediaQueries(breakpointOverrides),
    [breakpointOverrides, mediaQueryMethods],
  );
  const max = useMemo(
    () =>
      mediaQueryMethods?.max
        ? mediaQueryMethods.max(breakpointOverrides)
        : maxMatchMediaQueries(breakpointOverrides),
    [breakpointOverrides, mediaQueryMethods],
  );
  const [minXs, minSm, minMd, minLg, minXl, min2Xl] = useMatchMedia(
    Object.values(min),
  );
  const [maxXs, maxSm, maxMd, maxLg, maxXl, max2Xl] = useMatchMedia(
    Object.values(max),
  );
  const value = useMemo(
    () => ({
      min: {
        isXs: minXs,
        isSm: minSm,
        isMd: minMd,
        isLg: minLg,
        isXl: minXl,
        is2Xl: min2Xl,
      },
      max: {
        isXs: maxXs,
        isSm: maxSm,
        isMd: maxMd,
        isLg: maxLg,
        isXl: maxXl,
        is2Xl: max2Xl,
      },
    }),
    [
      max2Xl,
      maxLg,
      maxMd,
      maxSm,
      maxXl,
      maxXs,
      min2Xl,
      minLg,
      minMd,
      minSm,
      minXl,
      minXs,
    ],
  );
  return (
    <BreakPointContext.Provider value={value}>
      {children}
    </BreakPointContext.Provider>
  );
};
