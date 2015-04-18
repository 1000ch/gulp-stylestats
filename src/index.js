'use strict';

const gutil = require('gulp-util');
const through = require('through2');
const StyleStats = require('stylestats');
const Format = require('stylestats/lib/format');

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
        case 'html':
          extension = '.html';
          method = 'toHTML';
          break;
        default:
          extension = '.txt';
          method = 'toTable';
          break;
      }

      format[method]((data) => {
        if (options.outfile) {
          file.contents = new Buffer(data);
          file.path = gutil.replaceExtension(file.path, extension);
        } else {
          console.log(data);
        }

        this.push(file);
        callback();
        return;
      });
    });
  }, function (callback) {
    callback();
  });
};
