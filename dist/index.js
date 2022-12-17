import React, { createContext, useContext, useEffect, useMemo, useState, } from 'react';
const mapBreakpointToPageWidthSize = {
    xs: '360',
    sm: '640',
    md: '960',
    lg: '1280',
    xl: '1440',
};
const minMatchMediaQueries = ({ xl, sm, md, lg, xs, } = {}) => {
    return {
        xs: `(min-width: ${xs !== null && xs !== void 0 ? xs : mapBreakpointToPageWidthSize.xs}px)`,
        sm: `(min-width: ${sm !== null && sm !== void 0 ? sm : mapBreakpointToPageWidthSize.sm}px)`,
        md: `(min-width: ${md !== null && md !== void 0 ? md : mapBreakpointToPageWidthSize.md}px)`,
        lg: `(min-width: ${lg !== null && lg !== void 0 ? lg : mapBreakpointToPageWidthSize.lg}px)`,
        xl: `(min-width: ${xl !== null && xl !== void 0 ? xl : mapBreakpointToPageWidthSize.xl}px)`,
    };
};
const maxMatchMediaQueries = ({ xl, sm, md, lg, xs, } = {}) => ({
    xs: `(max-width: ${xs !== null && xs !== void 0 ? xs : mapBreakpointToPageWidthSize.xs}px)`,
    sm: `(max-width: ${sm !== null && sm !== void 0 ? sm : mapBreakpointToPageWidthSize.sm}px)`,
    md: `(max-width: ${md !== null && md !== void 0 ? md : mapBreakpointToPageWidthSize.md}px)`,
    lg: `(max-width: ${lg !== null && lg !== void 0 ? lg : mapBreakpointToPageWidthSize.lg}px)`,
    xl: `(max-width: ${xl !== null && xl !== void 0 ? xl : mapBreakpointToPageWidthSize.xl}px)`,
});
/**
 * The MatchMedia API had a change of spec
 * originally it used `addListener` and `removeListener` so this still works in legacy browsers.
 * Then it was changed to `addEventListener` and `removeEventListener`
 * below we do checks to see if these methods are available, if not we use the old way
 */
const useMatchMedia = (queries) => {
    const [matches, setMatches] = useState(queries.map(() => false));
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
        return () => mediaQueryList.forEach(list => {
            if (list.removeEventListener) {
                return list.removeEventListener('change', handleResize);
            }
            return list.removeListener(handleResize);
        });
    }, [queries]);
    return matches;
};
const defaultContext = {
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
const BreakPointContext = createContext(defaultContext);
export function useBreakPoint(key) {
    const context = useContext(BreakPointContext);
    if (context === undefined) {
        throw new Error('useBreakPoint must be used within a BreakpointProvider. Wrap your app in a BreakpointProvider');
    }
    return key ? context[key] : context;
}
export const BreakpointProvider = ({ children, breakpointOverrides }) => {
    const min = useMemo(() => minMatchMediaQueries(breakpointOverrides), [breakpointOverrides]);
    const max = useMemo(() => maxMatchMediaQueries(breakpointOverrides), [breakpointOverrides]);
    const [minXs, minSm, minMd, minLg, minXl] = useMatchMedia(Object.values(min));
    const [maxXs, maxSm, maxMd, maxLg, maxXl] = useMatchMedia(Object.values(max));
    const value = useMemo(() => ({
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
    }), [maxLg, maxMd, maxSm, maxXl, maxXs, minLg, minMd, minSm, minXl, minXs]);
    return (React.createElement(BreakPointContext.Provider, { value: value }, children));
};
//# sourceMappingURL=index.js.map