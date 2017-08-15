var gulp = require('gulp');
var replace = require('gulp-replace');
var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

var md5Save = require("gulp-md5-save");
var md5Img = require("gulp-md5-img");
var data = {}; //save md5 value
var sourceImg = ["./src/img/**"];
var targetImg = "./img";
var linkFiles = ['./src/demo.html'];
gulp.task('save', function() {
    gulp.src(sourceImg)
        .pipe(md5Save(10, data));
});
gulp.task('img', ['save'], function() {
    gulp.src(sourceImg)
        .pipe(md5Img(10, linkFiles, data))
        .pipe(gulp.dest(targetImg));
});


/*   压缩图片   start   */
gulp.task('imgMin', function() {
    return gulp.src('rawData/math_3.files/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('src/img3'));
});
/*   压缩图片   end   */


gulp.task('replace', function() {
    gulp.src(['./del/index.html'])
        .pipe(replace('北大 专升本 高等数学（一）.files/', './img/'))
        .pipe(gulp.dest('src/'));
});

//替换的意思是字符串的替换
gulp.task('replaceImg', function() {
    gulp.src(['./src/demo.html'])
        .pipe(replace(/北大 专升本 高等数学（一）\d*/g, ''))
        .pipe(gulp.dest('src/'));
});

//替换的意思是字符串的替换
gulp.task('txt', function() {
    gulp.src(['./rawData/math_3.txt'])
        .pipe(replace(/<img/g, ''))
        .pipe(replace(/width="\d*"/g, ''))
        .pipe(replace(/height="\d*"/g, ''))
        .pipe(replace('src="math_3.files/', ''))
        .pipe(replace('"/>', ''))
        .pipe(replace(/<[^>]+>/g, ''))
        .pipe(gulp.dest('src/'));
});

gulp.task('default', ['imagemin', 'replace']);
