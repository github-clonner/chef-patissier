const gulp = require('gulp');
const flattenDeep = require('lodash/flattenDeep');
const config = require('./configLoader');
const isProductionBuild = require('./isProductionBuild');

module.exports = () => {
    const taskReq = (task) => {
        return require('../tasks/' + task);
    };

    // Grouped by what can run in parallel
    const allTasks = config.tasks.map(parallelTasks => {
        return parallelTasks.map(task => {
            if (Array.isArray(task)) {
                const [ name, config = {} ] = task;
                const defaultConfig = { ifProduction: false, ...config }
                if (defaultConfig.ifProduction) {
                    return isProductionBuild() ? name : false;
                }

                return name;
            }
            return task;
        }).filter(Boolean);
    }).filter(parallelTasks => parallelTasks.length);

    const enabledTasksAsStrings = flattenDeep(allTasks);

    const enabledTasksAsOperations = gulp.series(
        ...allTasks.map((taskGroup) => {
            return gulp.parallel(...taskGroup.map(taskReq));
        })
    );

    return {
        enabledTasksAsStrings,
        enabledTasksAsOperations
    };
};
