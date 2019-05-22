/**
 * Builds HTML markup found in /src/
 *
 * @usage gulp markup
 */

/* eslint-disable camelcase, no-param-reassign */
import browserSync from 'browser-sync';
import gulp from 'gulp';
import notify from './notify';
import prettify from 'gulp-prettify';
import strip from 'gulp-strip-comments';
import nunjucks from 'gulp-nunjucks';
import nunjucksRender from 'gulp-nunjucks-render';

function watchMarkup() {
    const src = [
        `${process.env.DIRECTORY_SRC}/**/*.njk`,
        `!${process.env.DIRECTORY_SRC}/assets/**`,
    ];

    gulp.watch(src, () => {
        notify.log('MARKUP: file update detected, rebuilding...');
        buildMarkup();
    });
}

function buildMarkup() {
    const browser = browserSync.get('local');
    const src = [
        `${process.env.DIRECTORY_SRC}/**/*.njk`,
        `!${process.env.DIRECTORY_SRC}/assets/**`,
        `!${process.env.DIRECTORY_SRC}/templates/**`,
        `!${process.env.DIRECTORY_SRC}/music/**`,
        `!${process.env.DIRECTORY_SRC}/video/**`,
        `!${process.env.DIRECTORY_SRC}/web/**`,
    ];

    return gulp
        .src(src)
        .pipe(notify.onError('MARKUP: error'))
        .pipe(prettify({
            indent_size: 4,
            indent_inner_html : true,
            wrap_line_length: 999999,
            unformatted: [
                'a', 'b', 'code', 'i', 'p',
                'pre', 'small', 'span',
                'sub', 'sup', 'u', 'textarea',
                'strong', 'em', 'svg',
            ],
        }))
        .pipe(nunjucks.compile(path => { path.extname = '.html'; }))
        .pipe(nunjucksRender({
            path: 'src/templates/',
        }))
        .pipe(strip.html())
        .pipe(gulp.dest(process.env.DIRECTORY_DEST))
        .on('end', notify.onLog('MARKUP: rebuild complete'))
        .on('end', browser.reload);
}

export default function markup() {
    if (process.env.WATCH === 'true') {
        watchMarkup();
    }

    return buildMarkup();
}
