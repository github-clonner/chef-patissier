const config = require('../../lib/configLoader');
const taskConfig = config.getTaskConfig('css');
if (!taskConfig) throw new Error('config is required for css task');

const gulp = require('gulp');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const path = require('path');
const handleErrors = require('../../lib/handleErrors');
const customNotifier = require('../../lib/customNotifier');
const isProductionBuild = require('../../lib/isProductionBuild');

const cssTask = () => {
    const paths = {
        src: path.join(config.root.src, taskConfig.src, '/**/*.{' + taskConfig.extensions + '}'),
        dest: path.join(config.root.dest, taskConfig.dest)
    };

    return gulp.src(paths.src, { sourcemaps: !isProductionBuild() })
        .pipe(sass(taskConfig.sass))
        .on('error', handleErrors)
        .pipe(autoprefixer())
        .pipe(gulpif(isProductionBuild(), cssnano({
            autoprefixer: false
        })))
        .pipe(gulp.dest(paths.dest, { sourcemaps: !isProductionBuild() }))
        .pipe(customNotifier({ title: 'CSS compiled' }))
        .pipe(browserSync.stream());
};

module.exports = cssTask;
