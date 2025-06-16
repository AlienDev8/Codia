// vite.config.js
import path from 'path'
import { defineConfig } from 'vite';
// import { fileURLToPath, URL } from 'node:url';

// import terser from 'terser';
export default defineConfig({
	root: path.resolve(__dirname, ''),
	resolve: {
		alias: {
			'~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
		}
	},	
	server:{
		port:9999,
		hot:true
	}
		
});