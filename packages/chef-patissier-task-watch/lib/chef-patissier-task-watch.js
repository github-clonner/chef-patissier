const config = require('chef-patissier/lib/configLoader');

const gulp = require('gulp');
const path = require('path');
const getEnabledTasks = require('chef-patissier/lib/getEnabledTasks');
const taskRequire = require('chef-patissier/lib/taskRequire');
const browserSync = taskRequire('browsersync');

const watchFiles = () => {

    const tasks = getEnabledTasks().enabledTasksAsStrings;
    tasks.forEach((taskName) => {
        if (taskName !== 'clean') {
            const task = config.getTaskConfig(taskName);
            const glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');

            gulp.watch(glob, { usePolling: true }, taskRequire(taskName));
        }
    });
};

module.exports = gulp.series(
    browserSync,
    watchFiles
);
