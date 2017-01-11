'use strict';

const fs = require('fs');
const path = require('path');
const gutil = require('gulp-util');
const assert = require('power-assert');
const stylestats = require('../');

describe('gulp-stylestats', function () {
  it('should log css statistics', function (done) {
    let count = 0;
    let stream = stylestats();
    let fp = path.join(__dirname, 'fixtures/test.css');

    stream.on('data', function (file) {
      count++;
    });

    stream.on('end', function (error) {
      assert.strictEqual(count, 1);
      done();
    });

    stream.write(new gutil.File({
      path: fp,
      contents: fs.readFileSync(fp)
    }));

    stream.end();
  });

  it('should create css statistics', function (done) {
    let count = 0;
    let stream = stylestats({
      outfile: true
    });
    let fp = path.join(__dirname, 'fixtures/test.css');
    let dest = path.join(__dirname, 'fixtures/test.txt');

    stream.on('data', function (file) {
      count++;
      assert.equal(file.path, dest);
    });

    stream.on('end', function (error) {
      assert.strictEqual(count, 1);
      done();
    });

    stream.write(new gutil.File({
      path: fp,
      contents: fs.readFileSync(fp)
    }));

    stream.end();
  });

  it('should create css statistics with config', function (done) {
    let count = 0;
    let stream = stylestats({
      outfile: true,
      published: false,
      paths: false,
      stylesheets: false,
      styleElements: false,
      size: false,
      dataUriSize: false,
      ratioOfDataUriSize: false,
      gzippedSize: false,
      simplicity: false,
      rules: false,
      selectors: false,
      declarations: false,
      averageOfIdentifier: false,
      mostIdentifier: false,
      mostIdentifierSelector: false,
      averageOfCohesion: false,
      lowestCohesion: false,
      lowestCohesionSelector: false,
      totalUniqueFontSizes: false,
      uniqueFontSizes: false,
      totalUniqueFontFamilies: false,
      uniqueFontFamilies: false,
      totalUniqueColors: false,
      uniqueColors: false,
      totalUniqueBackgroundImages: false,
      uniqueBackgroundImages: false,
      idSelectors: false,
      universalSelectors: false,
      unqualifiedAttributeSelectors: false,
      userSpecifiedSelectors: false,
      importantKeywords: false,
      floatProperties: false,
      mediaQueries: false
    });
    let fp = path.join(__dirname, 'fixtures/test.css');
    let dest = path.join(__dirname, 'fixtures/test.txt');

    stream.on('data', function (file) {
      count++;
      assert.equal(file.path, dest);
    });

    stream.on('end', function (error) {
      assert.strictEqual(count, 1);
      done();
    });

    stream.write(new gutil.File({
      path: fp,
      contents: fs.readFileSync(fp)
    }));

    stream.end();
  });

  it('should log multiple css statistics', function (done) {
    let count = 0;
    let stream = stylestats();
    let fp1 = path.join(__dirname, 'fixtures/test.css');
    let fp2 = path.join(__dirname, 'fixtures/kite.css');

    stream.on('data', function (newFile) {
      count++;
    });

    stream.on('end', function (error) {
      assert.strictEqual(count, 2);
      done();
    });

    stream.write(new gutil.File({
      path: fp1,
      contents: fs.readFileSync(fp1)
    }));

    stream.write(new gutil.File({
      path: fp2,
      contents: fs.readFileSync(fp2)
    }));

    stream.end();
  });

  it('should log css statistics as JSON', function (done) {
    let count = 0;
    let stream = stylestats({
      type: 'json'
    });
    let fp = path.join(__dirname, 'fixtures/test.css');

    stream.on('data', function (newFile) {
      count++;
    });

    stream.on('end', function (error) {
      assert.strictEqual(count, 1);
      done();
    });

    stream.write(new gutil.File({
      path: fp,
      contents: fs.readFileSync(fp)
    }));

    stream.end();
  });

  it('should create css statistics as JSON', function (done) {
    let count = 0;
    let stream = stylestats({
      type: 'json',
      outfile: true
    });
    let fp = path.join(__dirname, 'fixtures/test.css');
    let dest = path.join(__dirname, 'fixtures/test.json');

    stream.on('data', function (file) {
      count++;
      assert.equal(file.path, dest);
    });

    stream.on('end', function (error) {
      assert.strictEqual(count, 1);
      done();
    });

    stream.write(new gutil.File({
      path: fp,
      contents: fs.readFileSync(fp)
    }));

    stream.end();
  });

  it('should log css statistics as CSV', function (done) {
    let count = 0;
    let stream = stylestats({
      type: 'csv'
    });
    let fp = path.join(__dirname, 'fixtures/test.css');

    stream.on('data', function (newFile) {
      count++;
    });

    stream.on('end', function (error) {
      assert.strictEqual(count, 1);
      done();
    });

    stream.write(new gutil.File({
      path: fp,
      contents: fs.readFileSync(fp)
    }));

    stream.end();
  });

  it('should create css statistics as CSV', function (done) {
    let count = 0;
    let stream = stylestats({
      type: 'csv',
      outfile: true
    });
    let fp = path.join(__dirname, 'fixtures/test.css');
    let dest = path.join(__dirname, 'fixtures/test.csv');

    stream.on('data', function (file) {
      count++;
      assert.equal(file.path, dest);
    });

    stream.on('end', function (error) {
      assert.strictEqual(count, 1);
      done();
    });

    stream.write(new gutil.File({
      path: fp,
      contents: fs.readFileSync(fp)
    }));

    stream.end();
  });
});
