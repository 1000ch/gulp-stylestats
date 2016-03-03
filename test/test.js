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

  it('should log css statistics as HTML', function (done) {
    let count = 0;
    let stream = stylestats({
      type: 'html'
    });
    let fp = path.join(__dirname, 'fixtures/test.css');

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
    let count = 0;
    let stream = stylestats({
      type: 'html',
      outfile: true
    });
    let fp = path.join(__dirname, 'fixtures/test.css');
    let dest = path.join(__dirname, 'fixtures/test.html');

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
    let count = 0;
    let stream = stylestats({
      type: 'md'
    });
    let fp = path.join(__dirname, 'fixtures/test.css');

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
    let count = 0;
    let stream = stylestats({
      type: 'md',
      outfile: true
    });
    let fp = path.join(__dirname, 'fixtures/test.css');
    let dest = path.join(__dirname, 'fixtures/test.md');

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
    let count = 0;
    let stream = stylestats({
      type: 'template',
      templateFile: path.join(__dirname, 'fixtures/template.hbs')
    });
    let fp = path.join(__dirname, 'fixtures/test.css');

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
    let count = 0;
    let stream = stylestats({
      type: 'template',
      templateFile: path.join(__dirname, 'fixtures/template.hbs'),
      outfile: true
    });
    let fp = path.join(__dirname, 'fixtures/test.css');
    let dest = path.join(__dirname, 'fixtures/test.html');

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
    let count = 0;
    let stream = stylestats({
      type: 'template',
      templateFile: path.join(__dirname, 'fixtures/template.hbs'),
      extension: '.foo',
      outfile: true
    });
    let fp = path.join(__dirname, 'fixtures/test.css');
    let dest = path.join(__dirname, 'fixtures/test.foo');

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
