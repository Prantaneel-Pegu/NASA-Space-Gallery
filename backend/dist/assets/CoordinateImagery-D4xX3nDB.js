import{r as o,j as e}from"./main-BpjM3fn0.js";const $={latitude:"",longitude:"",zoom:""};function F(){const[t,b]=o.useState({...$}),[a,s]=o.useState(!1),[y,l]=o.useState(!1),[m,S]=o.useState(0),[c,v]=o.useState(0),[u,g]=o.useState(!1),z=14e3,h=400,x=400,[n,L]=o.useState(`/api/staticmap?lat=${t.latitude}&long=${t.longitude}&zoom=${t.zoom}&width=${h}&height=${x}&isClient=false`);function T(d){var f,p,j;d.preventDefault(),d.stopPropagation();const r=d.currentTarget,i={latitude:((f=new FormData(r).get("latitude"))==null?void 0:f.toString())||"",longitude:((p=new FormData(r).get("longitude"))==null?void 0:p.toString())||"",zoom:((j=new FormData(r).get("zoom"))==null?void 0:j.toString())||"4"};switch(i.zoom){case"1":i.zoom="12";break;case"2":i.zoom="14";break;case"3":i.zoom="16";break;case"4":i.zoom="18";break;case"5":i.zoom="20";break;default:i.zoom="18"}L(`/api/staticmap?lat=${i.latitude}&long=${i.longitude}&zoom=${i.zoom}&width=${h}&height=${x}&isClient=false&random=${Math.random()}`),console.log(n,i),b(i),s(!1),l(!0),g(!1),S(performance.now()),setTimeout(()=>{g(!0)},z)}return console.log(t,n),e.jsxs("div",{id:"CoordinateImagery",children:[e.jsx("h1",{id:"ci-heading",children:"Coordinate Satellite Imagery"}),e.jsx("p",{id:"ci-desc",children:"Find satellite imagery for a given coordinate."}),e.jsxs("div",{id:"ci-main",children:[e.jsx("form",{method:"POST",id:"ci-form",onSubmit:T,children:e.jsxs("fieldset",{id:"ci-form-fieldset",children:[e.jsx("legend",{id:"ci-form-legend",children:"  Enter Geo-coordinate data:  "}),e.jsxs("div",{id:"ci-form-latitude-container",children:[e.jsx("label",{id:"ci-form-lat-label",htmlFor:"ci-form-latitude",children:"Latitude:   "}),e.jsx("input",{type:"number",max:"90",min:"-90",step:"any",maxLength:10,id:"ci-form-latitude",name:"latitude",required:!0})]}),e.jsxs("div",{id:"ci-form-longitude-container",children:[e.jsx("label",{id:"ci-form-lon-label",htmlFor:"ci-form-longitude",children:"Longitude:"}),e.jsx("input",{type:"number",max:"180",min:"-180",step:"any",maxLength:11,id:"ci-form-longitude",name:"longitude",required:!0})]}),e.jsxs("div",{id:"ci-form-zoom-container",children:[e.jsx("label",{id:"ci-form-zoom-label",htmlFor:"ci-form-zoom",children:"Zoom Level:"}),e.jsxs("select",{name:"zoom",id:"ci-form-zoom",defaultValue:"4",required:!0,children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]}),e.jsx("button",{id:"ci-form-submit-btn",type:"submit",children:"Submit"})]})}),!a&&y&&!u?e.jsx("div",{className:"loader"}):null,u&&!a?e.jsxs("div",{id:"ci-img-timedout",children:[e.jsx("h2",{id:"ci-timedout-h2",children:"Sorry, your request timed out."}),e.jsx("p",{id:"ci-timedout-desc",children:"There is probably an error on the server side. Please try again later."})]}):null,t.latitude&&t.longitude?e.jsx("div",{id:"ci-img-data",style:a?{}:{display:"none"},children:e.jsxs("div",{id:"ci-img-data-container",children:[e.jsx("div",{id:"ci-main-image-container",style:a?{}:{display:"none"},children:e.jsx("img",{src:t.latitude?n:"",alt:"Coordinate image captured by a satellite",id:"ci-main-image",onLoad:()=>{v(performance.now()),s(!0),l(!1)},style:a?{}:{display:"none"}})}),e.jsxs("p",{id:"ci-img-load-time",style:a&&c-m>0?{}:{display:"none"},children:["Finished loading in ",(c-m)/1e3,"s."]})]})}):null]})]})}export{F as default};