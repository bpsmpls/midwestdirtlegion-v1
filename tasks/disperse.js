/**
 * Copies all files found in output /dist/assets for use in the server side build
 *
 * @usage gulp disperse
 */
import gulp from 'gulp';
import notify from './notify';

function disperseAssets() {
    return gulp
        .src(`${process.env.DIRECTORY_DEST}/assets/**/*`)
        .pipe(gulp.dest(`${process.env.DIRECTORY_FINALDEST}/assets`))
        .pipe(notify.onError('DISPERSE: error'))
};

export default function disperse() {
    return disperseAssets();
}
