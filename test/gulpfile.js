var gulp = require('gulp');
var stylestats = require('../');

gulp.task('stylestats', function () {
  gulp.src('./fixtures/*.css')
    .pipe(stylestats());
});

gulp.task('default', ['stylestats']);