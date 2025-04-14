import "./monaco-workers";
import * as monaco from 'monaco-editor';

export default function setupEditor(container, language, code) {
//   const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${container}" not found.`);
    return;
  }


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
	// fontFamily:"",
	fontSize:"13px",								
	minimap:{
		autohide:true,
		enabled:false
	}
  });

  return editor;
}