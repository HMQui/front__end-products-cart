const {src, dest, watch, series} = require('gulp')
const sass = require('gulp-sass')(require('sass'))

function buildStyles() {
    return src('assets/shinochi/**/*.scss')
        .pipe(sass())
        .pipe(dest('assets/CSS'))
}

function watchTask() {
    watch(['assets/shinochi/**/*.scss'], buildStyles)
}

exports.default = series(buildStyles, watchTask)