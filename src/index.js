'use strict';

const gutil = require('gulp-util');
const through = require('through2');

const StyleStats = require('stylestats');
const prettify = require('stylestats/lib/prettify');

const outputJSON = function (that, options, file, result, callback) {
  let json = JSON.stringify(result, null, 2);

  if (options.outfile) {
    file.contents = new Buffer(json);
    file.path = gutil.replaceExtension(file.path, '.json');
  } else {
    console.log(json);
  }

  that.push(file);
  return callback();
};

const outputCSV = function (that, options, file, result, callback) {
  const json2csv = require('json2csv');

  Object.keys(result).forEach((key) => {
    result[key] = Array.isArray(result[key]) ? result[key].join(' ') : result[key];
  });

  json2csv({
    data: result,
    fields: Object.keys(result)
  }, (error, csv) => {

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
  const fs   = require('fs');
  const path = require('path');
  const _    = require('underscore');

  let templatePath = path.join(__dirname, '/node_modules/stylestats/assets/stats.template');
  if (!fs.existsSync(templatePath)) {
    templatePath = path.resolve(__dirname, '../stylestats/assets/stats.template');
  }
  let template = _.template(fs.readFileSync(templatePath, {
    encoding: 'utf8'
  }));

  let html = template({
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
};

const outputTable = function (that, options, file, result, callback) {
  const Table = require('cli-table');

  let table = new Table({
    style: {
      head: ['cyan'],
      compact: options.simple
    }
  });

  prettify(result).forEach((data) => {
    table.push(data);
  });

  if (options.outfile) {
    file.contents = new Buffer(table);
    file.path = gutil.replaceExtension(file.path, '.txt');
  } else {
    console.log('StyleStats!\n' + table);
  }

  that.push(file);
  return callback();
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
