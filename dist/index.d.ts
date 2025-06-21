import { FC, ReactNode } from 'react';
type ValueOf<ObjectType, ValueType extends keyof ObjectType = keyof ObjectType> = ObjectType[ValueType];
export type TBreakpointDirection = 'min' | 'max';
export type TBreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TScreenSize = `${string | number}`;
export type TMediaQueries = ValueOf<ReturnType<typeof minMatchMediaQueries> | ReturnType<typeof maxMatchMediaQueries>>[];
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
export declare const DEFAULT_BREAK_POINTS: Readonly<{
    xs: "360";
    sm: "640";
    md: "960";
    lg: "1280";
    xl: "1440";
    '2xl': "1680";
}>;
export declare const replacePxInString: (value?: TBreakpointVal) => string | number | undefined;
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
export declare const defaultBreakPointContext: Record<TBreakpointDirection, TBreakPoint>;
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
