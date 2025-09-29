// vite.config.js
import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({	
	// root: '',
	// resolve: {
	// 	alias: {
	// 		'~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
	// 	}
	// },
	server:{
		port:9999,
		hot:true,
	},	
});