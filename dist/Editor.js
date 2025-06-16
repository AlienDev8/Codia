import r from"split.js";import"../node_modules/bootstrap/dist/js/bootstrap.esm.js";import"../node_modules/bootstrap/dist/css/bootstrap.min.css";(function(){if(!document.getElementById("948a63b78eb48247465d9c5f4a29efa0ec6e1a5280e8f27d6d0d45a15cf2de1f")){var e=document.createElement("style");e.id="948a63b78eb48247465d9c5f4a29efa0ec6e1a5280e8f27d6d0d45a15cf2de1f",e.textContent=`/* @import "/node_modules/bootstrap/dist/css/bootstrap.min.css"; */
/* @import "~bootstrap/dist/css/bootstrap.min.css"; */


html {	
	/* background:#262ae8; */
}
body {
	margin:0 !important;
	padding:0 !important;
	background-color: #333333;
	height:100vh;
	overflow: hidden;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
	font-size: 12px;
}
iframe {
	height: 100%;			
	border:0;	
	margin:0;
	padding:0;
	/* background-color: rgb(125, 54, 54); */
}
.c {
	box-shadow:0 0 0 .2px rgba(255,255,255,.7);
}
.ifijo {
	background-repeat: none;
	background-size: contain;
	position:absolute;
	right:10px;
	top:10px;
	opacity: .7;
	z-index:999;
}
.ihtml5 {
	background-image: url("/ihtml5.svg");	
	width: 32px;
	height: 32px;	
	z-index: 99999;
	right: 18px;
	top: 12px;
	background-size: cover;
}
.icss {
	background-image: url("/icss.svg");	
	width: 38px;
	height: 38px;	
	z-index: 99999;
	right: 15px;
	top: 10px;
	background-size: cover;
}
.ijs {
	background-image: url("/ijs.svg");	
	width: 38px;
	height: 38px;	
	z-index: 99999;
	right: 15px;
	top: 10px;
	background-size: cover;
}

/**
	Grid layout draggable columns
*/
.grid {
    display: flex;
    flex-direction: row;
    /* grid-template-columns: 1fr 10px 1fr; */
    /* grid-template-columns: 49.8% 0.4% 49.8%; */
}
.gutter-col {
    grid-row: 1/-1;
    cursor: col-resize;
}

.gutter-col-1 {
    grid-column: 2;
}

.gutter {
    	background-color: #010101;	
    background-repeat: no-repeat;
    background-position: 50%;
}
.gutter.gutter-horizontal {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
    cursor: col-resize;
}

.gutter.gutter-vertical {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
    cursor: row-resize;
}

.gutter.gutter-vertical {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
	background-repeat: no-repeat;
	background-position: center;
	background-color: #010101;	
    	cursor: row-resize;
    	/* height:10px !important; */
}
/**
	End Grid layout draggable columns
*/
.custom-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width:80px;
    height: auto;
    font-size: 12px;
    color:#f1f1f1;
    padding: 2px 10px 2px 12px;
    background: #373737 url("/arrows.png") no-repeat right 10px center;
    background-size: 15px;
    border: 0px solid #ddd !important;
}
.custom-select:hover {
    background: #353535 url("/arrows.png") no-repeat right 10px center;
    background-size: 15px;
    cursor: pointer;
}
.custom-select:focus {
    border: 1px solid #999;
    box-shadow: 0 3px 5px 0 rgba(0,0,0,.2);
    outline: none;
}
/* remove default arrow in IE */
select::-ms-expand {
    display:none;
}

.bgoption {
	background-image: url("/arrows.png");
	background-repeat: no-repeat;
	background-position: center;
	background-size: 15px auto;
}
.parent-codicis {	
	 /* background:orange; */
	/*border:3px solid purple; */
	height:100%;
}
.container-codicis {
	height:100%;
	/* overflow: hidden; */
}

/*MONACO EDITOR*/

.monaco-editor {
	
}
/** 
	Bootstrap Nav Tabs Customization
*/

.nav-tabs .nav-link {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}
.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    border-color: none;
}
.nav-link {
	color: #f1f1f1;
}
.nav-tabs .nav-link:hover {	    
    border-color: transparent;	
    color:#93b7ff;
}
.form-select-sm {
	padding-top:0px;
	padding-bottom:0px;
}`,document.head.appendChild(e)}})();import c from"monaco-editor/esm/vs/editor/editor.worker?worker";import p from"monaco-editor/esm/vs/language/json/json.worker?worker";import h from"monaco-editor/esm/vs/language/css/css.worker?worker";import u from"monaco-editor/esm/vs/language/html/html.worker?worker";import g from"monaco-editor/esm/vs/language/typescript/ts.worker?worker";var v={getWorker(e,t){return t==="json"?new p:t==="css"||t==="scss"||t==="less"?new h:t==="html"||t==="handlebars"||t==="razor"?new u:t==="typescript"||t==="javascript"?new g:new c}},n=v;import*as l from"monaco-editor";function a(e,t,s){if(!e){console.error(`Container with ID "${e}" not found.`);return}self.MonacoEnvironment=n;let i=l.editor.create(e,{value:s,language:t,theme:"vs-dark",lineNumbers:"on",readOnly:!1,automaticLayout:!0,placeholder:"//Tu c\xF3digo aqu\xED...",platform:"",scrollBeyondLastLine:!1,fontSize:"13px",minimap:{autohide:!0,enabled:!1},tabSize:3,quickSuggestionsDelay:0,wordWrap:"on",cursorStyle:"line"});return i.getModel().updateOptions({tabSize:0}),window.addEventListener("resize",()=>{i.layout({height:"100vh"})}),i}var o=function(e){this.iSplit=null,this.editorHTML=null,this.editorJS=null,this.editorCSS=null,this.CONSTANTES={PANEL:"panel",TABS:"tabs",nameApp:"Codia v1.0 "},this.codeHTML=`
	<div class="container">
		<div>
			<h3>Enki Editor v1.0</h3>				
		</div>
	</div>
	`,this.codeJS="",this.codeCSS=`			
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
	`,this.elePreview=null,this.eleHTML=null,this.eleCSS=null,this.eleJS=null,this.EDITOR=null,this.updateProps(e)};o.prototype.updateProps=function(e){this.config=e,this.id=e.render,this.layout=e.layout,this.eleRender=document.getElementById(e.render),this.eleRender.classList.add("parent-codicis"),e.codeHTML!==void 0&&(this.codeHTML=e.codeHTML),e.codeJS!==void 0&&(this.codeJS=e.codeJS),e.codeCSS!==void 0&&(this.codeCSS=e.codeCSS)};o.prototype.get=function(e){return document.querySelector("#"+e)};o.prototype.init=function(){this.selectLayout(),this.loadEditor(),this.addEvents()};o.prototype.loadEditor=function(){this.elePreview=this.get("_preview_"+this.id+"_"),this.eleHTML=this.get("_html_"+this.id+"_"),this.eleCSS=this.get("_css_"+this.id+"_"),this.eleJS=this.get("_js_"+this.id+"_"),this.editorHTML=a(this.eleHTML,"html",this.codeHTML),this.editorJS=a(this.eleJS,"javascript",this.codeJS),this.editorCSS=a(this.eleCSS,"css",this.codeCSS)};o.prototype.selectLayout=function(){let e=["#one_"+this.id,"#two_"+this.id];if(this.layout===this.CONSTANTES.PANEL||this.layout===void 0){let t=["#split0_"+this.id,"#split1_"+this.id,"#split2_"+this.id];this.iSplit=this.renderPanel(),setTimeout(function(){r(t,{direction:"vertical"}),r(e,{direction:"horizontal"})},500)}else this.renderTabs(),this.tabs(),this.iSplit=r(e,{direction:"horizontal"})};o.prototype.afterRender=function(){let e=this,t=document.getElementById("selectLayout_"+e.id);t.value=e.layout,t.addEventListener("change",s=>{let i=e.config;console.log(i),t.value=s.target.value,i.codeCSS=e.codeCSS,i.layout=s.target.value,e.updateProps(i),e.init(),e.updateIframe(),console.log(i.layout)}),e.updateIframe()};o.prototype.renderPanel=function(){let e=`			
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
	`;this.eleRender.innerHTML=e};o.prototype.renderTabs=function(){let e=`				
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
	`;this.eleRender.innerHTML=e};o.prototype.tabs=function(){};o.prototype.addEvents=function(){let e=this.editorHTML,t=this.editorJS,s=this.editorCSS,i=this;e.onDidChangeModelContent(d=>{i.updateIframe()}),s.onDidChangeModelContent(d=>{i.updateIframe()}),t.onDidChangeModelContent(d=>{i.updateIframe()}),i.afterRender()};o.prototype.updateIframe=function(){let e=this.editorHTML.getValue(),t=this.editorJS.getValue(),s=this.editorCSS.getValue();this.codeHTML=e,this.codeCSS=s,this.codeJS=t;let i=`
		<!DOCTYPE html>
		<html lang="es">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Playground iframe</title>
				<style>
					${s}						
				</style>
			</head>
			<body class="">
				${e}
				<script>
					${t}
				<\/script>
			</body>
		</html>
	`;this.elePreview.setAttribute("srcdoc",i)};var C=o;export{C as default};
