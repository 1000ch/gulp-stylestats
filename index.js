'use strict';

var gutil = require('gulp-util');
var through = require('through2');

var StyleStats = require('stylestats');
var Format = require('stylestats/lib/format');
var prettify = require('stylestats/lib/prettify');

module.exports = function (options) {

  options = options || {};

  return through.obj(function (file, encode, callback) {
    
    var that = this;

    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-stylestats', 'Streaming is not supported'));
      return callback();
    }

    var filePath = file.path;
    
    var stylestats = new StyleStats(file.contents.toString(), options.config);
    stylestats.parse(function (error, result) {
      
      if (error) {
        that.push(file);
        return callback(new gutil.PluginError('gulp-stylestats', error, {
          fileName: filePath
        }));
      }

      var format = new Format(result);
      
      switch (options.type) {
        case 'json':
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
        case 'csv':
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
          break;
        case 'html':
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
        default:
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
      }
    });
  }, function (callback) {
    callback();
  });
};