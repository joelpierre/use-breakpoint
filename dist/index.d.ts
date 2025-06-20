import { FC, ReactNode } from 'react';
export type TBreakpointDirection = 'min' | 'max';
export type TBreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type TScreenSize = `${string | number}`;
type OverrideType = string | number;
export type TBreakpointOverrides = Partial<{
    xs: OverrideType;
    sm: OverrideType;
    md: OverrideType;
    lg: OverrideType;
    xl: OverrideType;
    '2xl': OverrideType;
}>;
export declare const DEFAULT_BREAK_POINTS: Readonly<{
    xs: "360";
    sm: "640";
    md: "960";
    lg: "1280";
    xl: "1440";
    '2xl': "1680";
}>;
export declare const replacePxInString: (value?: OverrideType) => string | number | undefined;
declare const minMatchMediaQueries: ({ xl, sm, md, lg, xs, ...overrides }?: TBreakpointOverrides) => Record<TBreakpointSize, `(min-width: ${TScreenSize}px)`>;
declare const maxMatchMediaQueries: ({ xl, sm, md, lg, xs, ...overrides }?: TBreakpointOverrides) => Record<TBreakpointSize, `(max-width: ${TScreenSize}px)`>;
export type TBreakPoint = {
    isXs: boolean;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
    is2Xl: boolean;
};
declare const defaultBreakPointContext: Record<TBreakpointDirection, TBreakPoint>;
export declare function useBreakPoint(key: keyof typeof defaultBreakPointContext): TBreakPoint;
export declare function useBreakPoint(key?: undefined): typeof defaultBreakPointContext;
export declare const BreakpointProvider: FC<{
    children: ReactNode;
    breakpointOverrides?: TBreakpointOverrides;
    mediaQueryMethods?: {
        min: typeof minMatchMediaQueries;
        max: typeof maxMatchMediaQueries;
    };
}>;
export {};
