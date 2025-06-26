import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess({ script: true }),
	kit: {
		adapter: adapter({
			strict: true,
			precompress: true,
			fallback: '404.html'
		}),
		paths: {
			base: '/height-calculator'
		}
	}
};

export default config;
