/**
 * Funcion encargada de configurar el editor monaco con los parametros de entrada lo que permite generar las instancias del editor
 * @param {*} container 
 * @param {*} language 
 * @param {*} code 
 * @returns 
 */
export default function setupEditor(container, language, code) {
	let instanceMonaco = null;
	if (!container) {
		console.error(`Container with ID "${container}" not found.`);
		return;
	}
  	// Create the editor instance  	
	instanceMonaco = window.monaco.editor.create(container, {        
			value: code,
			language: language,						
			theme:"vs-dark",
			lineNumbers: "on",
			readOnly:false,	
			automaticLayout: true,
			placeholder:"//Tu código aquí...",
			// fontFamily:"",
			platform:"",
			scrollBeyondLastLine:false,	
			fontSize:"13px",								
			minimap:{
				autohide:true,
				enabled:false
			},
			tabSize:3,
			quickSuggestionsDelay:0,
			wordWrap:"on", // off = with scroll, on = with out scroll 
			cursorStyle:"line",	
		});

		instanceMonaco.getModel().updateOptions({ tabSize: 0 })

		window.addEventListener('resize', () => {
			instanceMonaco.layout({ height: "100vh" });
		});
	

  return instanceMonaco;
}