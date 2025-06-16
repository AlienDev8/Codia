import Split from "split.js";
// import "bootstrap";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './styles.css';
import setupEditor from './editorMonaco';

const Editor = function(oConfig){
	// this.id = null;
	// this.eleRender = null;
	// this.layout = "panel";// panel | tabs
	// this.config = {};
	this.iSplit = null;
	this.editorHTML = null;
	this.editorJS = null;
	this.editorCSS = null;
	this.CONSTANTES = {
		PANEL:"panel",
		TABS:"tabs",
		nameApp:"Codia v1.0 "	
	};
	this.codeHTML = `
	<div class="container">
		<div>
			<h3>Enki Editor v1.0</h3>				
		</div>
	</div>
	`;
	this.codeJS = ``;
	this.codeCSS = `			
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
	this.elePreview = null;
	this.eleHTML = null;
	this.eleCSS = null;
	this.eleJS = null;
	this.EDITOR = null;

	this.updateProps(oConfig)
}
Editor.prototype.updateProps = function(props){
	this.config = props;
	this.id = props.render
	this.layout = props.layout;
	this.eleRender = document.getElementById(props.render);	
	this.eleRender.classList.add("parent-codicis")
	if(props.codeHTML !== undefined) { this.codeHTML = props.codeHTML; }	
	if(props.codeJS !== undefined) { this.codeJS = props.codeJS; }		
	if(props.codeCSS !== undefined) { this.codeCSS = props.codeCSS; }
}
Editor.prototype.get = function(id){
	return document.querySelector("#"+id)
}
Editor.prototype.init  = function(){
	this.selectLayout()	
	this.loadEditor();			
	this.addEvents();		
}
Editor.prototype.loadEditor =  function(){
	this.elePreview = this.get("_preview_"+this.id+"_")
	this.eleHTML = this.get("_html_"+this.id+"_")
	this.eleCSS = this.get("_css_"+this.id+"_")
	this.eleJS = this.get("_js_"+this.id+"_")
	// editor monaco HTML
	this.editorHTML = setupEditor(this.eleHTML, 'html', this.codeHTML);
	this.editorJS = setupEditor(this.eleJS, 'javascript', this.codeJS);
	this.editorCSS = setupEditor(this.eleCSS, 'css', this.codeCSS);		
}	
Editor.prototype.selectLayout =  function(){
	let aSplitsHorizontal = ["#one_"+this.id, "#two_"+this.id];
	if(this.layout === this.CONSTANTES.PANEL || this.layout === undefined){
		let aSplits = ["#split0_"+this.id, "#split1_"+this.id, "#split2_"+this.id];
		this.iSplit = this.renderPanel();
		setTimeout(function(){					
			Split(aSplits,{
				direction: 'vertical',
			})
			Split(aSplitsHorizontal,{
				direction: 'horizontal',
			})	
		},500)			
	} else { // this.CONSTANTES.TABS
		this.renderTabs();
		this.tabs()
		this.iSplit = Split(aSplitsHorizontal,{
			direction: 'horizontal',
		})	
	}		
}
Editor.prototype.afterRender = function(){
	let _this = this;
	let selectLayoutCbx = document.getElementById("selectLayout_"+_this.id);		
	selectLayoutCbx.value = _this.layout;

	selectLayoutCbx.addEventListener("change", (e) => {			
		let c = _this.config;
		console.log(c)
		selectLayoutCbx.value = e.target.value;
		c.codeCSS =  _this.codeCSS;
		c.layout = e.target.value; 	
		_this.updateProps(c)		
		_this.init();					
		_this.updateIframe()	
		console.log(c.layout)
	})			
	_this.updateIframe()
}
	
Editor.prototype.renderPanel = function() {
	let template = `			
		<div id="viz_${this.id}" class="container-codicis d-flex flex-column bg-dark">
			<nav class="navbar navbar-expand-lg navbar-dark bg-black align-items-stretch py-1">
				<div class="container-fluid px-3">
					<div class="d-flex justify-content-between w-100">
						<div class="ms-2">
							<a class="navbar-brand text-white fs-4" href="#">${this.CONSTANTES.nameApp}</a>
						</div>
						<div class="ms-2">
							<div class="d-flex align-items-baseline">
								<div class="d-flex px-2">
									<div class="w-100">
										<select id="selectLayout_${this.id}" class="form-select form-select-sm text-muted">
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
			<div class="d-flex flex-row h-100 grid">
				<div id="one_${this.id}" class="d-flex flex-column ">
					<div id="split0_${this.id}" class="c position-relative align-content-stretch flex-grow-1 w-100">
						<div id="_html_${this.id}_" class="w-100 h-100"></div>
						<i class="ihtml5 position-absolute"></i>
					</div>
					<div id="split1_${this.id}" class="c position-relative align-content-stretch flex-grow-1 w-100">
						<div id="_js_${this.id}_" class="w-100 h-100"></div>
						<i class="ijs position-absolute"></i>
					</div>
					<div id="split2_${this.id}" class="c position-relative align-content-stretch flex-grow-1 w-100">
						<div id="_css_${this.id}_" class="w-100 h-100"></div>
						<i class="icss position-absolute"></i>
					</div>
				</div>
				<!-- div class="gutter-col gutter-col-1 " id="gutter-col-1-${this.id}"></ !-->
				<div class="text-dark " id="two_${this.id}">
					<iframe id="_preview_${this.id}_" frameborder="0" class="iPreview bg-light h-100 w-100"></iframe>
				</div>
			</div>
		</div>	
	`;
	this.eleRender.innerHTML = template;
		// this.afterRender()
}
Editor.prototype.renderTabs = function() {
	let template = `				
		<div id="viz_${this.id}" class="container-codicis d-flex flex-column bg-dark">
			<nav class="navbar navbar-expand-lg navbar-dark bg-black align-items-stretch py-1">
				<div class="container-fluid px-3">
					<div class="d-flex justify-content-between w-100">
						<div class="ms-2">
							<a class="navbar-brand text-white fs-4" href="#">${this.CONSTANTES.nameApp}</a>
						</div>
						<div class="ms-2">
							<div class="d-flex align-items-baseline">
								<div class="d-flex px-2">
									<div class="w-100">
										<select id="selectLayout_${this.id}" class="form-select form-select-sm text-muted">
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
			<div class="d-flex h-100 grid">
				<div id="one_${this.id}" class="flex-grow-1 d-flex flex-column">
					<ul id="tabbutton_${this.id}" class="nav nav-tabs" role="tablist">
						<li class="nav-item">
							<a id="tab1" class="nav-link active" data-bs-toggle="tab" href="#_html_${this.id}_">HTML</a>
						</li>
						<li class="nav-item">
							<a id="tab2" class="nav-link " data-bs-toggle="tab" href="#_js_${this.id}_">JAVASCRIPT</a>
						</li>
						<li class="nav-item">
							<a id="tab3" class="nav-link " data-bs-toggle="tab" href="#_css_${this.id}_">CSS</a>
						</li>
					</ul>
					<div id="tabcontainer_${this.id}" class="tab-content h-100">
						<div id="_html_${this.id}_" class="h-100 position-relative tab-pane active">
							<i class="ihtml5 position-absolute"></i>
						</div>
						<div id="_js_${this.id}_" class="h-100 position-relative tab-pane ">
							<i class="ijs position-absolute"></i>
						</div>
						<div id="_css_${this.id}_" class="h-100 position-relative tab-pane ">
							<i class="icss position-absolute"></i>
						</div>
					</div>
				</div>
				<!-- Preview Iframe -->
				<div class="text-dark" id="two_${this.id}">
					<iframe id="_preview_${this.id}_" frameborder="0" class="iPreview bg-light w-100"></iframe>
				</div>
			</div>
		</div>
	`;
	this.eleRender.innerHTML = template;
	// this.afterRender()		

}
Editor.prototype.tabs = function() {
	// let aTabs = document.querySelectorAll("#tabbutton_"+this.id+" > div button");
	// let aContainers = [...this.get("tabcontainer_"+this.id).children];
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

}	
Editor.prototype.addEvents = function() {
	// this.elePreview = this.get("_preview_")
	let html = this.editorHTML
	let js = this.editorJS		
	let css = this.editorCSS
	let _this = this;
	
	html.onDidChangeModelContent((e) => {
		_this.updateIframe()
	})
	css.onDidChangeModelContent((e) => {				
		_this.updateIframe()
	})
	js.onDidChangeModelContent((e) => {			
		_this.updateIframe()
	})
	_this.afterRender()	
}
Editor.prototype.updateIframe = function() {
	let html = this.editorHTML.getValue()
	let js = this.editorJS.getValue();
	let css = this.editorCSS.getValue()
	this.codeHTML = html
	this.codeCSS = css
	this.codeJS = js		

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
	this.elePreview.setAttribute("srcdoc", template)						
}
export default Editor; 

