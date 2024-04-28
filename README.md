# Gallery Components

This page purpose is to integrate redux library with pure typescript boilerplate project to create reusable components that render page content on data fetching events.

## Business Features

- Static page header
- Dog gallery with dynamic content and refresh options
- Section headers with number of items in sections

## Technical Features

- Support for both TypeScript and JavaScript as needed.
- Loads environment variables via `.env` file.
- May be extended to be used with [React](https://reactjs.org/), [Vue.js](https://vuejs.org/), or [Angular](https://angular.io/).
- Minification of TypeScript/JavaScript and CSS processed files.
- Assets optimization.
- Webpack Dev Server plugin for local development.
- Webpack Bundle Analyzer for visualising script output and usage.
- CI workflow.

### Install dependencies

Run:

```sh
  yarn install
```

## Development

### Server

Run:

```sh
  yarn serve
```

This will create a server at `http://localhost:9000/` or server data specified in your `.env` file.

Automatically reloads after each file change.

### Production build

Run:

```sh
  yarn build
```

Will output all build files into the `dist` folder.

## Testing (Jest)

Run:

```sh
  yarn test
```

or watch files

```sh
  yarn test:watch
```
