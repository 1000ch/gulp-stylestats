"use strict";

var gutil = require("gulp-util");
var through = require("through2");

var StyleStats = require("stylestats");
var prettify = require("stylestats/lib/prettify");

var outputJSON = function (that, options, file, result, callback) {
  var json = JSON.stringify(result, null, 2);

  if (options.outfile) {
    file.contents = new Buffer(json);
    file.path = gutil.replaceExtension(file.path, ".json");
  } else {
    console.log(json);
  }

  that.push(file);
  return callback();
};

var outputCSV = function (that, options, file, result, callback) {
  var json2csv = require("json2csv");

  Object.keys(result).forEach(function (key) {
    result[key] = Array.isArray(result[key]) ? result[key].join(" ") : result[key];
  });

  json2csv({
    data: result,
    fields: Object.keys(result)
  }, function (error, csv) {
    if (options.outfile) {
      file.contents = new Buffer(csv);
      file.path = gutil.replaceExtension(file.path, ".csv");
    } else {
      console.log(csv);
    }

    that.push(file);
    return callback();
  });
};

var outputHTML = function (that, options, file, result, callback) {
  var fs = require("fs");
  var path = require("path");
  var _ = require("underscore");

  var templatePath = path.join(__dirname, "/node_modules/stylestats/assets/stats.template");
  var template = _.template(fs.readFileSync(templatePath, {
    encoding: "utf8"
  }));

  var html = template({
    pretty: true,
    stats: prettify(result),
    published: result.published,
    paths: result.paths
  });

  if (options.outfile) {
    file.contents = new Buffer(html);
    file.path = gutil.replaceExtension(file.path, ".html");
  } else {
    console.log(html);
  }

  that.push(file);
  return callback();
};

var outputTable = function (that, options, file, result, callback) {
  var Table = require("cli-table");

  var table = new Table({
    style: {
      head: ["cyan"],
      compact: options.simple
    }
  });

  prettify(result).forEach(function (data) {
    table.push(data);
  });

  if (options.outfile) {
    file.contents = new Buffer(table);
    file.path = gutil.replaceExtension(file.path, ".txt");
  } else {
    console.log("StyleStats!\n" + table);
  }

  that.push(file);
  return callback();
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
      this.emit("error", new gutil.PluginError("gulp-stylestats", "Streaming is not supported"));
      return callback();
    }

    var contents = file.contents.toString();
    var config = options.config;
    var stylestats = new StyleStats(contents, config);

    stylestats.parse(function (error, result) {
      if (error) {
        _this.push(file);
        return callback(new gutil.PluginError("gulp-stylestats", error, {
          fileName: file.path
        }));
      }

      switch (options.type) {
        case "json":
          return outputJSON(_this, options, file, result, callback);
          break;
        case "csv":
          return outputCSV(_this, options, file, result, callback);
          break;
        case "html":
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

