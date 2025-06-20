var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState, } from 'react';
export const DEFAULT_BREAK_POINTS = Object.freeze({
    xs: '360',
    sm: '640',
    md: '960',
    lg: '1280',
    xl: '1440',
    '2xl': '1680',
});
export const replacePxInString = (value) => typeof value === 'string' ? value.replace(/px/gi, '') : value;
const minMatchMediaQueries = (_a = {}) => {
    var _b, _c, _d, _e, _f, _g;
    var { xl, sm, md, lg, xs } = _a, overrides = __rest(_a, ["xl", "sm", "md", "lg", "xs"]);
    return {
        xs: `(min-width: ${(_b = replacePxInString(xs)) !== null && _b !== void 0 ? _b : DEFAULT_BREAK_POINTS.xs}px)`,
        sm: `(min-width: ${(_c = replacePxInString(sm)) !== null && _c !== void 0 ? _c : DEFAULT_BREAK_POINTS.sm}px)`,
        md: `(min-width: ${(_d = replacePxInString(md)) !== null && _d !== void 0 ? _d : DEFAULT_BREAK_POINTS.md}px)`,
        lg: `(min-width: ${(_e = replacePxInString(lg)) !== null && _e !== void 0 ? _e : DEFAULT_BREAK_POINTS.lg}px)`,
        xl: `(min-width: ${(_f = replacePxInString(xl)) !== null && _f !== void 0 ? _f : DEFAULT_BREAK_POINTS.xl}px)`,
        '2xl': `(min-width: ${(_g = replacePxInString(overrides['2xl'])) !== null && _g !== void 0 ? _g : DEFAULT_BREAK_POINTS['2xl']}px)`,
    };
};
const maxMatchMediaQueries = (_a = {}) => {
    var _b, _c, _d, _e, _f, _g;
    var { xl, sm, md, lg, xs } = _a, overrides = __rest(_a, ["xl", "sm", "md", "lg", "xs"]);
    return ({
        xs: `(max-width: ${(_b = replacePxInString(xs)) !== null && _b !== void 0 ? _b : DEFAULT_BREAK_POINTS.xs}px)`,
        sm: `(max-width: ${(_c = replacePxInString(sm)) !== null && _c !== void 0 ? _c : DEFAULT_BREAK_POINTS.sm}px)`,
        md: `(max-width: ${(_d = replacePxInString(md)) !== null && _d !== void 0 ? _d : DEFAULT_BREAK_POINTS.md}px)`,
        lg: `(max-width: ${(_e = replacePxInString(lg)) !== null && _e !== void 0 ? _e : DEFAULT_BREAK_POINTS.lg}px)`,
        xl: `(max-width: ${(_f = replacePxInString(xl)) !== null && _f !== void 0 ? _f : DEFAULT_BREAK_POINTS.xl}px)`,
        '2xl': `(max-width: ${(_g = replacePxInString(overrides['2xl'])) !== null && _g !== void 0 ? _g : DEFAULT_BREAK_POINTS['2xl']}px)`,
    });
};
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
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    queries);
    return matches;
};
const defaultBreakPointContext = {
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
const BreakPointContext = createContext(defaultBreakPointContext);
export function useBreakPoint(key) {
    const context = useContext(BreakPointContext);
    if (context === undefined) {
        throw new Error('useBreakPoint must be used within a BreakpointProvider. Wrap your app in a BreakpointProvider');
    }
    return key ? context[key] : context;
}
export const BreakpointProvider = ({ children, breakpointOverrides, mediaQueryMethods }) => {
    const min = useMemo(() => (mediaQueryMethods === null || mediaQueryMethods === void 0 ? void 0 : mediaQueryMethods.min)
        ? mediaQueryMethods.min(breakpointOverrides)
        : minMatchMediaQueries(breakpointOverrides), [breakpointOverrides, mediaQueryMethods]);
    const max = useMemo(() => (mediaQueryMethods === null || mediaQueryMethods === void 0 ? void 0 : mediaQueryMethods.max)
        ? mediaQueryMethods.max(breakpointOverrides)
        : maxMatchMediaQueries(breakpointOverrides), [breakpointOverrides, mediaQueryMethods]);
    const [minXs, minSm, minMd, minLg, minXl, min2Xl] = useMatchMedia(Object.values(min));
    const [maxXs, maxSm, maxMd, maxLg, maxXl, max2Xl] = useMatchMedia(Object.values(max));
    const value = useMemo(() => ({
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
    }), [
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
    ]);
    return (_jsx(BreakPointContext.Provider, { value: value, children: children }));
};
//# sourceMappingURL=index.js.map