const gulp = require('gulp');
const getEnabledTasks = require('chef-patissier/lib/getEnabledTasks');
const isProductionBuild = require('chef-patissier/lib/isProductionBuild');
const watch = require('chef-patissier-task-watch');

const defaultTasks = [
    getEnabledTasks().enabledTasksAsOperations,
    isProductionBuild() ? undefined : watch
].filter(Boolean);

module.exports = gulp.series(...defaultTasks);
