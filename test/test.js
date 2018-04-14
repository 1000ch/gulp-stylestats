'use strict';

const fs = require('fs');
const path = require('path');
const test = require('ava');
const Vinyl = require('vinyl');
const stylestats = require('..');

test.cb('should log css statistics', t => {
  let count = 0;
  const stream = stylestats();
  const fp = `${__dirname}/fixtures/test.css`;

  stream.on('data', () => {
    count++;
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new Vinyl({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should create css statistics', t => {
  let count = 0;
  const stream = stylestats({
    outfile: true
  });
  const fp = path.join(__dirname, '/fixtures/test.css');
  const dest = path.join(__dirname, '/fixtures/test.txt');

  stream.on('data', file => {
    count++;
    t.is(file.path, dest);
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new Vinyl({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should create css statistics with config', t => {
  let count = 0;
  const stream = stylestats({
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
  const fp = path.join(__dirname, '/fixtures/test.css');
  const dest = path.join(__dirname, '/fixtures/test.txt');

  stream.on('data', file => {
    count++;
    t.is(file.path, dest);
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new Vinyl({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should log multiple css statistics', t => {
  let count = 0;
  const stream = stylestats();
  const fp1 = path.join(__dirname, '/fixtures/test.css');
  const fp2 = path.join(__dirname, '/fixtures/kite.css');

  stream.on('data', () => {
    count++;
  });

  stream.on('end', () => {
    t.is(count, 2);
    t.end();
  });

  stream.write(new Vinyl({
    path: fp1,
    contents: fs.readFileSync(fp1)
  }));

  stream.write(new Vinyl({
    path: fp2,
    contents: fs.readFileSync(fp2)
  }));

  stream.end();
});

test.cb('should log css statistics as JSON', t => {
  let count = 0;
  const stream = stylestats({
    type: 'json'
  });
  const fp = path.join(__dirname, '/fixtures/test.css');

  stream.on('data', () => {
    count++;
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new Vinyl({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should create css statistics as JSON', t => {
  let count = 0;
  const stream = stylestats({
    type: 'json',
    outfile: true
  });
  const fp = path.join(__dirname, '/fixtures/test.css');
  const dest = path.join(__dirname, '/fixtures/test.json');

  stream.on('data', file => {
    count++;
    t.is(file.path, dest);
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new Vinyl({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should log css statistics as CSV', t => {
  let count = 0;
  const stream = stylestats({
    type: 'csv'
  });
  const fp = path.join(__dirname, '/fixtures/test.css');

  stream.on('data', () => {
    count++;
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new Vinyl({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});

test.cb('should create css statistics as CSV', t => {
  let count = 0;
  const stream = stylestats({
    type: 'csv',
    outfile: true
  });
  const fp = path.join(__dirname, '/fixtures/test.css');
  const dest = path.join(__dirname, '/fixtures/test.csv');

  stream.on('data', file => {
    count++;
    t.is(file.path, dest);
  });

  stream.on('end', () => {
    t.is(count, 1);
    t.end();
  });

  stream.write(new Vinyl({
    path: fp,
    contents: fs.readFileSync(fp)
  }));

  stream.end();
});
