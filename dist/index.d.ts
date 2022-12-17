import { FC, ReactNode } from 'react';
export type ValueOf<ObjectType, ValueType extends keyof ObjectType = keyof ObjectType> = ObjectType[ValueType];
export type TBreakpointDirection = 'min' | 'max';
export type TBreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TPageWidthSize = `${string | number}`;
type TBreakpointOverrides = Partial<{
    xs: string | number;
    sm: string | number;
    md: string | number;
    lg: string | number;
    xl: string | number;
}>;
export declare const minMatchMediaQueries: ({ xl, sm, md, lg, xs, }?: TBreakpointOverrides) => Record<TBreakpointSize, `(min-width: ${TPageWidthSize}px)`>;
export declare const maxMatchMediaQueries: ({ xl, sm, md, lg, xs, }?: TBreakpointOverrides) => Record<TBreakpointSize, `(max-width: ${TPageWidthSize}px)`>;
type TBreakPoint = {
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
};
declare const defaultContext: Record<TBreakpointDirection, TBreakPoint>;
export declare function useBreakPoint(key: keyof typeof defaultContext): TBreakPoint;
export declare function useBreakPoint(key?: undefined): typeof defaultContext;
export declare const BreakpointProvider: FC<{
    children: ReactNode;
    breakpointOverrides?: TBreakpointOverrides;
}>;
export {};
