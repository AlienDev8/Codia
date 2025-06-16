import Workers from "./monaco-workers";
import * as monaco from 'monaco-editor';

export default function setupEditor(container, language, code) {
//   const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${container}" not found.`);
    return;
  }

    self.MonacoEnvironment = Workers;
  // Create the editor instance
//   console.log("Editor container:")
//   console.log(container)
  const editor = monaco.editor.create(container, {        
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

  editor.getModel().updateOptions({ tabSize: 0 })

	window.addEventListener('resize', () => {
  	// let container = document.querySelector(".parent-codicis")-
		editor.layout({ height: "100vh" });
		// document.querySelector(".iPreview").height = document.querySelector(".tab-content").clientHeight
	});

  return editor;
}