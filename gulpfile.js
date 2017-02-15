var gulp = require('gulp');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var del=require('del');
var cssmin=require('gulp-cssmin');
var rename=require('gulp-rename');
var concatCss = require('gulp-concat-css');
var minify = require('gulp-minify');
var concat = require('gulp-concat'); //concat javascript file
var sass = require('gulp-sass');

var dest = "built/";

gulp.task('reset',function(){
	del([dest+"*"]);
});
																
var images={
	in:"images/**/*.*",
	out:dest+"images"
};

var css={
	in:"css/**/*.*",
	out:dest+"css"
};

var js={
	in:"js/**/*.*",
	out:dest+"js"
};

var scss={
	in:"scss/**/*.*",
	out:dest+"scssout"
};

gulp.task('images',function(){
  gulp.src(images.in)
  .pipe(newer(images.out))
  .pipe(imagemin())
  .pipe(gulp.dest(images.out));
});

gulp.task('css', function () {
    gulp.src(css.in)
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(css.out));
});

gulp.task('concatCss', function () {
  return gulp.src(css.in)
    .pipe(concatCss("bundle/all.css"))
    .pipe(gulp.dest(css.out));
});

gulp.task('js', function() {
  gulp.src(js.in)
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(js.out))
});

gulp.task('concatJs', function() {
  return gulp.src(js.in)
    .pipe(concat("bundle/all.css"))
    .pipe(gulp.dest(js.out));
});

gulp.task('sass', function () {
  return gulp.src(scss.in)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(scss.out));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(scss.in, ['sass']);
});


gulp.task('default',['images','css','concatCss','js','concatJs','sass'],function(){
	gulp.watch(images.in,['images']);
	gulp.watch(css.in,['css']);
	gulp.watch(css.in,['concatCss']);
	gulp.watch(js.in,['js']);
	gulp.watch(js.in,['concatJs']);
	gulp.watch(js.in,['sass']);
});

//gulp.task('default', function () { console.log('Hello Gulp!') });
