const postcss_jit_props = require('postcss-jit-props');
const open_props = require('open-props');

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nested'),
        require('postcss-preset-env'),
        postcss_jit_props(open_props)
    ],
};