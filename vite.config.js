// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
// import terser from 'terser';
const prefix = "/node_modules/monaco-editor/esm/vs";

export default defineConfig({
	optimizeDeps: {
		include: [
			`${prefix}/language/json/json.worker.js`,
			`${prefix}/language/css/css.worker.js`,
			`${prefix}/language/html/html.worker.js`,
			`${prefix}/language/typescript/ts.worker.js`,
			`${prefix}/editor/editor.worker.js`
		]
	},
	server:{
		port:9999
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'main.js'),
			name: 'Codicis',
			formats: ['umd'],
			fileName: (format) => `Codicis.${format}.js`
		},
		rollupOptions: {
			//external: ['monaco-editor'],
			output: {
				
				assetFileNames: (assetInfo) => {
					// console.log(assetInfo)
					if (assetInfo.name === 'style.css') {
						return 'Codicis.css';
					}
					return assetInfo.name;
				}
			}
		},
		outDir: 'dist',
		sourcemap: true,
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		}
		// minify: terser
	}
})