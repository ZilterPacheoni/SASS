const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

function compileSass() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));
}

function compressImages() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}

function minifyJS() {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
}

function watchFiles() {
    gulp.watch('src/scss/**/*.scss', compileSass);
    gulp.watch('src/images/*', compressImages);
    gulp.watch('src/js/**/*.js', minifyJS);
}

exports.sass = compileSass;
exports.images = compressImages;
exports.js = minifyJS;
exports.watch = watchFiles;
exports.default = gulp.series(compileSass, compressImages, minifyJS, watchFiles);
