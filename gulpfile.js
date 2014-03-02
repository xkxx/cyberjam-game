var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    browerify = require('gulp-browerify'),
    htmlreplace = require('gulp-html-replace');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

var gulp.task('bundle', function() {
    return gulp.src('js/app.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));

});

var gulp.task('htmlreplace', function() {
    return gulp.src('app.html')
        .pipe(htmlreplace('prod', ['vue.min.js', 'quintus-all.min.js'])
        .pipe(gulp.dest('dist/'));
});
