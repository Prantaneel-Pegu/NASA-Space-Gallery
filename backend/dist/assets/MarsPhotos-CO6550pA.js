import{r as a,c as v,l as T,j as e,I as O,M as A,b as F,i as x,m as M}from"./main-CIH3kwA4.js";const k={date:""};function Y(){const[m,N]=a.useState(k),[n,h]=a.useState([]),[u,g]=a.useState(v(T)),[R,j]=a.useState("0"),[b,D]=a.useState(""),[U,y]=a.useState(!1),[E,C]=a.useState(""),[P,S]=a.useState(!1),d=a.useRef(0);function I(l){var r;l.preventDefault(),l.stopPropagation(),console.log("Form submitted.");const s=l.currentTarget,t={date:((r=new FormData(s).get("date"))==null?void 0:r.toString())||""};x(m,t)||N(t),y(!0),S(!1),g(v(T)),M(t,!0).then(o=>{y(!1),S(!0),g(o),console.log(o.totalPhotos),o.photoUrls.length&&(j(o.photoUrls.length.toString()),D(o.totalPhotos)),console.log(o,t,o.photoUrls.length);const i=[];if(o.error!==""){const c=e.jsx("div",{id:"mp-error",children:e.jsx("p",{id:"mp-error-info",children:o.error.split(`
`).map((p,f)=>e.jsxs("span",{children:[p,e.jsx("br",{})]},f))})},"MP-ERROR-ELEMENT");i.push(c),h([...i]),console.error("ENCOUNTERED ERROR IN USEEFFECT",...i);return}for(let c=0;c<Math.min(o.photoUrls.length,20);c++){const p=o.photoIds[c],f=o.photoUrls[c];i.push(e.jsx("article",{className:"mp-photo-tile",children:e.jsx("img",{src:f,alt:`A photo captured by the Curiosity rover. Photo id: ${p}`,className:"mp-photo-tile-img"})},p))}console.log(n,i),x(n,i)||(h(i),console.log("YAY",n,i)),d.current===0&&(d.current+=20)})}function q(l=20){console.warn("TRIGGERED!",d.current+l),M(m,!1).then(s=>{g(s),s.photoUrls.length&&j(s.photoUrls.length.toString()),console.log(s,m,s.totalPhotos);const t=[];if(s.error!==""){t.push(...n),t.pop(),t.push(e.jsx("div",{id:"mp-error",children:e.jsx("p",{id:"mp-error-info",children:s.error.split(`
`).map((r,o)=>e.jsxs("span",{children:[r,e.jsx("br",{})]},o))})},"MP-ERROR-ELEMENT")),h([...t]),console.error("ENCOUNTERED ERROR IN LOADMORE",...t);return}for(let r=0;r<Math.min(l+d.current,s.photoUrls.length);r++){const o=s.photoIds[r],i=s.photoUrls[r];t.push(e.jsx("article",{className:"mp-photo-tile",children:e.jsx("img",{src:i,alt:`A photo captured by the Curiosity rover. Photo id: ${o}`,className:"mp-photo-tile-img"})},o))}d.current+=l,console.log(n,t,d.current),x(n,t)||(h(t),console.log(n,t))})}function w(){const l=new Date,s=l.getFullYear();let t=(l.getMonth()+1).toString(),r=l.getDate().toString();return parseInt(r)<10&&(r="0"+r),parseInt(t)<10&&(t="0"+t),s+"-"+t+"-"+r}return E===""&&C(w()),e.jsxs("div",{id:"MarsPhotos",children:[e.jsx("h1",{id:"mp-heading",children:"Mars Rover Photos"}),e.jsxs("p",{id:"mp-desc",children:["See some of the most awe-inspiring pictures taken by NASA's Curiosity rover - operational since 9/7/2012.",e.jsx("br",{}),e.jsx("br",{}),"Total photos taken: ",b||"~695670"]}),e.jsx("form",{id:"mp-form",method:"POST",onSubmit:I,children:e.jsxs("fieldset",{id:"mpf-fieldset",children:[e.jsx("legend",{id:"mpf-fieldset-legend",children:"  Select a date:  "}),e.jsx("div",{id:"mpf-date-container",children:e.jsx("input",{type:"date",id:"mpf-date",name:"date",min:"2012-08-06",max:E,defaultValue:"2015-06-03",required:!0})}),e.jsx("button",{id:"mpf-submit-btn",type:"submit",children:"Submit"})]})}),U&&!P?e.jsx("div",{className:"loader"}):n.length>0&&P?e.jsxs("div",{id:"mp-results",children:[u.error!==""?n.length>1?e.jsxs("p",{id:"mp-results-total",children:["Curiosity took ",R," photos that day:"]}):null:e.jsxs("p",{id:"mp-results-total",children:["Curiosity took ",R," photos that day:"]}),e.jsx(O,{next:q,hasMore:u.photoUrls.length!==n.length&&u.error==="",children:u.error===""?e.jsx(A,{columnsCountBreakPoints:{320:1,550:2,900:3,1200:4},children:e.jsx(F,{gutter:"1em",children:n})}):n,loader:e.jsx("div",{className:"loader"}),dataLength:n.length,scrollThreshold:.8})]}):null]})}export{Y as default};
