import { FC, ReactNode } from 'react';
export type TBreakpointDirection = 'min' | 'max';
export type TBreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TBreakpointOverrides = Partial<{
    xs: string | number;
    sm: string | number;
    md: string | number;
    lg: string | number;
    xl: string | number;
}>;
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
