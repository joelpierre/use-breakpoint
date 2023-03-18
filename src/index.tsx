import React, {
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
type TPageWidthSize = `${string | number}`;
type TMediaQueries = ValueOf<
  | ReturnType<typeof minMatchMediaQueries>
  | ReturnType<typeof maxMatchMediaQueries>
>[];
type TMediaMatches = boolean[];
type OverrideType = string | number;
type TBreakpointOverrides = Partial<{
  xs: OverrideType;
  sm: OverrideType;
  md: OverrideType;
  lg: OverrideType;
  xl: OverrideType;
  '2xl': OverrideType;
}>;

const mapBreakpointToPageWidthSize: Record<TBreakpointSize, TPageWidthSize> = {
  xs: '360',
  sm: '640',
  md: '960',
  lg: '1280',
  xl: '1440',
  '2xl': '1440',
};

const replacePx = (value?: OverrideType) =>
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
  `(min-width: ${TPageWidthSize}px)`
> => {
  return {
    xs: `(min-width: ${replacePx(xs) ?? mapBreakpointToPageWidthSize.xs}px)`,
    sm: `(min-width: ${replacePx(sm) ?? mapBreakpointToPageWidthSize.sm}px)`,
    md: `(min-width: ${replacePx(md) ?? mapBreakpointToPageWidthSize.md}px)`,
    lg: `(min-width: ${replacePx(lg) ?? mapBreakpointToPageWidthSize.lg}px)`,
    xl: `(min-width: ${replacePx(xl) ?? mapBreakpointToPageWidthSize.xl}px)`,
    '2xl': `(min-width: ${
      replacePx(overrides['2xl']) ?? mapBreakpointToPageWidthSize['2xl']
    }px)`,
  };
};

const maxMatchMediaQueries = ({
  xl,
  sm,
  md,
  lg,
  xs,
}: TBreakpointOverrides = {}): Record<
  TBreakpointSize,
  `(max-width: ${TPageWidthSize}px)`
> => ({
  xs: `(max-width: ${xs ?? mapBreakpointToPageWidthSize.xs}px)`,
  sm: `(max-width: ${sm ?? mapBreakpointToPageWidthSize.sm}px)`,
  md: `(max-width: ${md ?? mapBreakpointToPageWidthSize.md}px)`,
  lg: `(max-width: ${lg ?? mapBreakpointToPageWidthSize.lg}px)`,
  xl: `(max-width: ${xl ?? mapBreakpointToPageWidthSize.xl}px)`,
  '2xl': `(max-width: ${xl ?? mapBreakpointToPageWidthSize['2xl']}px)`,
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

type TBreakPoint = {
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2Xl: boolean;
};

const defaultContext: Record<TBreakpointDirection, TBreakPoint> = {
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

const BreakPointContext = createContext<typeof defaultContext>(defaultContext);

export function useBreakPoint(key: keyof typeof defaultContext): TBreakPoint;
export function useBreakPoint(key?: undefined): typeof defaultContext;
export function useBreakPoint(key?: keyof typeof defaultContext) {
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
}> = ({ children, breakpointOverrides }) => {
  const min = useMemo(
    () => minMatchMediaQueries(breakpointOverrides),
    [breakpointOverrides],
  );
  const max = useMemo(
    () => maxMatchMediaQueries(breakpointOverrides),
    [breakpointOverrides],
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
