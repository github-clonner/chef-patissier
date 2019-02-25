const fs = require('fs');
const path = require('path');
const defaultsDeep = require('lodash/defaultsDeep');
const flatMap = require('lodash/flatMap');

const configLoader = () => {
    const currentPath = path.resolve(__dirname, '../tasks');
    const config = {};
    fs.readdirSync(currentPath).forEach((item) => {
        const configPath = currentPath + '/' + item + '/config';
        if (fs.existsSync(configPath + '.js')) {
            config[item] = require(configPath ) || {};
        }
    });
    return config;
};

const configDefaults = configLoader();
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
    return defaultsDeep(configDefaults[taskName], task[1]);
}

const getConfig = (configName) => {
    return defaultsDeep(configDefaults[configName], config[configName]);
}

module.exports = config;
module.exports.getFlatTasks = getFlatTasks;
module.exports.getTaskConfig = getTaskConfig;
module.exports.getConfig = getConfig;
