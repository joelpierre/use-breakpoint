# useBreakpoint

A React hook to get the current breakpoint via the MatchMedia API. Tiny, fast, and easy to use.

## Getting Started 

Wrap your apps root component with the `BreakpointProvider` component. This will provide the `useBreakpoint` hook to all child components.

```jsx
import { BreakpointProvider } from 'use-breakpoint';

const App = () => (
  <BreakpointProvider>
    <MyComponent />
  </BreakpointProvider>
);
```

Within all child components you can then leverage the `useBreakpoint` hook to get the current breakpoint.

Specifying no arguments will return an object with min and max breakpoints `{ min: {...}, max: {...} }`.

```jsx
import { useBreakpoint } from 'use-breakpoint';

const MyComponent = () => {
  const {min} = useBreakpoint();
  const {isXs} = min;

  return <div>Current breakpoint: {breakpoint}</div>;
};
```

if you specify a breakpoint "direction" (min or max) you will get an object with the current breakpoint and a boolean indicating if the current breakpoint is the specified breakpoint.

```jsx
import { useBreakpoint } from 'use-breakpoint';

const MyComponent = () => {
  const {isXs, isSm, isMd} = useBreakpoint('min');
  return <div>Current breakpoint: {breakpoint}</div>;
};
```

## Todo
- [ ] Add tests