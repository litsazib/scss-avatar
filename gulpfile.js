var gulp = require('gulp');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');



var images={
	in:"images/**/*.*",
	out:"built/images/"
};
gulp.task('images',function(){
  gulp.src(images.in)
  .pipe(newer(images.out))
  .pipe(imagemin())
  .pipe(gulp.dest(images.out));
});


gulp.task('default', function () { console.log('Hello Gulp!') });
