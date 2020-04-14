const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(gulp.dest('./css'))
})

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss'), ['sass'];
})