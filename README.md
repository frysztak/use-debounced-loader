<p align="center">
  <img src="https://raw.githubusercontent.com/frysztak/use-debounced-loader/main/logo.svg" width="200px" height="200px" alt="logo">
  <h2 align="center">useDebouncedLoader</h2>
  <p align="center">
    ✨ Configurable hook to avoid flickering spinners
    <br>
    <br>
    <a href="https://frysztak.github.io/use-debounced-loader/">🎮 View Demo</a>
  </p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/use-debounced-loader" target="_blank">
    <img src="https://badgen.net/npm/v/use-debounced-loader">
  </a>
  <a href="#">
    <img src="https://badgen.net/npm/dt/use-debounced-loader">
  </a>
	<a href="#">
		<img src="https://badgen.net/npm/license/use-debounced-loader">
	</a>
  <br />
  <a href="#">
    <img src="https://badgen.net/bundlephobia/minzip/use-debounced-loader">
  </a>
  <a href="#">
    <img src="https://badgen.net/bundlephobia/dependency-count/use-debounced-loader">
  </a>
  <a href="#">
    <img src="https://badgen.net/npm/types/use-debounced-loader">
  </a>
</p>

## Table of Contents

- [📜 About](#-about)
- [🏁 Getting started](#-getting-started)
- [👨‍💻 Development](#-development)
- [🙏 Acknowledgements](#-acknowledgements)

## 📜 About

**useDebouncedLoader** is a tiny React hook designed to debounce loaders/spinners.

Using regular `debounce()` function (either from Lodash, many hookified versions or `debounceTime()` from RxJS) is a popular choice for
debouncing spinners shown when your app is awaiting some API response. However, misadjusting its `delay` parameter can result in suboptimal UX. For instance:

- for relatively short debounce time (say, 100..300 ms) it can still cause a little bit of flickering. That's because `debounce()` propagates time on (time, when input stays high).
  To remedy this, you can increase debounce time, but then...
- for relatively long debounce time (say, 600..800 ms) and relatively long response time, it can cause _lingering_. That's when spinner lingers on screen, even though
  request is already finished. This can turn out to be quite bad for User Experience, as your app will seem slower and less responsive.

This library aims to avoid both flickering and lingering spinners. It does so by introducing another parameter called `minimalTimeOn`. That's the minimal time spinner will stay on screen.

For more details, see (a very short!) API [docs](https://github.com/frysztak/use-debounced-loader/blob/main/docs/modules/_usedebouncedloader_.md). You can also check out [comparison](https://frysztak.github.io/use-debounced-loader/) with a popular [useDebounce](https://github.com/xnimorz/use-debounce) library.

## 🏁 Getting Started

It's very simple. Just run

```sh
yarn add use-debounced-loader
```

or

```sh
npm install use-debounced-loader
```

In your app, you might have code looking roughly like this:

```ts
const { isLoading, data, ... } = useQuery(...);

if (isLoading) {
  return <Spinner />
}
```

All you need to do, is to debounce `isLoading`:

```ts
const { isLoading, data, ... } = useQuery(...);
const debouncedIsLoading = useDebouncedLoader(isLoading);

if (debouncedIsLoading) {
  return <Spinner />
}
```

and that's it!

## 👨‍💻 Development

Pull requests are very welcome. This projects has been bootstrapped with awesome [tsdx](https://tsdx.io), so getting started is very easy. All regular commands apply here as well.

Demo app uses [Chakra-UI](https://chakra-ui.com/) and [react-timing-hooks](https://github.com/EricLambrecht/react-timing-hooks).

## 🙏 Acknowledgements

Logo adapted from icon made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>.
