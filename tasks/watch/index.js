const config = require('../../lib/configLoader');

const gulp = require('gulp');
const path = require('path');
const getEnabledTasks = require('../../lib/getEnabledTasks');
const browserSync = require('../browserSync');

const watchFiles = () => {
    const tasks = getEnabledTasks().enabledTasksAsStrings;

    tasks.forEach((taskName) => {
        if (taskName !== 'clean') {
            const task = config.getTaskConfig(taskName);
            console.log(tasks, task, taskName);
            const glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');

            gulp.watch(glob, { usePolling: true }, require('../' + taskName));
        }
    });
};

module.exports = gulp.series(
    browserSync,
    watchFiles
);
