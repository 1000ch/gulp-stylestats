'use strict';

const gutil = require('gulp-util');
const through = require('through2');
const StyleStats = require('stylestats');
const Format = require('stylestats/lib/format');

const outputJSON = function (that, options, file, result, callback) {
  let format = new Format(result);
  format.toJSON((json) => {
    if (options.outfile) {
      file.contents = new Buffer(json);
      file.path = gutil.replaceExtension(file.path, '.json');
    } else {
      console.log(json);
    }

    that.push(file);
    return callback();
  });
};

const outputCSV = function (that, options, file, result, callback) {
  let format = new Format(result);
  format.toCSV((csv) => {
    if (options.outfile) {
      file.contents = new Buffer(csv);
      file.path = gutil.replaceExtension(file.path, '.csv');
    } else {
      console.log(csv);
    }

    that.push(file);
    return callback();
  });
};

const outputHTML = function (that, options, file, result, callback) {
  let format = new Format(result);
  format.toHTML((html) => {
    if (options.outfile) {
      file.contents = new Buffer(html);
      file.path = gutil.replaceExtension(file.path, '.html');
    } else {
      console.log(html);
    }

    that.push(file);
    return callback();
  });
};

const outputTable = function (that, options, file, result, callback) {
  let format = new Format(result);
  format.toTable((table) => {
    if (options.outfile) {
      file.contents = new Buffer(table);
      file.path = gutil.replaceExtension(file.path, '.txt');
    } else {
      console.log('StyleStats!\n' + table);
    }

    that.push(file);
    return callback();
  });
};

module.exports = (options = {}) => {

  return through.obj(function (file, encode, callback) {

    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-stylestats', 'Streaming is not supported'));
      return callback();
    }

    let contents = file.contents.toString();
    let config = options.config;
    let stylestats = new StyleStats(contents, config);

    stylestats.parse((error, result) => {

      if (error) {
        this.push(file);
        return callback(new gutil.PluginError('gulp-stylestats', error, {
          fileName: file.path
        }));
      }

      switch (options.type) {
        case 'json':
          return outputJSON(this, options, file, result, callback);
          break;
        case 'csv':
          return outputCSV(this, options, file, result, callback);
          break;
        case 'html':
          return outputHTML(this, options, file, result, callback);
          break;
        default:
          return outputTable(this, options, file, result, callback);
          break;
      }
    });
  }, function (callback) {
    callback();
  });
};
