# CLAUDE.md

## Project

react-use-breakpoint — A React hook library for responsive breakpoint detection using `window.matchMedia()`.

## Tech Stack

- React, TypeScript
- Build: Vite (ES module output)
- Test: Vitest + jsdom + React Testing Library
- Lint: ESLint + Prettier
- Release: Semantic Release

## Commands

```bash
yarn build        # Clean + vite build + tsc type generation
yarn test         # Run Vitest suite
yarn test:ci      # Run tests with coverage
yarn lint         # Check code style (prettier + eslint)
yarn lint:fix     # Auto-fix style issues
yarn typecheck    # Type checking only
```

## Architecture

- `src/index.tsx` — Single source file containing `BreakpointProvider`, `useBreakPoint` hook, and media query utilities
- `src/__tests__/` — Test files
- Output: `dist/index.es.js` + `dist/index.d.ts`

## Key Patterns

- Breakpoints are provided via React Context (`BreakpointProvider` wraps consumers)
- Default breakpoints: xs(360), sm(640), md(960), lg(1280), xl(1440), 2xl(1680)
- Supports both `min-width` and `max-width` queries with customizable values
- React >=16 peer dependency
