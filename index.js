'use strict';

var gutil = require('gulp-util');
var through = require('through2');

var StyleStats = require('stylestats');
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
      
      switch (options.type) {
        case 'json':
          var json = JSON.stringify(result, null, 2);

          if (options.outfile) {
            file.contents = new Buffer(json);
            file.path = gutil.replaceExtension(file.path, '.json');
          } else {
            console.log(json);
          }
          
          that.push(file);
          return callback();
        case 'csv':
          var json2csv = require('json2csv');

          Object.keys(result).forEach(function(key) {
            result[key] = Array.isArray(result[key]) ? result[key].join(' ') : result[key];
          });

          json2csv({
            data: result,
            fields: Object.keys(result)
          }, function(err, csv) {

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
          var fs   = require('fs');
          var path = require('path');
          var _    = require('underscore');

          var templatePath = path.join(__dirname, '/node_modules/stylestats/assets/stats.template');
          var template = _.template(fs.readFileSync(templatePath, {
            encoding: 'utf8'
          }));

          var html = template({
            pretty: true,
            stats: prettify(result),
            published: result.published,
            paths: result.paths
          });

          if (options.outfile) {
            file.contents = new Buffer(html);
            file.path = gutil.replaceExtension(file.path, '.html');
          } else {
            console.log(html);
          }

          that.push(file);
          return callback();
        default:
          var Table = require('cli-table');

          var table = new Table({
            style: {
              head: ['cyan'],
              compact: options.simple
            }
          });

          prettify(result).forEach(function(data) {
            table.push(data);
          });
          
          var text = table.toString();

          if (options.outfile) {
            
          } else {
            console.log('StyleStats!\n' + text);
          }

          that.push(file);
          return callback();
      }
    });
  }, function (callback) {
    callback();
  });
};