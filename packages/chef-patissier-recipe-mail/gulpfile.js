const chef = require('chef-patissier');

const config = {
    'root': {
        'src': './src',
        'dest': './public'
    },
    'browsersync': {
    },
    // Grouped by what can run in parallel
    'tasks': [
        ['clean'],
        ['eslint', 'stylelint'],
        [['images', {
            src: '*/images',
            dest: ''
        }]],
        [['css', {
            src: '*/sass',
            dest: ''
        }]],
        ['mails'],
        [[ 'mails-overview', { disableWatch: true } ]],
        [['rev', { ifProduction: true, htmlTask: 'mails' }]],
        [['cdn', { ifProduction: true }]]
    ]
};

module.exports = chef(config);
