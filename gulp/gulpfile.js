var gulp=require('gulp');
var imagemin=require('gulp-imagemin');
var panqquant=require('imagemin-pnqquant');
var newer=require('gulp-newer');
var del=require('del');
var concat=require ('gulp-concat');
var uglift=require('gulp-uglift');
var cssmin=require('gulp-cssmin');
var rename=require('gulp-rename');
var sass require('gulp-sass');

var 
   source="source/";
   dest="built/";
var images={
	in:source+"images/*.*",
	out:dest+"images/"	
};
var css={
	in:source+"css/*.*",
	out:dest+"css"
};
var js={
	in:source+"js/*.*",
	out:dest+"js"
};
var scss={
	in:source+"sass/*.*",
	out:dest+"sass/"
};

gulp.task('images',function(){
	gulp.src(images.in)
	.pipe(concat('all.css'))
	.pipe(gulp.dest(css.out))
	.pipe(cssmin())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest(css.out));

});

gulp.task('css',function(){
	gulp.src(css.in)
	pipe(concat('all.css'))
	pipe(gulp.dest(css.out))
	pipe(cssmin())
	pipe(rename({suffix:'.min'}))
	pipe(gulp.dest(css.out));
	
});

gulp.task('clean',function(){
	del([dest+"*"]);	
});

gulp.task('js',function(){
	gulp.src(js.in)
    .pipe(concat('all.js'))
	.pipe(gulp.dest(js.out))
	.pipe(uglift())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest(js.out));
});

gulp.task('scss',function(){
	gulp.src(scss.in)  
	.pipe(concat('all.css'))
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest(scss.out));

});

gulp.task('default',['images','css','js','scss'],function(){
	gulp.watch(images.in,['images']);
	gulp.watch(css.in,['css']);
	gulp.watch(js.in,['js']);
	gulp.watch(js.in,['scss']);
});

	