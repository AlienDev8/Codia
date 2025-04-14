import {default as split} from 'split.js';
import Split from 'split-grid';
// import './style.css';
import setupEditor from './editorMonaco';

// const CONSTANTES = {
// 	PANEL:"panel",
// 	TABS:"tabs",
// 	nameApp:"Codicis",
	
// };
let Codicis = {
	id:null,
	eleRender:null,
	layout:"panel",// panel | tabs
	config:{},
	editorHTML:null,
	editorJS:null,
	editorCSS:null,
	CONSTANTES:{
		PANEL:"panel",
		TABS:"tabs",
		nameApp:"Enki Editor",	
	},
	codeHTML:`
	<div class="container">
		<div>
			<h3>Enki Editor v1.0</h3>				
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
	EDITOR:null,
	get: id => {return document.querySelector("#"+id)},
	init: (oConfig) => {
		Codicis.config = oConfig;
		Codicis.id = oConfig.render
		Codicis.layout = oConfig.layout;
		Codicis.eleRender = document.getElementById(oConfig.render);	
		Codicis.eleRender.classList.add("parent-codicis")
		if(oConfig.codeHTML !== undefined) { Codicis.codeHTML = oConfig.codeHTML; }	
		if(oConfig.codeJS !== undefined) { Codicis.codeJS = oConfig.codeJS; }		
		if(oConfig.codeCSS !== undefined) { Codicis.codeCSS = oConfig.codeCSS; }
		Codicis.selectLayout()	
		Codicis.loadEditor();			
		Codicis.addEvents();
			
	},
	loadEditor: () => {
		Codicis.elePreview = Codicis.get("_preview_"+Codicis.id+"_")
		Codicis.eleHTML = Codicis.get("_html_"+Codicis.id+"_")
		Codicis.eleCSS = Codicis.get("_css_"+Codicis.id+"_")
		Codicis.eleJS = Codicis.get("_js_"+Codicis.id+"_")
		// editor monaco HTML
		Codicis.editorHTML = setupEditor(Codicis.eleHTML, 'html', Codicis.codeHTML);
		Codicis.editorJS = setupEditor(Codicis.eleJS, 'javascript', Codicis.codeJS);
		Codicis.editorCSS = setupEditor(Codicis.eleCSS, 'css', Codicis.codeCSS);
		
	},	
	selectLayout: () => {
		if(Codicis.layout === Codicis.CONSTANTES.PANEL || Codicis.layout === undefined){
			let aSplits = ["#split0", "#split1", "#split2"];
			Codicis.renderPanel();
			setTimeout(function(){			
				
				Split({	
					minSize:1,			
					columnGutters: [{
						track: 1,
						element: document.querySelector('#gutter-col-1-'+Codicis.id),
					}],				
				})
				split(aSplits,{
					direction: 'vertical',
				})	
				// Codicis.fillCode();
			},10)			
		} else { // Codicis.CONSTANTES.TABS
			Codicis.renderTabs();
			Codicis.tabs()
			setTimeout(function(){
				Split({				
					columnMinSize:100,				
					columnGutters: [{
						track: 1,
						element: document.querySelector('#gutter-col-1-'+Codicis.id),
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
							<a class="text-xl text-white " href="#">${Codicis.CONSTANTES.nameApp}</a>
						</div>
						<div class="ms-2">
							${Codicis.settings()}
						</div>
					</div>
				</nav>
				<div class="grow shrink self-stretch gridx">
					<div class="" id="one">
						<div id="split0" class="c relative grow">
							<div id="_html_${Codicis.id}_" class="w-full h-full"></div>
							<i class="ihtml5 ifijo"></i>							
						</div>	
						<div id="split1" class="c relative grow w-full" >
							<div id="_js_${Codicis.id}_" class="w-full h-full"></div>
							<i class="ijs ifijo"></i>														
						</div>	
						<div id="split2" class="c relative grow">
							<div id="_css_${Codicis.id}_" class="w-full h-full"></div>
							<i class="icss ifijo"></i>												
						</div>
					</div>
					<div class="gutter-col gutter-col-1 bg-neutral-900 " id="gutter-col-1-${Codicis.id}"></div>										
					<div class="text-black" id="two">						
						<iframe id="_preview_${Codicis.id}_" frameborder="0" class="bg-gray-100 h-full"></iframe>
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
							<a class="text-xl text-white " href="#">${Codicis.CONSTANTES.nameApp}</a>
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
							<div id="_html_${Codicis.id}_" class="c h-full relative">
								<i class="ihtml5 ifijo"></i>								
							</div>
							<div id="_js_${Codicis.id}_" class="c h-full relative hidden">
								<i class="ijs ifijo"></i>								
							</div>
							<div id="_css_${Codicis.id}_" class="c h-full relative hidden">
								<i class="icss ifijo"></i>															
							</div>
						</div>
					</div>
					<div class="gutter-col gutter-col-1 bg-neutral-800 hover:bg-neutral-850" id="gutter-col-1-${Codicis.id}"></div>										
					<div class="text-black">						
						<iframe id="_preview_${Codicis.id}_" frameborder="0" class="bg-gray-100 h-full"></iframe>
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
		// console.log("Codicis.elePreview")
		// console.log(Codicis.elePreview)
		// Codicis.elePreview.contentDocument.style.height = "100%";
	}

}

const App = (props) => {
	// const {render, layout} = props;
	let AppInstancia = Object.assign({},Codicis)	
	return AppInstancia.init(props)
}

export default App;
// export { Codicis }; 

