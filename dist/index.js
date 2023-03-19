"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreakpointProvider = exports.useBreakPoint = void 0;
const react_1 = __importStar(require("react"));
const mapBreakpointToPageWidthSize = {
    xs: '360',
    sm: '640',
    md: '960',
    lg: '1280',
    xl: '1440',
    '2xl': '1680',
};
const replacePx = (value) => typeof value === 'string' ? value.replace(/px/gi, '') : value;
const minMatchMediaQueries = (_a = {}) => {
    var _b, _c, _d, _e, _f, _g;
    var { xl, sm, md, lg, xs } = _a, overrides = __rest(_a, ["xl", "sm", "md", "lg", "xs"]);
    return {
        xs: `(min-width: ${(_b = replacePx(xs)) !== null && _b !== void 0 ? _b : mapBreakpointToPageWidthSize.xs}px)`,
        sm: `(min-width: ${(_c = replacePx(sm)) !== null && _c !== void 0 ? _c : mapBreakpointToPageWidthSize.sm}px)`,
        md: `(min-width: ${(_d = replacePx(md)) !== null && _d !== void 0 ? _d : mapBreakpointToPageWidthSize.md}px)`,
        lg: `(min-width: ${(_e = replacePx(lg)) !== null && _e !== void 0 ? _e : mapBreakpointToPageWidthSize.lg}px)`,
        xl: `(min-width: ${(_f = replacePx(xl)) !== null && _f !== void 0 ? _f : mapBreakpointToPageWidthSize.xl}px)`,
        '2xl': `(min-width: ${(_g = replacePx(overrides['2xl'])) !== null && _g !== void 0 ? _g : mapBreakpointToPageWidthSize['2xl']}px)`,
    };
};
const maxMatchMediaQueries = ({ xl, sm, md, lg, xs, } = {}) => ({
    xs: `(max-width: ${xs !== null && xs !== void 0 ? xs : mapBreakpointToPageWidthSize.xs}px)`,
    sm: `(max-width: ${sm !== null && sm !== void 0 ? sm : mapBreakpointToPageWidthSize.sm}px)`,
    md: `(max-width: ${md !== null && md !== void 0 ? md : mapBreakpointToPageWidthSize.md}px)`,
    lg: `(max-width: ${lg !== null && lg !== void 0 ? lg : mapBreakpointToPageWidthSize.lg}px)`,
    xl: `(max-width: ${xl !== null && xl !== void 0 ? xl : mapBreakpointToPageWidthSize.xl}px)`,
    '2xl': `(max-width: ${xl !== null && xl !== void 0 ? xl : mapBreakpointToPageWidthSize['2xl']}px)`,
});
/**
 * The MatchMedia API had a change of spec
 * originally it used `addListener` and `removeListener` so this still works in legacy browsers.
 * Then it was changed to `addEventListener` and `removeEventListener`
 * below we do checks to see if these methods are available, if not we use the old way
 */
const useMatchMedia = (queries) => {
    const [matches, setMatches] = (0, react_1.useState)(queries.map(() => false));
    (0, react_1.useEffect)(() => {
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
const defaultContext = {
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
const BreakPointContext = (0, react_1.createContext)(defaultContext);
function useBreakPoint(key) {
    const context = (0, react_1.useContext)(BreakPointContext);
    if (context === undefined) {
        throw new Error('useBreakPoint must be used within a BreakpointProvider. Wrap your app in a BreakpointProvider');
    }
    return key ? context[key] : context;
}
exports.useBreakPoint = useBreakPoint;
const BreakpointProvider = ({ children, breakpointOverrides }) => {
    const min = (0, react_1.useMemo)(() => minMatchMediaQueries(breakpointOverrides), [breakpointOverrides]);
    const max = (0, react_1.useMemo)(() => maxMatchMediaQueries(breakpointOverrides), [breakpointOverrides]);
    const [minXs, minSm, minMd, minLg, minXl, min2Xl] = useMatchMedia(Object.values(min));
    const [maxXs, maxSm, maxMd, maxLg, maxXl, max2Xl] = useMatchMedia(Object.values(max));
    const value = (0, react_1.useMemo)(() => ({
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
    return (react_1.default.createElement(BreakPointContext.Provider, { value: value }, children));
};
exports.BreakpointProvider = BreakpointProvider;
//# sourceMappingURL=index.js.map