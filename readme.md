# Deprecated

This is a code dump of something I made a long time ago, but never had the time to finish. There are lots of things that could have been done better.

---


# npmlint [![Build Status](https://travis-ci.org/sindresorhus/npmlint.svg?branch=master)](https://travis-ci.org/sindresorhus/npmlint)

> Lint your npm package

Makes sure your package is unicorn good.


## Install

```
$ npm install --global npmlint
```


## Usage

Go to the package you want to lint and run `npmlint`.


## API

```
$ npm install --save npmlint
```

```js
const npmlint = require('npmlint');

console.log(npmlint());
//=> ['suggestion', 'another suggestion']
```


## Dev

You can try it out by `cd`'ing into the `test` folder and running `../cli.js`


### Creating rules

Rules are located in a `rules` directory. These are loaded automatically.

A rule is initiated with an object containing:

- `cwd`: the current working directory
- `pkg`: the target package' package.json

It's expected to return an object or an array of object containing:

- `name`: a slug name for the rule
- `severity`: `info`, `warn`, `error`. Use your best judgement
- `message`: a message describing the violation


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
