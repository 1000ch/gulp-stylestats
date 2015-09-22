# [gulp-stylestats](https://npmjs.org/package/gulp-stylestats)

Gulp plugin for [StyleStats](http://github.com/t32k/stylestats).

[![Build Status](https://travis-ci.org/1000ch/gulp-stylestats.svg?branch=master)](https://travis-ci.org/1000ch/gulp-stylestats)
[![NPM version](https://badge.fury.io/js/gulp-stylestats.svg)](http://badge.fury.io/js/gulp-stylestats)
[![Dependency Status](https://david-dm.org/1000ch/gulp-stylestats.svg)](https://david-dm.org/1000ch/gulp-stylestats)
[![devDependency Status](https://david-dm.org/1000ch/gulp-stylestats/dev-status.svg)](https://david-dm.org/1000ch/gulp-stylestats#info=devDependencies)

## Install

Install via [npm](https://npmjs.org/package/gulp-stylestats):

```
npm install gulp-stylestats --save-dev
```

## Usage

This is `gulpfile.js` sample.

```js
var gulp = require('gulp');
var stylestats = require('gulp-stylestats');

gulp.task('stylestats', function () {
  gulp.src('./fixtures/*.css')
    .pipe(stylestats());
});

gulp.task('default', ['stylestats']);
```

Output StyleStats data (sample: JSON format).

```js
var gulp = require('gulp');
var stylestats = require('gulp-stylestats');

gulp.task('stylestats', function () {
  gulp.src('./fixtures/*.css')
    .pipe(stylestats({
      type: 'json',
      outfile: true
    }))
    .pipe(gulp.dest('./stats/'));
});

gulp.task('default', ['stylestats']);
```

## License

MIT: http://1000ch.mit-license.org
