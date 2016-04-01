/* eslint "node/no-unsupported-features": [2, {"version": 4}] */
'use strict';

const browserify = require('browserify');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const webserver = require('gulp-webserver');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

gulp.task('default', ['build', 'test']);

gulp.task('build', ['browserify']);
gulp.task('test', ['eslint']);
gulp.task('watch', ['serve'], () => {
    gulp.watch(['src/**/*.js'], ['browserify']);
    gulp.watch(['src/**/*.js', '.eslintrc.yml'], ['eslint']);
});

gulp.task('browserify', () =>
    browserify({
            entries: 'src',
            debug: true,
            standalone: 'Nekodice',
            transform: ['babelify'],
        })
        .bundle()
        .pipe(source('nekodice.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
);

gulp.task('eslint', () =>
    gulp.src(['src/**/*.js', 'gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
);

gulp.task('serve', () =>
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
        }))
);
