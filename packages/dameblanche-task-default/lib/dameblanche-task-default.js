const gulp = require('gulp');
const getEnabledTasks = require('dameblanche/lib/getEnabledTasks');
const isProductionBuild = require('dameblanche/lib/isProductionBuild');
const watch = require('dameblanche-task-watch');

const defaultTasks = [
    getEnabledTasks().enabledTasksAsOperations,
    isProductionBuild() ? undefined : watch
].filter(Boolean);

module.exports = gulp.series(...defaultTasks);
