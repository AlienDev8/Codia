// src/monaco-setup.js
import 'monaco-editor/min/vs/editor/editor.main.css';
import * as monaco from 'monaco-editor';


self.MonacoEnvironment = {
  getWorkerUrl: function (workerId, label) {
    // Usar ruta relativa a la estructura copiada
    const baseUrl = new URL('./', import.meta.url).href;
    
    switch (label) {
      case 'json':
        return baseUrl + '/vs/language/json/json.worker.js';
      case 'css':
      case 'scss':
      case 'less':
        return baseUrl + '/vs/language/css/css.worker.js';
      case 'html':
      case 'handlebars':
      case 'razor':
        return baseUrl + '/vs/language/html/html.worker.js';
      case 'typescript':
      case 'javascript':
        return baseUrl + '/vs/language/typescript/ts.worker.js';
      default:
        return baseUrl + '/vs/editor/editor.worker.js';
    }
  }
};

// self.MonacoEnvironment = {
//   getWorkerUrl: function (workerId, label) {
//     // Usa URLs relativas al bundle actual
//     const baseUrl = new URL('.', import.meta.url).href;
    
//     switch (label) {
//       case 'json':
//         return `${baseUrl}node_modules/monaco-editor/esm/vs/language/json/json.worker.js`;
//       case 'css':
//       case 'scss':
//       case 'less':
//         return `${baseUrl}node_modules/monaco-editor/esm/vs/language/css/css.worker.js`;
//       case 'html':
//       case 'handlebars':
//       case 'razor':
//         return `${baseUrl}node_modules/monaco-editor/esm/vs/language/html/html.worker.js`;
//       case 'typescript':
//       case 'javascript':
//         return `${baseUrl}node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js`;
//       default:
//         return `${baseUrl}node_modules/monaco-editor/esm/vs/editor/editor.worker.js`;
//     }
//   }
// };

// Configura los workers usando la URL directa
// self.MonacoEnvironment = {
//   getWorkerUrl: function (workerId, label) {
//     switch (label) {
//       case 'json':
//         return new URL('monaco-editor/esm/vs/language/json/json.worker.js', import.meta.url).href;
//       case 'css':
//       case 'scss':
//       case 'less':
//         return new URL('monaco-editor/esm/vs/language/css/css.worker.js', import.meta.url).href;
//       case 'html':
//       case 'handlebars':
//       case 'razor':
//         return new URL('monaco-editor/esm/vs/language/html/html.worker.js', import.meta.url).href;
//       case 'typescript':
//       case 'javascript':
//         return new URL('monaco-editor/esm/vs/language/typescript/ts.worker.js', import.meta.url).href;
//       default:
//         return new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url).href;
//     }
// 	try {
// 		return new Worker(workerUrl);
// 	} catch (error) {
// 		console.warn('Failed to create worker, falling back to blob URL:', error);
// 		// Fallback: crear worker desde blob
// 		const blob = new Blob([`importScripts('${workerUrl.href}');`], { type: 'application/javascript' });
// 		const blobUrl = URL.createObjectURL(blob);
// 		return new Worker(blobUrl);
// 	}
//   }
// };

window.monaco = monaco;