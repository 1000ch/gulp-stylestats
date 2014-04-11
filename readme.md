# [gulp-stylestats](https://npmjs.org/package/gulp-stylestats)

## About

[![Build Status](https://travis-ci.org/1000ch/gulp-stylestats.svg?branch=master)](https://travis-ci.org/1000ch/gulp-stylestats)
[![NPM version](https://badge.fury.io/js/gulp-stylestats.png)](http://badge.fury.io/js/gulp-stylestats)
[![Dependency Status](https://david-dm.org/1000ch/gulp-stylestats.png)](https://david-dm.org/1000ch/gulp-stylestats)
[![devDependency Status](https://david-dm.org/1000ch/gulp-stylestats/dev-status.png)](https://david-dm.org/1000ch/gulp-stylestats#info=devDependencies)

## Usage

This is `gulpfile.js` sample.

```js
var gulp = require('gulp');
var stylestats = require('../');

gulp.task('stylestats', function () {
  gulp.src('./fixtures/*.css')
    .pipe(stylestats());
});

gulp.task('default', ['stylestats']);
```

## License

MIT