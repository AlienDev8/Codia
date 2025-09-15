// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

// const Workers = {
// 	getWorkerUrl(_, label) {
// 		if (label === 'json') {
// 			return './vs/language/json/json.worker.js';
// 		}
// 		if (label === 'css' || label === 'scss' || label === 'less') {
// 			return './vs/language/css/css.worker.js';
// 		}
// 		if (label === 'html' || label === 'handlebars' || label === 'razor') {
// 			return './vs/language/html/html.worker.js';
// 		}
// 		if (label === 'typescript' || label === 'javascript') {
// 			return './vs/language/typescript/ts.worker.js';
// 		}
// 		return './vs/language/editor/editor.worker.js';
// 	},
// };

// const Workers = {
//   getWorkerUrl: function (moduleId, label) {
//     const path = {
//       'editor': 'editor/editor.worker.js',
//       'json': 'json/json.worker.js',
//       'css': 'css/css.worker.js',
//       'html': 'html/html.worker.js',
//       'typescript': 'typescript/ts.worker.js',
//       'javascript': 'typescript/ts.worker.js',
//     };
//     return `./assets/vs/${path[label] || 'editor/editor.worker.js'}`;
//   }
// };

// export default Workers;