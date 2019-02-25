const fs = require('fs');
const path = require('path');
const defaultsDeep = require('lodash/defaultsDeep');
const flatMap = require('lodash/flatMap');

const configLoader = (taskName) => {
    try {
        const config = require(`${process.cwd()}/node_modules/chef-patissier-task-${taskName}/lib/config`);
        return config;
    } catch (e) {
        return {};
    }
};

const config = require('./defaultConfig');

const getFlatTasks = () => {
    return flatMap(config.tasks, (parallelTasks) => {
        return parallelTasks.map(task => {
            if (Array.isArray(task)) {
                return task;
            }
            return [task, {}];
        });
    });
};

const getTaskConfig = (taskName) => {
    const task = getFlatTasks().find((task) => task[0] === taskName);
    return defaultsDeep(configLoader(taskName), task[1]);
}

const getConfig = (configName) => {
    return defaultsDeep(configLoader(configName), config[configName]);
}

module.exports = config;
module.exports.getFlatTasks = getFlatTasks;
module.exports.getTaskConfig = getTaskConfig;
module.exports.getConfig = getConfig;
