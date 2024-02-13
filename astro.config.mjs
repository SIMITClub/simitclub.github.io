import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import { SITE_URL } from "./src/consts.ts";

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	integrations: [
		mdx(),
		sitemap(),
		icon({
			include: {
				bi: ["*"]
			},
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
	],
	markdown: {
		shikiConfig: {
			wrap: false,
			experimentalThemes: {
				light: 'min-light', // Not used but needs to be defined.
				"light-mode": 'github-light',
				"dark-mode": 'github-dark',
			},
		},
	}
});
