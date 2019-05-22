/**
 * Lints all JavaScript files from /src/assets/scripts, for syntax issues
 *
 * * This task can is a one-off manual run and not part of the normal build process.
 *
 * @usage gulp jslint
 */

import eslint from 'gulp-eslint';
import gulp from 'gulp';

export default function jslint() {
    return gulp
        .src([`${process.env.DIRECTORY_SRC}/assets/scripts/**/*.js`])
        .pipe(eslint())
        .pipe(eslint.format('table'));
}
