/**
 * Created by web on 24.01.2018.
 */

"use strict";

var config = {
    srcDir: './src',
    sassPattern: 'sass/**/*.scss',
    jsPattern: 'js/**/*.js'
};

var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    prefix = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
/*    livereload = require('gulp-livereload'),*/
    uglify = require('gulp-uglify'),
    concatJs = require('gulp-concat');

gulp.task('scriptsJs', function() {
    return gulp.src(['./src/js/jquery.inputmask.bundle.min.js', './src/js/jquery.time-to.min.js', './src/js/jquery.event.move.js', './src/js/jquery.twentytwenty.js', './src/js/script.js'])
        .pipe(sourcemaps.init())
        .pipe(concatJs('all.js'))
        /*.pipe(uglify())*/
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./js/'));
});

gulp.task('sass', function () {
    return gulp.src([config.srcDir+'/sass/libs.scss', config.srcDir+'/sass/forms.scss', config.srcDir+'/sass/style.scss', config.srcDir+'/sass/responsive.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss('bundle.css'))
        .pipe(prefix({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(rename('bundle.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css/'));
});



gulp.task('watch',function () {
    /*livereload.listen();*/
    gulp.watch(config.srcDir+'/'+config.sassPattern, ['sass']);
    gulp.watch(config.srcDir+'/'+config.jsPattern, ['scriptsJs']);
    }

)

gulp.task('default', ['scriptsJs','sass', 'watch']);