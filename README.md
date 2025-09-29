# CODIA V1.0.0


# tasks

+ Bundle: optimizar la config de ebuild para mejorar el tamaño del script
+ Permitir agregar scripts externos e insertarlos en el iframe
	- validar que no se agreguen librerias repetidas
	- agregar el evento click para eliminar una libreria de la lista
	- localstoge para almacenar las librerias añadidas y no perderlas en la actualizacion
+ El codigo no comienza en la columa cero en cada cajon.
+ Implementar Localstorage para almacenar cada contenido de tabs, incluyendo las librerias si las hay. esto para evitar que si se recarga el navegador no se pierda el contenido

# Use

### Browser

html`
<script>
	import Editor from './dist/Editor.js'
	window.onload = function(){	
		const Coder = new Editor({
			render:"app",
			layout:"tabs",
			codeHTML:`
			<div class="container">
				<div class="bg-dark text-white">
					<h3>Testing Enki Editor.....</h3>				
				</div>
			</div>
			`							
		})
		Coder.init()
	})
</script>
$ 
`