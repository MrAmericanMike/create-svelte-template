import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	server: {
		port: 3000
	},
	preview: {
		port: 8080
	},
	build: {
		minify: true,
		assetsInlineLimit: 0
	},
	plugins: [sveltekit()]
});

