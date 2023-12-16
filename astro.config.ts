import { defineConfig, sharpImageService } from 'astro/config';
import { SITE_URL } from './src/consts';

export default defineConfig({
    site: SITE_URL,

    build: {
        inlineStylesheets: "always",
    },
    image: {
        service: sharpImageService(),
    }
});
