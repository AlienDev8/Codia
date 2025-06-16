# CODIA V1.0.0

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