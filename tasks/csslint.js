/**
 * Lints all CSS files from /src/assets/styles, for syntax issues
 *
 * * This task can is a one-off manual run and not part of the normal build process.
 *
 * @usage gulp csslint
 */

import stylelint from 'gulp-stylelint';
import gulp from 'gulp';

export default function csslint() {
    return gulp
        .src([`${process.env.DIRECTORY_SRC}/assets/styles/**/*.css`])
        .pipe(stylelint({
            reporters: [
                { formatter: 'verbose', console: true },
            ],
        }));
}
