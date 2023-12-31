import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [
		mdx(),
		sitemap(),
		icon({
			iconDir: "src/assets/svg",
			svgoOptions: {
				multipass: false, plugins: [{
					name: "preset-default",
					params: { overrides: {
						cleanupIds: {remove: false, minify: true, force: false,},
						inlineStyles: {
							onlyMatchedOnce: false,
							removeMatchedSelectors: false,
							useMqs: ["screen", "print", "prefers-color-scheme"],
						},
					}},
			}]}
		})
	]
});
