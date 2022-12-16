# @joelpierre/use-breakpoint

## Rational
A React hook to get the current breakpoint via the MatchMedia API. Tiny, fast, and easy to use. I created this as I found myself copying this bad boy around every project I did... so I figured I'd make it a package. Other plugins out there are not exactly what I needed, and although I think getting breakpoints in JS should be a **last resort**. There is undoubtedly a time and place for it. Especially as designers design more creative layouts that are not easily achievable with CSS alone.


## Getting Started

Install the package

```shell
npm install react-use-breakpoint
yarn add react-use-breakpoint
```

Wrap your apps root component with the `BreakpointProvider` component. This will provide the `useBreakpoint` hook to all child components.

```jsx
import { BreakpointProvider } from 'react-use-breakpoint';

const App = () => (
  <BreakpointProvider>
    <MyComponent />
  </BreakpointProvider>
);
```

## Basic Usage

Within all child components you can then leverage the `useBreakpoint` hook to get the current breakpoint.

Specifying no arguments will return an object with min and max breakpoints `{ min: {...}, max: {...} }`.

```jsx
import { useBreakpoint } from 'react-use-breakpoint';

const MyComponent = () => {
  const { min } = useBreakpoint();
  const { isXs } = min;

  return <div>Current breakpoint: {breakpoint}</div>;
};
```

If you specify a breakpoint "direction" (min or max) you will get an object with the current breakpoint and a boolean indicating if the current breakpoint is the requested breakpoint.

```jsx
import { useBreakpoint } from 'react-use-breakpoint';

const MyComponent = () => {
  const { isXs, isSm, isMd } = useBreakpoint('min');
  return <div>Current breakpoint: {breakpoint}</div>;
};
```

You can also customise the `xs, sm, md, lg, xl` to fit your needs.

## Feature Requests?
Sure... open up an issue, and I'll see what I can do.

## Todo

- [ ] Add tests
