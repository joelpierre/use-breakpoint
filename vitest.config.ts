import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    env: loadEnv('', process.cwd(), ''),
    globals: true,
    root: __dirname,
    deps: {
      moduleDirectories: ['node_modules'],
    },
    exclude: ['**/node_modules/**', 'dist/**'],
    coverage: {
      include: ['src/**'],
      exclude: ['*.test.*', '*.spec.*'],
      reporter: ['lcov'],
    },
    reporters: [
      'default',
      [
        'vitest-sonar-reporter',
        {
          outputFile: 'sonar-report.xml',
          onWritePath(path: string) {
            // Prefix all paths with root directory
            // e.g. '<file path="test/math.ts">' to '<file path="X/test/math.ts">'
            return `${path}`;
          },
        },
      ],
    ],
  },
});
