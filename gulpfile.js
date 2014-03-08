var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    htmlreplace = require('gulp-html-replace');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('pack-app', function() {
    return gulp.src('js/app.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));

});

gulp.task('pack-quintus', function() {
    return gulp.src('js/quintus*.js')
       .pipe(concat('quintus.js'))
       .pipe(uglify())
       .pipe(gulp.dest('dist/'));
});

gulp.task('pack-css', function() {
    return gulp.src('css/*.css')
       .pipe(concat('app.css'))
       .pipe(gulp.dest('dist/'));
});

gulp.task('copy-assets', function() {
    return gulp.src('assets/**')
       .pipe(gulp.dest('dist/assets/'));
});

gulp.task('htmlreplace', function() {
    return gulp.src('app.html')
        .pipe(htmlreplace({
            'css': 'app.css',
            'js': ['vue.min.js', 'quintus.js']
            }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', [
                    'pack-app', 'pack-quintus', 'pack-css',
                    'copy-assets', 'htmlreplace']);
