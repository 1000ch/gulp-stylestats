'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var StyleStats = require('stylestats');
var Format = require('stylestats/lib/format');

var outputJSON = function outputJSON(that, options, file, result, callback) {
  var format = new Format(result);
  format.toJSON(function (json) {
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

var outputCSV = function outputCSV(that, options, file, result, callback) {
  var format = new Format(result);
  format.toCSV(function (csv) {
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

var outputHTML = function outputHTML(that, options, file, result, callback) {
  var format = new Format(result);
  format.toHTML(function (html) {
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

var outputTable = function outputTable(that, options, file, result, callback) {
  var format = new Format(result);
  format.toTable(function (table) {
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

module.exports = function () {
  var options = arguments[0] === undefined ? {} : arguments[0];

  return through.obj(function (file, encode, callback) {
    var _this = this;

    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-stylestats', 'Streaming is not supported'));
      return callback();
    }

    var contents = file.contents.toString();
    var config = options.config;
    var stylestats = new StyleStats(contents, config);

    stylestats.parse(function (error, result) {

      if (error) {
        _this.push(file);
        return callback(new gutil.PluginError('gulp-stylestats', error, {
          fileName: file.path
        }));
      }

      switch (options.type) {
        case 'json':
          return outputJSON(_this, options, file, result, callback);
          break;
        case 'csv':
          return outputCSV(_this, options, file, result, callback);
          break;
        case 'html':
          return outputHTML(_this, options, file, result, callback);
          break;
        default:
          return outputTable(_this, options, file, result, callback);
          break;
      }
    });
  }, function (callback) {
    callback();
  });
};

