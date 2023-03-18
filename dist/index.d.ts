import { FC, ReactNode } from 'react';
export type TBreakpointDirection = 'min' | 'max';
export type TBreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type OverrideType = string | number;
type TBreakpointOverrides = Partial<{
    xs: OverrideType;
    sm: OverrideType;
    md: OverrideType;
    lg: OverrideType;
    xl: OverrideType;
    '2xl': OverrideType;
}>;
type TBreakPoint = {
    isXs: boolean;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
    is2Xl: boolean;
};
declare const defaultContext: Record<TBreakpointDirection, TBreakPoint>;
export declare function useBreakPoint(key: keyof typeof defaultContext): TBreakPoint;
export declare function useBreakPoint(key?: undefined): typeof defaultContext;
export declare const BreakpointProvider: FC<{
    children: ReactNode;
    breakpointOverrides?: TBreakpointOverrides;
}>;
export {};
