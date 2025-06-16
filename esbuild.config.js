import esbuild from 'esbuild';
// import postcss from 'postcss';
import InlineCSSPlugin from 'esbuild-plugin-inline-css';

let ESBUILD = await esbuild.context({
	entryPoints: ['main.js'],
	outfile: 'dist/Editor.js',
	// outdir:'./dist/',
	globalName:"Codia",
	bundle: true,
	resolveExtensions:[".json", ".js", ".css"],
	minify: true,
	sourcemap:"external",
	sourcesContent: false, // usa source code, pero no el codigo original en prodiccion para debugear
	splitting: false,
	mainFields: ['module', 'main'],
	keepNames: true,
	// allowOverwrite: true,
	external:["./node_modules/*","/public/*", "monaco-editor","split.js"],
	// external:["./node_modules/*","/public/*","*.svg", "*.png", "*.ttf",'split-grid'],
	platform: "browser",
	format: 'esm',
	loader: {
		'.css': 'css',
	},
	plugins:[InlineCSSPlugin()]	
});

ESBUILD.watch().then((e)=> {	
	console.log("Done build!!");
})