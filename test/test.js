'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('power-assert');
var gutil = require('gulp-util');
var stylestats = require('../');

describe('gulp-stylestats', function () {

  it('should log css statistics', function (done) {

    var count = 0;
    var stream = stylestats();
    var fp = path.join(__dirname, 'fixtures/test.css');

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

  it('should create css statistics', function (done) {

    var count = 0;
    var stream = stylestats({
      outfile: true
    });
    var fp = path.join(__dirname, 'fixtures/test.css');
    var dest = path.join(__dirname, 'fixtures/test.txt');

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

    var count = 0;
    var stream = stylestats();
    var fp1 = path.join(__dirname, 'fixtures/test.css');
    var fp2 = path.join(__dirname, 'fixtures/kite.css');

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

    var count = 0;
    var stream = stylestats({
      type: 'json'
    });
    var fp = path.join(__dirname, 'fixtures/test.css');

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

    var count = 0;
    var stream = stylestats({
      type: 'json',
      outfile: true
    });
    var fp = path.join(__dirname, 'fixtures/test.css');
    var dest = path.join(__dirname, 'fixtures/test.json');

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

    var count = 0;
    var stream = stylestats({
      type: 'csv'
    });
    var fp = path.join(__dirname, 'fixtures/test.css');

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

    var count = 0;
    var stream = stylestats({
      type: 'csv',
      outfile: true
    });
    var fp = path.join(__dirname, 'fixtures/test.css');
    var dest = path.join(__dirname, 'fixtures/test.csv');

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

  it('should log css statistics as HTML', function (done) {

    var count = 0;
    var stream = stylestats({
      type: 'html'
    });
    var fp = path.join(__dirname, 'fixtures/test.css');

    stream.on('data', function (data) {
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

  it('should create css statistics as HTML', function (done) {

    var count = 0;
    var stream = stylestats({
      type: 'html',
      outfile: true
    });
    var fp = path.join(__dirname, 'fixtures/test.css');
    var dest = path.join(__dirname, 'fixtures/test.html');

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

  it('should log css statistics as Markdown', function (done) {

    var count = 0;
    var stream = stylestats({
      type: 'md'
    });
    var fp = path.join(__dirname, 'fixtures/test.css');

    stream.on('data', function (data) {
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

  it('should create css statistics as Markdown', function (done) {

    var count = 0;
    var stream = stylestats({
      type: 'md',
      outfile: true
    });
    var fp = path.join(__dirname, 'fixtures/test.css');
    var dest = path.join(__dirname, 'fixtures/test.md');

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

  it('should log css statistics as custom template format', function (done) {

    var count = 0;
    var stream = stylestats({
      type: 'template',
      templateFile: path.join(__dirname, 'fixtures/template.hbs')
    });
    var fp = path.join(__dirname, 'fixtures/test.css');

    stream.on('data', function (data) {
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

  it('should create css statistics as custom template format', function (done) {

    var count = 0;
    var stream = stylestats({
      type: 'template',
      templateFile: path.join(__dirname, 'fixtures/template.hbs'),
      outfile: true
    });
    var fp = path.join(__dirname, 'fixtures/test.css');
    var dest = path.join(__dirname, 'fixtures/test.html');

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

  it('should create css statistics as custom template format with specific extension', function (done) {

    var count = 0;
    var stream = stylestats({
      type: 'template',
      templateFile: path.join(__dirname, 'fixtures/template.hbs'),
      extension: '.foo',
      outfile: true
    });
    var fp = path.join(__dirname, 'fixtures/test.css');
    var dest = path.join(__dirname, 'fixtures/test.foo');

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
