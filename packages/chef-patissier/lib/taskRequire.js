const taskReq = (name) => {
    return require(`${process.cwd()}/node_modules/chef-patissier-task-${name}/lib/chef-patissier-task-${name}`);
};

module.exports = taskReq;
