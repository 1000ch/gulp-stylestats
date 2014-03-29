'use strict';

var Table = require('cli-table');
var numeral = require('numeral');
var json2csv = require('json2csv');
var _ = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string');
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
    var stylestats = new StyleStats(file.contents.toString(), options.config);
    stylestats.parse(function (result) {
      switch (options.extension) {
        case 'json':
          var json = JSON.stringify(result, null, 2);
          console.log(json);
          break;
        case 'csv':
          Object.keys(result).forEach(function(key) {
            result[key] = Array.isArray(result[key]) ? result[key].join(' ') : result[key];
          });
          json2csv({
            data: result,
            fields: Object.keys(result)
          }, function(err, csv) {
            console.log(csv);
          });
          break;
        case 'html':
          var template = path.join(__dirname, '../assets/stats.jade');
          var html = jade.renderFile(template, {
            pretty: true,
            stats: prettify(result),
            published: result.published,
            paths: result.paths
          });
          console.log(html);
          break;
        default:
          var table = new Table({
            style: {
              head: ['cyan'],
              compact: options.simple
            }
          });
          prettify(result).forEach(function(data) {
            table.push(data);
          });
          console.log(' StyleStats!\n' + table.toString());
          break;
      }
    });
    callback();
  }, function (callback) {
    callback();
  });
};

/**
 * Prettify StyleStats data.
 * @param {object} [result] StyleStats parse data. Required.
 * @return {array} prettified data.
 */
function prettify(result) {
  var collections = [];
  Object.keys(result).forEach(function(key) {
    var stats = {};
    var prop = _(_(key).humanize()).titleize();
    if (key === 'propertiesCount') {
      var array = [];
      result[key].forEach(function(item) {
        array.push([item.property, item.count]);
      });
      stats[prop] = array.join('\n').replace(/\,/g, ': ');
    } else if (key === 'size' || key === 'gzippedSize' || key === 'dataUriSize') {
      stats[prop] = numeral(result[key]).format('0.0b').replace(/\.0B/, 'B').replace(/0\.0/, '0');
    } else if (key === 'simplicity' || key === 'ratioOfDataUriSize') {
      stats[prop] = numeral(result[key]).format('0.00%');
    } else if (key === 'published' || key === 'paths') {
      return true;
    } else {
      stats[prop] = Array.isArray(result[key]) ? result[key].join('\n') : result[key];
      if (stats[prop] === '') {
        stats[prop] = 'N/A';
      }
    }
    collections.push(stats);
  });
  return collections;
}