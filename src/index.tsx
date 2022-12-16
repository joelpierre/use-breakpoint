import React, {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type ValueOf<
  ObjectType,
  ValueType extends keyof ObjectType = keyof ObjectType,
> = ObjectType[ValueType];

export type TBreakpointDirection = 'min' | 'max';
export type TBreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TPageWidthSize = `${number}`;
type TMediaQueries = ValueOf<
  | ReturnType<typeof minMatchMediaQueries>
  | ReturnType<typeof maxMatchMediaQueries>
>[];
type TMediaMatches = boolean[];
type TBreakpointOptions = Partial<{
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}>;

const mapBreakpointToPageWidthSize: Record<TBreakpointSize, TPageWidthSize> = {
  xs: '360',
  sm: '640',
  md: '960',
  lg: '1280',
  xl: '1440',
};

export const minMatchMediaQueries = ({
  xl,
  sm,
  md,
  lg,
  xs,
}: TBreakpointOptions = {}): Record<
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

export const maxMatchMediaQueries = ({
  xl,
  sm,
  md,
  lg,
  xs,
}: TBreakpointOptions = {}): Record<
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

  useEffect(() => {
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
  }, [queries]);

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

const BreakPointContext =
  React.createContext<typeof defaultContext>(defaultContext);

export function useBreakPoint(key: keyof typeof defaultContext): TBreakPoint;
export function useBreakPoint(key?: undefined): typeof defaultContext;
export function useBreakPoint(key?: keyof typeof defaultContext) {
  const context = useContext(BreakPointContext);
  return key ? context[key] : context;
}

export const BreakPointProvider: FC<{
  children: ReactNode;
  breakpointOptions?: TBreakpointOptions;
}> = ({ children, breakpointOptions }) => {
  const min = useMemo(
    () => minMatchMediaQueries(breakpointOptions),
    [breakpointOptions],
  );
  const max = useMemo(
    () => maxMatchMediaQueries(breakpointOptions),
    [breakpointOptions],
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
