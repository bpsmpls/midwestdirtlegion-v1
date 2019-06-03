/**
 * Builds CSS files found in /src/**
 *
 * @usage gulp styles
 */

import autoprefix from 'autoprefix';
import browserSync from 'browser-sync';
import chmod from 'gulp-chmod';
import cleanCSS from 'gulp-clean-css';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import less from 'gulp-less';
import notify from './notify';
import sourcemaps from 'gulp-sourcemaps';

const processors = [
    cleanCSS,
    less
];

function watchStyles() {
    gulp.watch(`${process.env.DIRECTORY_SRC}/assets/styles/**/*`, () => {
        notify.log('STYLES: file update detected, rebuilding...');
        buildStyles();
    });
}

function buildStyles() {
    const browser = browserSync.get('local');

    return gulp
        .src(`${process.env.DIRECTORY_SRC}/assets/styles/*.less`)
        .pipe(notify.onError('STYLES: error'))
        .pipe(gulpIf(process.env.SOURCE_MAPS === 'true', sourcemaps.init()))
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulpIf(process.env.MINIFY === 'true', cleanCSS({
            mediaMerging: false,
        })))
        .pipe(gulpIf(process.env.SOURCE_MAPS === 'true', sourcemaps.write('./')))
        .pipe(chmod(0o644))
        .pipe(gulp.dest(`${process.env.DIRECTORY_DEST}/assets/styles/`))
        .on('end', notify.onLog('STYLES: rebuild complete'))
        .on('end', browser.reload);
}

export default function styles() {
    if (process.env.WATCH === 'true') {
        watchStyles();
    }

    return buildStyles();
}
