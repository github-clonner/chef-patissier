const del = require('del');
const config = require('dameblanche/lib/configLoader');
const taskConfig = config.getTaskConfig('clean');

const cleanTask = () => {
    const dirty = (taskConfig && taskConfig.patterns) ? taskConfig.patterns : config.root.dest;

    return del(dirty);
};

module.exports = cleanTask;
