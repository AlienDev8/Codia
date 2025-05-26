import {default as split} from 'split.js';
import Split from 'split-grid';
// import './style.css';
import * as bootstrap from 'bootstrap';
import './styles.css';
// import * as bootstrap from 'bootstrap';
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
	codeJS:``,
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
		// const resizeObserver = new ResizeObserver(() => {
		// 	editor.layout();
		// });
			
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
			let aSplits = ["#split0_"+Codicis.id, "#split1_"+Codicis.id, "#split2_"+Codicis.id];
			Codicis.renderPanel();
			// setTimeout(function(){			
			// 	Split({	
			// 		minSize:1,			
			// 		columnGutters: [{
			// 			track: 1,
			// 			element: document.querySelector('#gutter-col-1-'+Codicis.id),
			// 		}],				
			// 	})
			// 	split(aSplits,{
			// 		direction: 'vertical',
			// 	})	
			// },10)			
		} else { // Codicis.CONSTANTES.TABS
			Codicis.renderTabs();
			Codicis.tabs()
			// setTimeout(function(){
			// 	Split({				
			// 		columnMinSize:100,				
			// 		columnGutters: [{
			// 			track: 1,
			// 			element: document.querySelector('#gutter-col-1-'+Codicis.id),
			// 		}],				
			// 	})
			// },1000)
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
			console.log(c.layout)
			// Codicis.fillCode()		
		})			
		Codicis.updateIframe()

		
	},
	settings: () => {
		return `			
			
		`;
		return `

		`; 
	},	
	renderPanel: () => {
		let template = `			
			<div id="viz_${Codicis.id}" class="container-codicis d-flex flex-column bg-dark h-100">				
				<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
					<div class="container-fluid">
						<!-- Brand/Logo -->
						<a class="navbar-brand" href="#">${Codicis.CONSTANTES.nameApp}</a>

						<!-- Layout Selector -->
						<div class="ms-2">
							<div class="d-flex align-items-baseline">
								<div class="d-flex px-2">
									<div class="w-100">
										<label class="form-label">Layout</label>
										<select id="selectLayout_${Codicis.id}" class="form-select text-muted">
											<option value="panel">Panel</option>
											<option value="tabs">Tabs</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
				<div class="d-flex flex-grow-1 flex-shrink-0 flex-column">
					<div id="one">
						<div id="split0_${Codicis.id}" class="position-relative flex-grow-1">
							<div id="_html_${Codicis.id}_" class="w-100 h-100"></div>
							<i class="ihtml5 position-absolute"></i>
						</div>
						<div id="split1_${Codicis.id}" class="position-relative flex-grow-1 w-100">
							<div id="_js_${Codicis.id}_" class="w-100 h-100"></div>
							<i class="ijs position-absolute"></i>
						</div>
						<div id="split2_${Codicis.id}" class="position-relative flex-grow-1">
							<div id="_css_${Codicis.id}_" class="w-100 h-100"></div>
							<i class="icss position-absolute"></i>
						</div>
					</div>
					<div class="bg-dark gutter-col" id="gutter-col-1-${Codicis.id}"></div>
					<div class="text-dark" id="two">
						<iframe id="_preview_${Codicis.id}_" frameborder="0" class="iPreview bg-light h-100 w-100"></iframe>
					</div>
				</div>
			</div>	
		`;
		Codicis.eleRender.innerHTML = template;
		// Codicis.afterRender()
	},
	renderTabs: () => {
		let template = `				
			<div id="viz_${Codicis.id}" class="container-codicis d-flex flex-column bg-dark">
				<nav class="navbar navbar-expand-lg navbar-dark bg-black align-items-stretch py-1">
					<div class="container-fluid px-3">
						<div class="d-flex justify-content-between w-100">
							<div class="ms-2">
								<a class="navbar-brand text-white fs-4" href="#">${Codicis.CONSTANTES.nameApp}</a>
							</div>
							<div class="ms-2">
								<div class="d-flex align-items-baseline">
									<div class="d-flex px-2">
										<div class="w-100">
											<select id="selectLayout_${Codicis.id}" class="form-select form-select-sm text-muted">
												<option value="panel">Panel</option>
												<option value="tabs">Tabs</option>
											</select>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
				<div class="d-flex h-100">
					<div class="flex-grow-1 d-flex flex-column">
						<ul id="tabbutton_${Codicis.id}" class="nav nav-tabs" role="tablist">
							<li class="nav-item">
								<a id="tab1" class="nav-link active" data-bs-toggle="tab" href="#_html_${Codicis.id}_">HTML</a>
							</li>
							<li class="nav-item">
								<a id="tab2" class="nav-link " data-bs-toggle="tab" href="#_js_${Codicis.id}_">JAVASCRIPT</a>
							</li>
							<li class="nav-item">
								<a id="tab3" class="nav-link " data-bs-toggle="tab" href="#_css_${Codicis.id}_">CSS</a>
							</li>
						</ul>
						<div id="tabcontainer_${Codicis.id}" class="tab-content h-100">
    							<div id="_html_${Codicis.id}_" class="h-100 position-relative tab-pane active">
								<i class="ihtml5 position-absolute"></i>
							</div>
							<div id="_js_${Codicis.id}_" class="h-100 position-relative tab-pane ">
								<i class="ijs position-absolute"></i>
							</div>
							<div id="_css_${Codicis.id}_" class="h-100 position-relative tab-pane ">
								<i class="icss position-absolute"></i>
							</div>
						</div>
					</div>
					<!-- Gutter Column -->
					<div class="gutter-col bg-dark hover-bg-darker" id="gutter-col-1-${Codicis.id}"></div>
					<!-- Preview Iframe -->
					<div class="text-dark">
						<iframe id="_preview_${Codicis.id}_" frameborder="0" class="iPreview bg-light w-100"></iframe>
					</div>
				</div>
			</div>
		`;
		Codicis.eleRender.innerHTML = template;
		// Codicis.afterRender()		

	},
	tabs: () => {
		// let aTabs = document.querySelectorAll("#tabbutton_"+Codicis.id+" > div button");
		// let aContainers = [...Codicis.get("tabcontainer_"+Codicis.id).children];
		// console.log(aTabs)
		

		// const triggerTabList = document.querySelectorAll('#myTab button')
		// aTabs.forEach(triggerEl => {
		// 	const tabTrigger = new bootstrap.Tab(triggerEl)

		// 	triggerEl.addEventListener('click', event => {
		// 	console.log(tabTrigger)
		// 		event.preventDefault()
		// 		tabTrigger.show()
		// 	})
		// })
		// aTabs.forEach((t, index) => {			
		// 	t.addEventListener("click" , function(e) {
		// 		// reset
		// 		console.log(aContainers)
		// 		aTabs.forEach(function(t, idx){ 
		// 			aTabs[idx].classList.remove("active"); 
		// 			aTabs[idx].classList.remove("border-b-2"); 
		// 			aTabs[idx].classList.remove("border-blue-500"); 
		// 			aContainers[idx].classList.add("hidden")
		// 		})
		// 		// active tab +  container
		// 		this.classList.add("active");				
		// 		this.classList.add("border-b-2");				
		// 		this.classList.add("border-gray-400");				
		// 		aContainers[index].classList.remove("hidden")
		// 	})
		// })	

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
				<body class="">
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
		document.querySelector(".iPreview").height = document.querySelector(".tab-content").clientHeight
	}

}

const App = (props) => {
	// const {render, layout} = props;
	let AppInstancia = Object.assign({},Codicis)	
	return AppInstancia.init(props)
}

export default App;
// export { Codicis }; 

