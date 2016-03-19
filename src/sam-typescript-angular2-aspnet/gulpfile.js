/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/",
    npm: './node_modules/',
    lib: './wwwroot/lib/',
};

var libs = [
];

gulp.task("clean:js", function (cb) {
    rimraf(paths.webroot + "app/**/*.js", cb);
});

gulp.task("clean:js.map", function (cb) {
    rimraf(paths.webroot + "app/**/*.js.map", cb);
});

gulp.task("clean:css", function (cb) {

});

gulp.task("clean", ["clean:js", "clean:js.map", "clean:css"]);

gulp.task("copy:systemjs", function () {
    return gulp.src(paths.npm + '/systemjs/dist/**/*.*', { base: paths.npm + '/systemjs/dist/' })
    .pipe(gulp.dest(paths.lib + '/systemjs/'));
});

gulp.task("copy:rxjs", function () {
    return gulp.src(paths.npm + '/rxjs/bundles/*.*', { base: paths.npm + '/rxjs/bundles/' })
        .pipe(gulp.dest(paths.lib + 'rxjs/'));
});

gulp.task("copy:angular2", function () {
    return gulp.src(paths.npm + '/angular2/bundles/**/*.js', { base: paths.npm + '/angular2/bundles/' })
        .pipe(gulp.dest(paths.lib + '/angular2/'));
});

gulp.task("copy:es6-shim", function () {
    return gulp.src(paths.npm + '/es6-shim/es6-sh*', { base: paths.npm + '/es6-shim/' })
        .pipe(gulp.dest(paths.lib + '/es6-shim/'));
});

gulp.task("copy", ["copy:systemjs", "copy:rxjs", "copy:angular2", "copy:es6-shim"]);

gulp.task('default', ["clean", "copy"]);