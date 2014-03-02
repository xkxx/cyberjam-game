var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    browerify = require('gulp-browerify');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

var gulp.task('default'), function(){
    return gulp.src('js/app.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('js/dist/js'));

});
