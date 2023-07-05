//plug-in
var gulp = require('gulp');
var minifycss = require('gulp-clean-css');
var minifyhtml = require('gulp-htmlmin');
var minifyjs = require('gulp-uglify');
var changed = require('gulp-changed');

// 圧縮前と圧縮後のディレクトリを定義
var paths = {
    srcDir: 'src',
    dstDir: 'dist'
};

gulp.task('minify-css', function () {
    return gulp.src("src/css/app.css")
        .pipe(minifycss())
        .pipe(gulp.dest('dist/src/css/'));
});

gulp.task('minify-html', function () {
    return gulp.src("index.php")
        .pipe(changed('dist'))
        .pipe(minifyhtml({
            // 余白を除去する
            collapseWhitespace: true,
            // HTMLコメントを除去する
            removeComments: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('minify-js', function () {
    return gulp.src("src/js/app.js")
        .pipe(minifyjs())
        .pipe(gulp.dest('dist/src/js/'));
});

gulp.task('watch', function () {
    gulp.watch(paths.srcDir + '/**/*', ['minify-css', 'minify-js']);
    gulp.watch("*.php", ['minify-html']);
});