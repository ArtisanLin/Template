import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	base: "/2d-proxy/image",
	server: {
		port: 3004,
		host: true,
		headers: {
			"Cache-Control": "no-store",
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp",
		},
		fs: {},
	},
	build: {
		target: "esnext",
	},
	define: {
		__DEV__: process.env.NODE_ENV === "development",
		__SERVER__: false,
	},
	resolve: {
		alias: {},
	},
	plugins: [react()],
});
