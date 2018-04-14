'use strict';

const PluginError = require('plugin-error');
const replaceExt = require('replace-ext');
const through = require('through2');
const StyleStats = require('stylestats');
const Format = require('stylestats/lib/format');

module.exports = (options = {}) => through.obj(function (file, encode, callback) {
  if (file.isNull()) {
    this.push(file);
    return callback();
  }

  if (file.isStream()) {
    this.emit('error', new PluginError('gulp-stylestats', 'Streaming is not supported'));
    return callback();
  }

  let stylestats = new StyleStats(file.path, options);

  stylestats.parse().then(result => {
    let format = new Format(result);
    let extension;
    let method;

    switch (options.type) {
      case 'json':
        extension = '.json';
        method = 'toJSON';
        break;
      case 'csv':
        extension = '.csv';
        method = 'toCSV';
        break;
      default:
        extension = '.txt';
        method = 'toTable';
        break;
    }

    Promise.resolve(format[method]()).then(data => {
      if (options.outfile) {
        file.contents = new Buffer(data);
        file.path = replaceExt(file.path, extension);
      } else {
        console.log(data);
      }

      this.push(file);
      callback();
    });
  }).catch(err => {
    this.push(file);
    callback(new PluginError('gulp-stylestats', err, {
      fileName: file.path
    }));
  });
}, callback => callback());
