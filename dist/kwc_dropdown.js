(()=>{function t(t){return t&&t.__esModule?t.default:t}class e extends HTMLElement{constructor(){super();const e=document.createElement("template");if(e.innerHTML='\n        <style>\n            :host {\n                display: block;\n                position: relative;\n            }         \n\n            #container {\n                position: absolute;\n                zindex: 10;\n                overflow: hidden;\n                white-space: nowrap;\n            }\n        </style>\n\n        <slot name="button" id="button">Dropdown button</slot>\n        <div id="container">\n            <slot name="menu" id="menu">\n                Dropdown content\n            </slot>\n        </div>\n        ',this.shadow=this.attachShadow({mode:"open"}),this.shadow.appendChild(e.content.cloneNode(!0)),"true"===this.getAttribute("defaultStyle")){const e=document.createElement("style");e.innerText="\n        #container {\n          background-color: #fff;\n          padding: 0.25rem;\n          border-radius: 0.5rem;\n          font-size: 0.8rem;\n          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n        }\n      ",this.shadow.appendChild(e);const n=document.createElement("style");n.innerText=t("ul[slot=menu]{margin:0;padding:.5rem;list-style:none}ul[slot=menu]>li{cursor:pointer;-webkit-user-select:none;user-select:none;border-radius:.5rem;padding:.25rem .5rem}ul[slot=menu]>li:hover{background-color:#cbd5e1}.separator{border-top:1px solid #bbb}"),this.appendChild(n)}this.buttonSlot=this.shadow.getElementById("button"),this.menuSlot=this.shadow.getElementById("menu"),this.button=this.buttonSlot.assignedElements()[0],this.container=this.shadow.getElementById("container"),this.menu=this.menuSlot.assignedElements()[0],this.position=this.getAttribute("position")??"top",this.menuHeight=this.container.offsetHeight,this.setCoordsFromPosition(this.position),this.container.hidden=!0,this.buttonSlot.addEventListener("click",this.onButtonClick.bind(this),!1),this.handleClickOut=this.handleClickOut.bind(this)}getCoordsFromPosition(t){const e=this.button.getBoundingClientRect(),n=this.container.getBoundingClientRect(),i=t.split("-")[0],o=t.split("-")[1],s=["top","bottom"].includes(i)?"x":"y",h="x"===s?"width":"height",r=e.width/2-n.width/2,d=e.height/2-n.height/2,a=e[h]/2-n[h]/2;let l;switch(i){case"top":l={x:r,y:-n.height};break;case"bottom":l={x:r,y:e.height};break;case"right":l={x:e.width,y:d};break;case"left":l={x:-n.width,y:d};break;default:l={x:r,y:d}}switch(o){case"start":l[s]-=a;break;case"end":l[s]+=a}return l}setCoordsFromPosition(t){const{x:e,y:n}=this.getCoordsFromPosition(t);Object.assign(this.container.style,{left:`${e}px`,top:`${n}px`})}onButtonClick(){this.container.hidden=!1,this.container.animate([{maxHeight:"0px"},{maxHeight:`${this.menuHeight}px`}],{duration:100,fill:"forwards"}).finished.then((()=>{document.addEventListener("click",this.handleClickOut,!1)})).catch((t=>console.error(t)))}handleClickOut(t){const e=t.target;null==e||e===this.menu||this.menu.contains(e)||this.container.animate([{maxHeight:`${this.menuHeight}px`},{maxHeight:"0px"}],{duration:100,fill:"forwards"}).finished.then((()=>{this.container.hidden=!0,document.removeEventListener("click",this.handleClickOut,!1)})).catch((t=>console.error(t)))}}customElements.define("kwc-dropdown",e)})();
//# sourceMappingURL=kwc_dropdown.js.map
