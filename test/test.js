'use strict';

const fs = require('fs');
const test = require('ava');
const gutil = require('gulp-util');
const stylestats = require('../');

test.cb('should log css statistics', t => {
  let count = 0;
  let stream = stylestats();
  let fp = `${__dirname}/fixtures/test.css`;

  stream.on('data', () => {
    count++;
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new gutil.File({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should create css statistics', t => {
  let count = 0;
  let stream = stylestats({
    outfile: true
  });
  let fp = `${__dirname}/fixtures/test.css`;
  let dest = `${__dirname}/fixtures/test.txt`;

  stream.on('data', file => {
    count++;
    t.is(file.path, dest);
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new gutil.File({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should create css statistics with config', t => {
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
  let fp = `${__dirname}/fixtures/test.css`;
  let dest = `${__dirname}/fixtures/test.txt`;

  stream.on('data', file => {
    count++;
    t.is(file.path, dest);
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new gutil.File({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should log multiple css statistics', t => {
  let count = 0;
  let stream = stylestats();
  let fp1 = `${__dirname}/fixtures/test.css`;
  let fp2 = `${__dirname}/fixtures/kite.css`;

  stream.on('data', () => {
    count++;
  });

  stream.on('end', () => {
    t.is(count, 2);
    t.end();
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

test.cb('should log css statistics as JSON', t => {
  let count = 0;
  let stream = stylestats({
    type: 'json'
  });
  let fp = `${__dirname}/fixtures/test.css`;

  stream.on('data', () => {
    count++;
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new gutil.File({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should create css statistics as JSON', t => {
  let count = 0;
  let stream = stylestats({
    type: 'json',
    outfile: true
  });
  let fp = `${__dirname}/fixtures/test.css`;
  let dest = `${__dirname}/fixtures/test.json`;

  stream.on('data', file => {
    count++;
    t.is(file.path, dest);
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new gutil.File({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should log css statistics as CSV', t => {
  let count = 0;
  let stream = stylestats({
    type: 'csv'
  });
  let fp = `${__dirname}/fixtures/test.css`;

  stream.on('data', () => {
    count++;
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new gutil.File({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should create css statistics as CSV', t => {
  let count = 0;
  let stream = stylestats({
    type: 'csv',
    outfile: true
  });
  let fp = `${__dirname}/fixtures/test.css`;
  let dest = `${__dirname}/fixtures/test.csv`;

  stream.on('data', file => {
    count++;
    t.is(file.path, dest);
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new gutil.File({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});
