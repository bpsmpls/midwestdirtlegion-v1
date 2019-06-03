/**
 * Optimize all GIF, PNG, JPG, SVG assets in /src/assets/media/images
 *
 * Images are losslessly compressed with no degraded image quality.
 * Compressed images will replace the original versions in source directory.
 * Commit compressed images into source control.
 *
 * This task can is a one-off manual run and not part of the normal build process.
 *
 * @usage gulp optimize
 */

import chmod from 'gulp-chmod';
import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

export default function optimize() {
    const src = `${process.env.DIRECTORY_SRC}/assets/media/images/**/*.+(png|jpg|gif)`;
        
    return gulp
        .src(src)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { cleanupIDs: false },
                ],
            }),
        ]))
        .pipe(chmod(0o644))
        .pipe(gulp.dest(`${process.env.DIRECTORY_DEST}/assets/media/images/`));
}
