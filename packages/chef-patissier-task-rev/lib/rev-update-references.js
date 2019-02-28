const gulp = require('gulp');
const path = require('path');
const revReplace = require('gulp-rev-replace');
const config = require('chef-patissier/lib/configLoader');

// 2) Update asset references with reved filenames in compiled css + js
const revUpdateReferencesTask = (cb) => {
    try {
        console.log('try');
        const manifest = gulp.src(path.join(config.root.dest, 'rev-manifest.json'));
        return gulp.src(path.join(config.root.dest, '/**/**.{css,js}'))
            .pipe(revReplace({
                manifest: manifest
            }))
            .pipe(gulp.dest(config.root.dest));
    } catch (e) {
        console.log(e);
        cb();
    }

};

module.exports = revUpdateReferencesTask;
