'use strict';

var Table = require('cli-table');
var json2csv = require('json2csv');
var gutil = require('gulp-util');
var through = require('through2');

var StyleStats = require('stylestats');
var prettify = require('stylestats/lib/prettify');

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
    stylestats.parse(function (error, result) {
      switch (options.type) {
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
      that.push(file);
      callback();
    });
  }, function (callback) {
    callback();
  });
};