require('dotenv').config();

const bootstrap = (config) => {
    //Setup default config
    const defaultConfig = require('./lib/defaultConfig');
    Object.assign(defaultConfig, config);

    // Get flat tasks list
    const { getFlatTasks } = require('./lib/configLoader');

    // Setup all tasks
    const gulpTasks = {};

    getFlatTasks().forEach((task) => {
        const name = task[0];
        gulpTasks[name] = require(`./tasks/${name}`);
    });

    gulpTasks.default = require('./tasks/default');
    gulpTasks.watch = require('./tasks/watch');
    return gulpTasks;
};

module.exports = bootstrap;

