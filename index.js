'use strict';

var Table = require('cli-table');
var numeral = require('numeral');
var json2csv = require('json2csv');
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string');
var fs = require('graceful-fs');
var map = require('map-stream');
var gutil = require('gulp-util');
var through = require('through2');
var StyleStats = require('stylestats');

module.exports = function (options) {
  
  options = options || {};
  
  return through.obj(function (file, encode, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-stylestats', 'Streaming not supported'));
      return callback();
    }

    var that = this;

    var stylestats = new StyleStats(file.path, options.config);
    stylestats.parse(function (result) {
      switch (options.extension) {
        case 'json':
          var output = JSON.stringify(result, null, 2);
          console.log(output);
        case 'csv':
          json2csv({
            data: result,
            fields: Object.keys(result)
          }, function (error, csv) {
            if (error) {
              throw error;
            }
            console.log(csv);
          });
        default:
          gutil.log('gulp-stylestats: Statistics of ' + gutil.colors.green(gutil.colors.green(file.path.replace(file.cwd, ''))));
          prettyLog(result, options.simple);
          break;
      }
      that.push(file);
      callback();
    });
  }, function (callback) {
    callback();
  });
};

function prettyLog(result, simple) {
  var table = new Table({
    style: {
      head: ['cyan'],
      compact: simple
    }
  });
  Object.keys(result).forEach(function(key) {
    var stats = {};
    var prop = _(_(key).humanize()).titleize();
    if (key === 'propertiesCount') {
      var array = [];
      result[key].forEach(function(item) {
        array.push([item.property, item.count]);
      });
      stats[prop] = array.join('\n').replace(/\,/g, ': ');
    } else if (key === 'size' || key === 'gzippedSize') {
      stats[prop] = numeral(result[key]).format('0.0b');
    } else if (key === 'simplicity') {
      stats[prop] = numeral(result[key]).format('0.00%');
    } else {
      stats[prop] = Array.isArray(result[key]) ? result[key].join('\n') : result[key];
      if (stats[prop] === '') {
        stats[prop] = 'N/A';
      }
    }
    table.push(stats);
  });
  console.log(table.toString());
}