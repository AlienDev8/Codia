
import * as esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
// import InlineCSSPlugin from 'esbuild-plugin-inline-css';

esbuild.build({
	entryPoints: ['main.js'],
	outfile: 'dist/Codia.js',
	bundle: true,
	minify: true,
	sourcemap:false,
	target: ['es2020'],
	format: 'esm',
	loader: {
		'.js': 'jsx',
		'.jsx': 'jsx',
		'.css': 'css', 
		'.ttf': 'file',  // <-- Agrega esta línea
		'.woff': 'file', // <-- Opcional: también para otros formatos de fuente
		'.woff2': 'file', // <-- Opcional
		'.svg': 'file' // <-- Opcional
	},
	define: {
		global: 'window.Codia',
	},
	resolveExtensions:[".json", ".js", ".css",".svg"],
	inject:['./monaco-setup.js'],
	external: ['node_modules/*','images/*'], // No empaquetar estas dependencias
	plugins:[
		{
			name: 'copy-monaco-full',
			setup(build) {
				build.onEnd(() => {
					// Copiar toda la estructura de monaco-editor
					const sourceDir = 'node_modules/monaco-editor/esm/vs';
					const destDir = 'dist/vs';
					
					if (fs.existsSync(sourceDir)) {
						copyDirRecursive(sourceDir, destDir);
					}
				});
			}
		},
		{
			name: 'copy-svg',
			setup(build) {
				build.onEnd(async (result) => {
					if (result.errors.length > 0) return;

					const sources = [
						// 'public/*.svg',
						'public/images/codia.svg'
					];

					const destDir = 'dist/images';

					// Crear directorio de destino si no existe
					if (!fs.existsSync(destDir)) {
						fs.mkdirSync(destDir, { recursive: true });
					}

					for (const pattern of sources) {
						const globPath = path.resolve(pattern);
						const dir = path.dirname(globPath);
						const files = fs.readdirSync(dir).filter(file => 
							path.extname(file).toLowerCase() === '.svg'
						);

						for (const file of files) {
							const src = path.join(dir, file);
							const dest = path.join(destDir, path.basename(src));
							fs.copyFileSync(src, dest);
							console.log(`✅ Copiado: ${src} → ${dest}`);
						}
					}
				});
			}
		}
	]	
}).catch(() => process.exit(1));


// Función auxiliar para copiar directorios recursivamente
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      // Copiar archivos relevantes
      if(/\.(js|ts|json|css|ttf|woff|woff2|svg)$/.test(entry.name)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}
