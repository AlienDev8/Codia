import Split from "split.js";
import { Tab } from "bootstrap";
import './styles.css';
import setupEditor from './editorMonaco';
/**
* Codia: funcion principal generadora de la instancia de un editor para HTML, JS y CSS
* @param {*} oConfig 
*/
const Codia = function(oConfig){
	this.iSplit = null;
	this.vActive = "html"; // html, css, js
	this.activo = null;
	this.autoplay = true; // por defecto es true y actualiza el iframe automaticamente / si false entonce habilita el boton de play y desactiva la actualizacion automatica
	this.repo = true; // por defecto muestra el enlace al repositorio del proyecto
	this.editorHTML = null;
	this.editorJS = null;
	this.editorCSS = null;
	// this.timeoutId = null;
	// this.logo = "images/codia.svg";
	this.CONSTANTES = {
		PANEL:"panel",
		TABS:"tabs",
		nameApp:"Codia"	
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
Codia.prototype.updateProps = function(props){
	this.config = props;
	this.id = props.render
	this.layout = props.layout;
	this.repo = props.repo !== undefined ? props.repo : this.repo; 
	this.autoplay = props.autoplay !== undefined ? props.autoplay : this.autoplay;
	console.log("autoplay:",this.autoplay) 
	this.vActive = props.activo !== null ? props.activo.trim() : this.vActive;
	this.eleRender = document.getElementById(props.render);	
	this.eleRender.classList.add("parent-codicis")
	if(props.codeHTML !== undefined) { this.codeHTML = props.codeHTML; }	
	if(props.codeJS !== undefined) { this.codeJS = props.codeJS; }		
	if(props.codeCSS !== undefined) { this.codeCSS = props.codeCSS; }
}
Codia.prototype.get = function(id){
	return document.querySelector("#"+id)
}
/**
* Inicializa el componente con los parárametros de entrada
*/
Codia.prototype.init  = function(){
	this.selectLayout()	
	this.loadEditor();			
	this.addEvents();		
}
/**
* Genera una instancia para cada sección: HTML, JS, CSS y los carga
*/
Codia.prototype.loadEditor =  function(){
	this.elePreview = this.get("_preview_"+this.id+"_")
	this.eleHTML = this.get("_html_"+this.id+"_")
	this.eleCSS = this.get("_css_"+this.id+"_")
	this.eleJS = this.get("_js_"+this.id+"_")
	// editor monaco HTML
	this.editorHTML = setupEditor(this.eleHTML, 'html', this.codeHTML)		
	this.editorJS = setupEditor(this.eleJS, 'javascript', this.codeJS);
	this.editorCSS = setupEditor(this.eleCSS, 'css', this.codeCSS);		
}	
/**
* Selecciona el modo visual que se renderizara: tabs o paneles verticales
*/
Codia.prototype.selectLayout =  function(){
	let aSplitsHorizontal = ["#one_"+this.id, "#two_"+this.id];
	if(this.layout === this.CONSTANTES.TABS || this.layout === undefined){
		this.renderTabs();
		// this.tabs()
		this.iSplit = Split(aSplitsHorizontal,{
			direction: 'horizontal',
		})	
	} else { // this.CONSTANTES.PANEL		
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
	}		
}
/**
* Despues de cargado el componente ejecuta esta funcion para poder actualizar el iframe con el contenido que pueda tener de inicio
*/
Codia.prototype.afterRender = function(){ // funcion comentada por el momento
	let _this = this;
	// let selectLayoutCbx = document.getElementById("selectLayout_"+_this.id);		
	// selectLayoutCbx.value = _this.layout;
	
	// selectLayoutCbx.addEventListener("change", (e) => {			
		// 	let c = _this.config;
	// 	selectLayoutCbx.value = e.target.value;
	// 	c.codeCSS =  _this.codeCSS;
	// 	c.layout = e.target.value; 	
	// 	_this.updateProps(c)		
	// 	_this.init();					
	// 	_this.updateIframe()	
	// })			
	if(this.autoplay) _this.updateIframe()
}
Codia.prototype.linkGithub = function() {
	if(this.repo){
		return `
			<a href="https://github.com/AlienDev8/Codia.git" target="_blank" class="pr-1">
				<i class="igithub"></i>
			</a>
		`;
	} else {
		return "";
	}
}
Codia.prototype.showPlay = function() {
	if(this.autoplay === false){
		return `
			<button id="btn_play_${this.id}" class="btn btn-sm btn-outline-dark d-inline-block position-absolute end-0">
				<i class="iplay d-inline-block"></i>
			</button>
		`;
	} else {
		return "";
	}
		
}
/**
* Render modo visual en paneles
*/
Codia.prototype.renderPanel = function() {
	let template = `			
		<div id="viz_${this.id}" class="container-codicis d-flex flex-column bg-dark">
			<nav class="navbar navbar-expand-lg navbar-dark bg-black align-items-stretch py-1">
				<div class="container-fluid px-1">
					<div class="d-flex justify-content-between w-100">
						<div class="ms-2">
							<a class="navbar-brand text-white fs-5 cal-sans-font" href="#">								
								<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAoRXZhbHVhdGlvbiBWZXJzaW9uKSAtLT4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iOC40NjY2bW0iIGhlaWdodD0iOC40NjY2bW0iIHZlcnNpb249IjEuMSIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIg0Kdmlld0JveD0iMCAwIDg0Ni42NiA4NDYuNjYiDQogeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQogeG1sbnM6eG9kbT0iaHR0cDovL3d3dy5jb3JlbC5jb20vY29yZWxkcmF3L29kbS8yMDAzIj4NCiA8ZGVmcz4NCiAgPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCiAgIDwhW0NEQVRBWw0KICAgIC5zdHIwIHtzdHJva2U6I0Q2QjQzMjtzdHJva2Utd2lkdGg6MjA7c3Ryb2tlLW1pdGVybGltaXQ6MjIuOTI1Nn0NCiAgICAuZmlsMCB7ZmlsbDojRDZCNDMyfQ0KICAgXV0+DQogIDwvc3R5bGU+DQogPC9kZWZzPg0KIDxnIGlkPSJMYXllcl94MDAyMF8xIj4NCiAgPG1ldGFkYXRhIGlkPSJDb3JlbENvcnBJRF8wQ29yZWwtTGF5ZXIiLz4NCiAgPHBhdGggY2xhc3M9ImZpbDAgc3RyMCIgZD0iTTQxMS4xIDk4Ljk2YzE0OC42NiwwIDI2OS4xOCwxMjAuNTIgMjY5LjE4LDI2OS4xOCAwLDQ5LjIxIC0xMy4yLDk1LjMyIC0zNi4yNSwxMzUuMDFsNC4wNCAtOC40NyAtNy45NyAxNS4wMmMtOS44OCwxNS45NSAtMjEuMzgsMzAuNzkgLTM0LjI4LDQ0LjNsLTE4NS41MiAyMDAuNjYgMCAtMTE5LjY0IDEzMC42NCAtMTM4LjY1IDE3LjU4IC0yMi43MmMxOS43NCwtMjkuOTQgMzEuMjQsLTY1LjgxIDMxLjI0LC0xMDQuMzYgMCwtMTA0LjgzIC04NC45OCwtMTg5LjgxIC0xODkuODEsLTE4OS44MSAtMTA0LjgzLDAgLTE4OS44MSw4NC45OCAtMTg5LjgxLDE4OS44MSAwLDEwNC40NSA4NC4zNiwxODkuMTkgMTg4LjY2LDE4OS44MWwwIDc4LjIxYy0xNDcuNiwtMS4yMyAtMjY2Ljg4LC0xMjEuMjcgLTI2Ni44OCwtMjY5LjE3IDAsLTE0OC42NiAxMjAuNTIsLTI2OS4xOCAyNjkuMTgsLTI2OS4xOHoiLz4NCiA8L2c+DQo8L3N2Zz4NCg=='/>${this.CONSTANTES.nameApp}
							</a>
						</div>
						<div class="ms-2 pt-1 px-1">
							${this.tplSelectorLayout()}
							${this.linkGithub()}
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
Codia.prototype.tplSelectorLayout = function(){
	return "";
	// return `<div class="d-flex align-items-baseline">
	// 		<div class="d-flex px-2">
	// 			<div class="w-100">
	// 				<select id="selectLayout_${this.id}" class="form-select form-select-sm text-muted">
	// 					<option value="panel">Panel</option>
	// 					<option value="tabs">Tabs</option>
	// 				</select>
	// 			</div>
	// 		</div>
	// 	</div>`;
}
/**
* Renderiza el modo visual en tabs
*/
Codia.prototype.renderTabs = function() {
	let tHtml = "", tCss = "", tJs = "";
	if(this.vActive === "html") tHtml = "active"
	else if(this.vActive === "js") tJs = "active" 
	else if(this.vActive == "css") tCss = "active"	
	// template
	let template = `				
		<div id="viz_${this.id}" class="container-codicis d-flex flex-column bg-dark">
			<nav class="navbar navbar-expand-lg navbar-dark bg-black align-items-stretch py-1">
				<div class="container-fluid px-1">
					<div class="d-flex justify-content-between w-100">
						<div class="ms-2">
							<a class="navbar-brand text-white fs-5 cal-sans-font" href="#">								
								<img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8IS0tIENyZWF0b3I6IENvcmVsRFJBVyAoRXZhbHVhdGlvbiBWZXJzaW9uKSAtLT4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iOC40NjY2bW0iIGhlaWdodD0iOC40NjY2bW0iIHZlcnNpb249IjEuMSIgc3R5bGU9InNoYXBlLXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IHRleHQtcmVuZGVyaW5nOmdlb21ldHJpY1ByZWNpc2lvbjsgaW1hZ2UtcmVuZGVyaW5nOm9wdGltaXplUXVhbGl0eTsgZmlsbC1ydWxlOmV2ZW5vZGQ7IGNsaXAtcnVsZTpldmVub2RkIg0Kdmlld0JveD0iMCAwIDg0Ni42NiA4NDYuNjYiDQogeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQogeG1sbnM6eG9kbT0iaHR0cDovL3d3dy5jb3JlbC5jb20vY29yZWxkcmF3L29kbS8yMDAzIj4NCiA8ZGVmcz4NCiAgPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCiAgIDwhW0NEQVRBWw0KICAgIC5zdHIwIHtzdHJva2U6I0Q2QjQzMjtzdHJva2Utd2lkdGg6MjA7c3Ryb2tlLW1pdGVybGltaXQ6MjIuOTI1Nn0NCiAgICAuZmlsMCB7ZmlsbDojRDZCNDMyfQ0KICAgXV0+DQogIDwvc3R5bGU+DQogPC9kZWZzPg0KIDxnIGlkPSJMYXllcl94MDAyMF8xIj4NCiAgPG1ldGFkYXRhIGlkPSJDb3JlbENvcnBJRF8wQ29yZWwtTGF5ZXIiLz4NCiAgPHBhdGggY2xhc3M9ImZpbDAgc3RyMCIgZD0iTTQxMS4xIDk4Ljk2YzE0OC42NiwwIDI2OS4xOCwxMjAuNTIgMjY5LjE4LDI2OS4xOCAwLDQ5LjIxIC0xMy4yLDk1LjMyIC0zNi4yNSwxMzUuMDFsNC4wNCAtOC40NyAtNy45NyAxNS4wMmMtOS44OCwxNS45NSAtMjEuMzgsMzAuNzkgLTM0LjI4LDQ0LjNsLTE4NS41MiAyMDAuNjYgMCAtMTE5LjY0IDEzMC42NCAtMTM4LjY1IDE3LjU4IC0yMi43MmMxOS43NCwtMjkuOTQgMzEuMjQsLTY1LjgxIDMxLjI0LC0xMDQuMzYgMCwtMTA0LjgzIC04NC45OCwtMTg5LjgxIC0xODkuODEsLTE4OS44MSAtMTA0LjgzLDAgLTE4OS44MSw4NC45OCAtMTg5LjgxLDE4OS44MSAwLDEwNC40NSA4NC4zNiwxODkuMTkgMTg4LjY2LDE4OS44MWwwIDc4LjIxYy0xNDcuNiwtMS4yMyAtMjY2Ljg4LC0xMjEuMjcgLTI2Ni44OCwtMjY5LjE3IDAsLTE0OC42NiAxMjAuNTIsLTI2OS4xOCAyNjkuMTgsLTI2OS4xOHoiLz4NCiA8L2c+DQo8L3N2Zz4NCg=='/>${this.CONSTANTES.nameApp}
							</a>
						</div>
						<div class="ms-2 pt-1 px-1">
							${this.tplSelectorLayout()}
							${this.linkGithub()}
						</div>
					</div>
				</div>
			</nav>
			<div class="d-flex h-100 grid">
				<div id="one_${this.id}" class="flex-grow-1 d-flex flex-column">
					<ul id="tabbutton_${this.id}" class="nav nav-tabs position-relative" role="tablist">
						<li class="nav-item">
							<a id="tab1" class="nav-link ${tHtml}" data-bs-toggle="tab" href="#_html_${this.id}_">
								<i class="tabhtml5 d-inline-block"></i>
								<div class="d-inline-block align-bottom">HTML</div>
							</a>
						</li>
						<li class="nav-item">
							<a id="tab2" class="nav-link ${tJs}" data-bs-toggle="tab" href="#_js_${this.id}_">
								<i class="tabjs d-inline-block"></i>
								<div class="d-inline-block align-bottom">JAVASCRIPT</div>
							</a>
						</li>
						<li class="nav-item">
							<a id="tab3" class="nav-link ${tCss}" data-bs-toggle="tab" href="#_css_${this.id}_">
								<i class="tabcss d-inline-block"></i>
								<div class="d-inline-block align-bottom">CSS</div>
							</a>
						</li>
						${this.showPlay()}
					</ul>
					<div id="tabcontainer_${this.id}" class="tab-content h-100">
						<div id="_html_${this.id}_" class="h-100 position-relative tab-pane ${tHtml}">
							<!--i class="ihtml5 position-absolute"></i-->
						</div>
						<div id="_js_${this.id}_" class="h-100 position-relative tab-pane ${tJs}">
							<!--i class="ijs position-absolute"></i-->
						</div>
						<div id="_css_${this.id}_" class="h-100 position-relative tab-pane ${tCss}">
							<!--i class="icss position-absolute"></i-->
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
/**
* Agrega los eventos para:
* actualizar el iframe en cada cambio de: html, css y js
*/	
Codia.prototype.addEvents = function() {
	// this.elePreview = this.get("_preview_")
	let html = this.editorHTML
	let js = this.editorJS		
	let css = this.editorCSS
	let _this = this;

	let play = !this.autoplay ? this.get("btn_play_"+this.id) : null
	if(play !== null){	
		play.addEventListener("click", (e) => {
			e.preventDefault();
			_this.updateIframe()
		})
	}
	
	html.onDidChangeModelContent((e) => {
		if(this.autoplay) _this.updateIframe()
	})	
	css.onDidChangeModelContent((e) => {				
		if(this.autoplay) _this.updateIframe()
	})
	js.onDidChangeModelContent((e) => {			
		if(this.autoplay) _this.updateIframe()
	})
	_this.afterRender()	
}
/**
* Arma y actualiza el iFrame 
*/
Codia.prototype.updateIframe = function() {
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
	// this.elePreview.setAttribute("srcdoc", template)
	this.updateIframeDebounced(this.elePreview, template)
	// this.elePreview.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(template);		
}

Codia.prototype.updateIframeDebounced = (elePreview, html) => {
	let _this = this;
	let timeoutId;  
	clearTimeout(timeoutId);
	timeoutId = setTimeout(() => {
		elePreview.srcdoc = html;
	}, 300); // Espera 300ms sin cambios
}
window.Codia = Codia;

