import adapter from "@sveltejs/adapter-static";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		appDir: "app",
		files: {
			appTemplate: "src/index.html",
			assets: "src/public"
		},
		adapter: adapter({
			pages: "build",
			assets: "build",
			fallback: "index.html",
			precompress: false
		})
	}
};

export default config;

