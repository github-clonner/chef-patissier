const chefPatissier = require('../index');
const keys = require('lodash/keys');

const config = {
    'root': {
        'src': './src',
        'dest': './public'
    },
    'browserSync': {

    },
    // Grouped by what can run in parallel
    'tasks': [
        ['clean'],
        ['eslint', 'stylelint'],
        ['images', 'svgsprite', 'static'],
        ['templates', 'css', [ 'webpack', { ifProduction: true }]],
        [['rev', { ifProduction: true }]],
        [['sizeReport', { ifProduction: true }]]
    ]
};

const chef = chefPatissier(config);

it('should bootstrap all tasks', () => {
    expect(keys(chef).length).toBe(13);
});
