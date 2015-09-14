'use strict';

import fs from 'fs';
import gutil from 'gulp-util';
import through from 'through2';
import StyleStats from 'stylestats';
import Format from 'stylestats/lib/format';

export default (options = {}) => {

  return through.obj(function(file, encode, callback) {

    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-stylestats', 'Streaming is not supported'));
      return callback();
    }

    let config = options.config;
    let stylestats = new StyleStats(file.path, config);

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
        case 'md':
          extension = '.md';
          method = 'toMarkdown';
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
  }, callback => callback());
};
