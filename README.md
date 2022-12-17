# react-use-breakpoint

## Rational

A React hook to get the current breakpoint via the MatchMedia API. Tiny, fast, and easy to use. I created this as I
found myself copying this bad boy around every project I did... so I figured I'd make it a package. Other plugins out
there are not exactly what I needed, and although I think getting breakpoints in JS should be a **last resort**. There
is undoubtedly a time and place for it. Especially as designers design more creative layouts that are not easily
achievable with CSS alone.

## Getting Started

Install the package

```shell
npm install react-use-breakpoint
yarn add react-use-breakpoint
```

Wrap your apps root component with the `BreakpointProvider` component. This will provide the `useBreakpoint` hook to all
child components.

```tsx
import {BreakpointProvider} from 'react-use-breakpoint';

const App = () => (
    <BreakpointProvider>
        <MyComponent/>
    </BreakpointProvider>
);
```

The default breakpoint size values are:

| Breakpoint | Size (px) |
|------------|-----------|
| xs         | 360       |
| sm         | 640       |
| md         | 960       |
| lg         | 1280      |
| xl         | 1440      |

You can customise these values `xs, sm, md, lg, xl` to fit your needs like so (strings or numbers are accepted):

```tsx
import {BreakpointProvider} from 'react-use-breakpoint';

const App = () => (
    <BreakpointProvider
        breakpointOverrides={{
            xs: 360,
            sm: '400'
        }}
    >
        <MyComponent/>
    </BreakpointProvider>
);
```

## Hook Usage

Within all child components you can then leverage the `useBreakpoint()` hook to get the current breakpoints.

Specifying no arguments will return an object with min and max breakpoints `{ min: {...}, max: {...} }`. The function
overload handles the types for you 😉.

```tsx
import {useBreakpoint} from 'react-use-breakpoint';

const MyComponent = () => {
    const {min} = useBreakpoint();
    const {isXs} = min;

    return <div>Current breakpoint: {breakpoint}</div>;
};
```

If you specify a breakpoint "direction" (min or max) you will get an object back with all the breakpoint sizes and their
assigned `boolean` value.

```tsx
import {useBreakpoint} from 'react-use-breakpoint';

const MyComponent = () => {
    const {isXs, isSm, isMd} = useBreakpoint('min');
    // isXs = true
    // isSm = false
    // isMd = false
...
    return <div>Current breakpoint: {breakpoint}</div>;
};
```

## Feature Requests...

Sure... open up an issue, and I'll see what I can do.

## Todo

- [ ] Add tests for the hook
