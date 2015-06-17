'use strict';

var gutil = require('gulp-util');
var through = require('through2');
var StyleStats = require('stylestats');
var Format = require('stylestats/lib/format');
var fs = require('fs');

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

      var format = new Format(result);
      var extension = undefined;
      var method = undefined;

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
        case 'template':
          format.setTemplate(fs.readFileSync(options.templateFile, {
            encoding: 'utf8'
          }));
          extension = options.extension || '.html';
          method = 'parseTemplate';
          break;
        default:
          extension = '.txt';
          method = 'toTable';
          break;
      }

      format[method](function (data) {
        if (options.outfile) {
          file.contents = new Buffer(data);
          file.path = gutil.replaceExtension(file.path, extension);
        } else {
          console.log(data);
        }

        _this.push(file);
        callback();
        return;
      });
    });
  }, function (callback) {
    callback();
  });
};

