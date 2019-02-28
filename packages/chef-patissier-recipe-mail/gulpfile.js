require('@babel/register')({
    only: [
        (file) => {
            const cond = file.indexOf(process.cwd() + '/src/') === 0;
            return cond;
        }
    ]
});

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
        ['images'],
        [['css', {
            src: '*/sass',
            dest: ''
        }]],
        ['mails'],
        [[ 'mails-overview', { disableWatch: true } ]],
        [['rev', { ifProduction: true, htmlTask: 'mails' }]]
    ]
};

module.exports = chef(config);
