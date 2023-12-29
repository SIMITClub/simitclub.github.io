/** @type {import("prettier").Config} */
export default {
    printWidth: 100,
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'es5',
    useTabs: true,
    plugins: ['prettier-plugin-astro'],
    overrides: [
        {
            files: ['.*', '*.md', '*.mdx', '*.json', '*.toml', '*.yml', '*.yaml'],
            options: {
                useTabs: false,
            },
        },
        {
            files: ['**/*.astro'],
            options: {
                parser: 'astro',
            },
        },
    ],
};
