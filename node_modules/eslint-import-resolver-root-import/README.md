# Babel Plugin Root Import ESLint resolver

[![npm](https://img.shields.io/npm/v/eslint-import-resolver-root-import.svg?color=%237159c1)](https://www.npmjs.com/package/eslint-import-resolver-root-import)

Babel Plugin Root Import ESLint resolver.

*This is a fork of [eslint-import-resolver-babel-root-import](https://github.com/unconfident/eslint-import-resolver-babel-plugin-root-import) that works with latest version of Babel using `babel.config.js` for configaration.*

## Installation

```sh
yarn add eslint-plugin-import eslint-import-resolver-root-import
```

## Usage

Inside your `.eslintrc` file, pass this resolver to `eslint-plugin-import`:

```json
"settings": {
  "import/resolver": "root-import"
}
```

And see [babel-plugin-root-import] to know how to configure your prefix/suffix.

Configuration will be parsed down from `babel.config.js` file.

## Configuration

This plugin accept all configurations that [eslint-import-resolver-node](https://www.npmjs.com/package/eslint-import-resolver-node) accepts plus `rootPathSuffix` and `rootPathPrefix`.

*Both `rootPathSuffix` and `rootPathPrefix` are fetched by default from your `babel.config.js`, but if you prefer you can define these values inside `.eslintrc`.*

### Example

```json
{
  "extends": "airbnb",
  "rules": {},
  "settings": {
    "import/resolver": {
      "root-import": {
        "rootPathPrefix": "~",
        "rootPathSuffix": "src/js",
        "extensions": [".js", ".android.js", ".ios.js"]
      }
    }
  }
}
```

In this case we are using `.android.js` and `.ios.js` in our extensions so in React Native we can import files like:

```js
import MyComponent from '~/components/MyComponent';
```

And it will resolve to `components/MyComponent/index.android.js` or `components/MyComponent/index.ios.js`;

## License

MIT, see [LICENSE.md](/LICENSE.md) for details.
