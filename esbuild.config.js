import esbuild from 'esbuild';
// import postcss from 'postcss';

let ESBUILD = await esbuild.context({
	entryPoints: ['main.js','styles.css'],
	// outfile: 'dist/EnkiEditor.js',
	outdir:'./dist/',
	globalName:"EnkiEditor",
	bundle: true,
	minify: true,
	sourcemap:false,
	splitting: false,
	allowOverwrite: true,
	external:["/public/*","*.svg", "*.png", "*.ttf", 'monaco-editor','split-grid','split.js'],
	// platform: "neutral",
	format: 'esm',
	loader: {
		'.png': 'file',
		'.jpg': 'file',
		'.svg': 'dataurl',
		'.css': 'file',
		'.scss': 'file'
	},
	// plugins:[postcss()]	
});

ESBUILD.watch().then(()=> {
	console.log("Realoding!!");
})