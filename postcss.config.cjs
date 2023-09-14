const postcss_preset_env = require("postcss-preset-env");
const postcss_jit_props = require('postcss-jit-props');
const open_props = require('open-props');

module.exports = {
    plugins: [
        postcss_jit_props(open_props),
        postcss_preset_env({
            stage: 2,
        }),
    ],
};
