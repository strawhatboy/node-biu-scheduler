'use strict';

let gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var dependencies = require('./dependencies');
var path = require('path');

const dirs = {
    src: 'src/**/*.js',
    dest: 'build'
};

gulp.task('clean', function () {
    return gulp.src(dirs.dest, { read: false })
        .pipe(clean());
});

gulp.task('installResources', ['clean'], function () {
    // all other files
    return gulp.src(['src/**/!(*.js)', '!logs/'])
        .pipe(gulp.dest(dirs.dest));
});

gulp.task('copyDependencies', ['clean', 'installResources', 'install'], function () {
    return gulp.src(dependencies(), { base: '.' })
        .pipe(gulp.dest(dirs.dest));
});

gulp.task('install', ['clean', 'installResources'], function () {
    return gulp.src([dirs.src])
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(sourcemaps.write('.', { sourceRoot: path.join(__dirname, 'src') }))
        .pipe(gulp.dest(dirs.dest));
});

gulp.task('default', ['clean', 'installResources', 'install', 'copyDependencies']);