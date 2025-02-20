import {default as split} from 'split.js';
import Split from 'split-grid';
import './style.css'

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'


self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

const CONSTANTES = {
	PANEL:"panel",
	TABS:"tabs",
	nameApp:"Codicis",
	
};
let Codicis = {
	id:null,
	eleRender:null,
	layout:"panel",// panel | tabs
	config:{},
	editorHTML:null,
	editorJS:null,
	editorCSS:null,
	codeHTML:`
	<div class="container">
		<div>
			<h3>Codicis v1.0</h3>				
		</div>
	</div>
	`,
	codeJS:`
		
	`,
	codeCSS:`			
	.container div {			
		padding:0 16px;
		text-align:center;
		border:1px solid #333;
	}
	.container {
		display: flex;
		flex-direction:row;
		justify-content: center;
		align-items: center;
		height: 100vh;	
	}
	`,
	editorConfig: {
		theme: 'vs-dark',
		minimap: { enabled: false },
		automaticLayout: true,
		fontSize: 14,
		tabSize: 2,
		scrollBeyondLastLine: false,
		wordWrap: 'on',
		padding: { top: 10 },
		lineNumbers: 'on',
	},
	elePreview:null,
	eleHTML:null,
	eleCSS:null,
	eleJS:null,
	get: id => {return document.querySelector("#"+id)},
	init: (oConfig) => {


		
		Codicis.config = oConfig;
		// if(oConfig.html !== undefined) Codicis.html = oConfig.html;
		// if(oConfig.js !== undefined) Codicis.js = oConfig.js;
		// if(oConfig.css !== undefined) Codicis.css = oConfig.css;
		Codicis.id = oConfig.render
		Codicis.layout = oConfig.layout;
		Codicis.eleRender = document.getElementById(oConfig.render);	
		Codicis.eleRender.classList.add("parent-codicis")
		// Codicis.eleRender.style.height = "100%";	
		/* The code snippet you provided is part of a JavaScript module that defines a code editor component
		called `Codicis`. Here is a breakdown of what the mentioned lines are doing: */
		
		if(Codicis.codeHTML == undefined) Codicis.codeHTML = oConfig.codeHTML;		
		if(Codicis.codeJS == undefined) Codicis.codeJS = oConfig.codeJS;		
		if(Codicis.codeCSS == undefined) Codicis.codeCSS = oConfig.codeCSS;		
		Codicis.selectLayout()	
		Codicis.loadEditor();			
		Codicis.addEvents();	
			
	},
	loadEditor: () => {
		Codicis.elePreview = Codicis.get("_preview_")
		Codicis.eleHTML = Codicis.get("_html_")
		Codicis.eleCSS = Codicis.get("_css_")
		Codicis.eleJS = Codicis.get("_js_")
		// editor monaco HTML
		// Codicis.editorHTML = editor.create(Codicis.eleHTML, {
		// 	value:Codicis.codeHTML,
		// 	language: 'html'
		// });
		// Codicis.editorCSS = editor.create(Codicis.eleCSS, {
		// 	value:Codicis.codeCSS,
		// 	language: 'css'
		// });
		// Codicis.editorJS = editor.create(Codicis.eleJS, {
		// 	value:Codicis.codeJS,
		// 	language: 'javascript'
		// });
		Codicis.editorHTML = monaco.editor.create(Codicis.eleHTML, {		
			value: Codicis.codeHTML,
			language: 'html',						
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
		// editor monaco JS
		Codicis.editorJS = monaco.editor.create(Codicis.eleJS, {		
			value: Codicis.codeJS,
			language: 'javascript',						
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
		// editor monaco CSS
		Codicis.editorCSS = monaco.editor.create(Codicis.eleCSS, {		
			value: Codicis.codeCSS,
			language: 'css',
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
	},	
	selectLayout: () => {
		if(Codicis.layout === CONSTANTES.PANEL || Codicis.layout === undefined){
			let aSplits = ["#split0", "#split1", "#split2"];
			Codicis.renderPanel();
			setTimeout(function(){			
				
				Split({	
					minSize:1,			
					columnGutters: [{
						track: 1,
						element: document.querySelector('.gutter-col-1'),
					}],				
				})
				split(aSplits,{
					direction: 'vertical',
				})	
				// Codicis.fillCode();
			},10)			
		} else { // CONSTANTES.TABS
			Codicis.renderTabs();
			Codicis.tabs()
			setTimeout(function(){
				Split({				
					columnMinSize:100,				
					columnGutters: [{
						track: 1,
						element: document.querySelector('.gutter-col-1'),
					}],				
				})
				// Codicis.fillCode();				
			},10)
		}		
		
	},
	afterRender: () => {
		let selectLayoutCbx = document.getElementById("selectLayout_"+Codicis.id);		
		selectLayoutCbx.value = Codicis.layout;

		selectLayoutCbx.addEventListener("change", (e) => {			
			let c = Codicis.config;
			selectLayoutCbx.value = e.target.value;
			// c.config.layout = e.target.value; 
			c.codeCSS =  Codicis.codeCSS;
			c.layout = e.target.value; 			
			Codicis.init(c);					
			Codicis.updateIframe()	
			// Codicis.fillCode()
									
			
		})			
		Codicis.updateIframe()

		
	},
	settings: () => {
		return `			
			<div class="flex space-x-4 items-baseline group">
				<div class="flex px-2 space-x-2">
					<div class="block w-full">
						<label>Layout</label>						
						<select id="selectLayout_${Codicis.id}" class="custom-select text-gray-600 text-base w-auto">      
							<option value="panel">Panel</option>
							<option value="tabs">Tabs</option>
						</select>						
					</div>
				</div>                
			</div>
		`;
	},	
	renderPanel: () => {
		let template = `			
			<div id="viz_${Codicis.id}" class="container-codicis flex flex-col bg-neutral-800 h-full">				
				<nav class="grow-0 self-auto bg-neutral-900 relative flex w-full flex-wrap items-center justify-between py-1 text-white">
					<div class="flex w-full flex-wrap items-center justify-between px-3">
						<div class="ms-2">
							<a class="text-xl text-white " href="#">${CONSTANTES.nameApp}</a>
						</div>
						<div class="ms-2">
							${Codicis.settings()}
						</div>
					</div>
				</nav>
				<div class="grow shrink self-stretch gridx">
					<div class="" id="one">
						<div id="split0" class="c relative grow">
							<div id="_html_" class="w-full h-full"></div>
							<i class="ihtml5 ifijo"></i>							
						</div>	
						<div id="split1" class="c relative grow w-full" >
							<div id="_js_" class="w-full h-full"></div>
							<i class="ijs ifijo"></i>														
						</div>	
						<div id="split2" class="c relative grow">
							<div id="_css_" class="w-full h-full"></div>
							<i class="icss ifijo"></i>												
						</div>
					</div>
					<div class="gutter-col gutter-col-1 bg-neutral-900 "></div>										
					<div class="text-black" id="two">						
						<iframe id="_preview_" frameborder="0" class="bg-gray-100 h-full"></iframe>
					</div>
				</div>
			</div>	
		`;
		Codicis.eleRender.innerHTML = template;
		// Codicis.afterRender()
	},
	renderTabs: () => {
		let template = `			
			<div id="viz_${Codicis.id}" class="container-codicis flex flex-col bg-neutral-800 h-full">
				<nav class="grow-0 self-auto bg-neutral-900 relative flex w-full flex-wrap items-center justify-between py-1 text-white">
					<div class="flex w-full flex-wrap items-center justify-between px-3">
						<div class="ms-2">
							<a class="text-xl text-white " href="#">${CONSTANTES.nameApp}</a>
						</div>
						<div class="ms-2">
							${Codicis.settings()}
						</div>
					</div>
				</nav>
				<div class="grow shrink self-stretch gridx">
					<div class="flex flex-col">
						<div id="tabbutton_${Codicis.id}" class="flex flex-row bg-neutral-850">						
							<button id="tab1" class="active text-gray-400 py-4 px-6 block hover:text-gray-300 focus:outline-none border-b-2 border-gray-400">
								HTML
							</button>
							<button  id="tab2" class="text-gray-400 py-4 px-6 block hover:text-gray-300 focus:outline-none">
								JS
							</button>
							<button  id="tab3" class="text-gray-400 py-4 px-6 block hover:text-gray-300 focus:outline-none">
								CSS
							</button>					
						</div>
						<div id="tabcontainer_${Codicis.id}" class="h-full">						
							<div id="_html_" class="c h-full relative">
								<i class="ihtml5 ifijo"></i>								
							</div>
							<div id="_js_" class="c h-full relative hidden">
								<i class="ijs ifijo"></i>								
							</div>
							<div id="_css_" class="c h-full relative hidden">
								<i class="icss ifijo"></i>															
							</div>
						</div>
					</div>
					<div class="gutter-col gutter-col-1 bg-neutral-800 hover:bg-neutral-850"></div>										
					<div class="text-black">						
						<iframe id="_preview_" frameborder="0" class="bg-gray-100 h-full"></iframe>
					</div>
				</div>
			</div>	
		`;
		Codicis.eleRender.innerHTML = template;
		// Codicis.afterRender()		

	},
	tabs: () => {
		let aTabs = [...Codicis.get("tabbutton_"+Codicis.id).children];
		let aContainers = [...Codicis.get("tabcontainer_"+Codicis.id).children];
		
		aTabs.forEach((t, index) => {			
			t.addEventListener("click" , function(e) {
				// reset
				aTabs.forEach(function(t, idx){ 
					aTabs[idx].classList.remove("active"); 
					aTabs[idx].classList.remove("border-b-2"); 
					aTabs[idx].classList.remove("border-blue-500"); 
					aContainers[idx].classList.add("hidden")
				})
				// active tab +  container
				this.classList.add("active");				
				this.classList.add("border-b-2");				
				this.classList.add("border-gray-400");				
				aContainers[index].classList.remove("hidden")
			})
		})	

	},	
	addEvents: () => {
		// Codicis.elePreview = Codicis.get("_preview_")
		let html = Codicis.editorHTML
		let js = Codicis.editorJS		
		let css = Codicis.editorCSS
		
		html.onDidChangeModelContent((e) => {				
			Codicis.updateIframe()
		})
		css.onDidChangeModelContent((e) => {				
			Codicis.updateIframe()
		})
		js.onDidChangeModelContent((e) => {			
			Codicis.updateIframe()
		})
		Codicis.afterRender()	
		// Codicis.fillCode()
	},
	updateIframe:() => {
		let html = Codicis.editorHTML.getValue()
		let js = Codicis.editorJS.getValue();
		let css = Codicis.editorCSS.getValue()
		Codicis.codeHTML = html
		Codicis.codeCSS = css
		Codicis.codeJS = js		

		const template = `
			<!DOCTYPE html>
			<html lang="es">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Playground iframe</title>
					<style>
						${css}						
					</style>
				</head>
				<body>
					${html}
					<script>
						${js}
					</script>
				</body>
			</html>
		`;		
		Codicis.elePreview.setAttribute("srcdoc", template)					
		// Codicis.elePreview.contentDocument.style.height = "100%";
	}

}
export default Codicis;

