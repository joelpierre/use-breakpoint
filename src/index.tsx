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
export type TBreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TPageWidthSize = `${string | number}`;
type TMediaQueries = ValueOf<
  | ReturnType<typeof minMatchMediaQueries>
  | ReturnType<typeof maxMatchMediaQueries>
>[];
type TMediaMatches = boolean[];
type TBreakpointOverrides = Partial<{
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
  xl: string | number;
}>;

const mapBreakpointToPageWidthSize: Record<TBreakpointSize, TPageWidthSize> = {
  xs: '360',
  sm: '640',
  md: '960',
  lg: '1280',
  xl: '1440',
};

const minMatchMediaQueries = ({
  xl,
  sm,
  md,
  lg,
  xs,
}: TBreakpointOverrides = {}): Record<
  TBreakpointSize,
  `(min-width: ${TPageWidthSize}px)`
> => {
  return {
    xs: `(min-width: ${xs ?? mapBreakpointToPageWidthSize.xs}px)`,
    sm: `(min-width: ${sm ?? mapBreakpointToPageWidthSize.sm}px)`,
    md: `(min-width: ${md ?? mapBreakpointToPageWidthSize.md}px)`,
    lg: `(min-width: ${lg ?? mapBreakpointToPageWidthSize.lg}px)`,
    xl: `(min-width: ${xl ?? mapBreakpointToPageWidthSize.xl}px)`,
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
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
};

const defaultContext: Record<TBreakpointDirection, TBreakPoint> = {
  min: {
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
  },
  max: {
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
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
  const [minXs, minSm, minMd, minLg, minXl] = useMatchMedia(Object.values(min));
  const [maxXs, maxSm, maxMd, maxLg, maxXl] = useMatchMedia(Object.values(max));
  const value = useMemo(
    () => ({
      min: {
        isXs: minXs,
        isSm: minSm,
        isMd: minMd,
        isLg: minLg,
        isXl: minXl,
      },
      max: {
        isXs: maxXs,
        isSm: maxSm,
        isMd: maxMd,
        isLg: maxLg,
        isXl: maxXl,
      },
    }),
    [maxLg, maxMd, maxSm, maxXl, maxXs, minLg, minMd, minSm, minXl, minXs],
  );
  return (
    <BreakPointContext.Provider value={value}>
      {children}
    </BreakPointContext.Provider>
  );
};
