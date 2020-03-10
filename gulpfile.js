const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const nano = require('cssnano');
const prefix = require('autoprefixer');
const imagemin = require("gulp-imagemin");

function compile() {
    return (
        gulp
            .src("sass/**/*.scss")

            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError)
            .pipe(postcss([prefix(), nano()]))

            // What is the destination for the compiled file?
            .pipe(gulp.dest("css"))
    );
}

function squashImages() {
    gulp.src('images/**')
        .pipe(imagemin())
        .pipe(gulp.dest('images'))
}

function watch() {
    gulp.watch("sass/**/*.scss", compile);
    gulp.watch("public/images/**", squashImages);
}

// Expose the task by exporting it
// This allows you to run it from the command line (CLI)

exports.watch = watch;
exports.squash = squashImages;
