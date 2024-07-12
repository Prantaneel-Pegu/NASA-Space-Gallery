import{r as c,f as U,g as I,a as G,c as H,j as r,L as $,S as P,i as D,I as V,M as q,b as z,d as L,u as J,e as W}from"./main-CIH3kwA4.js";var B=Object.defineProperty,X=(t,e,n)=>e in t?B(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,C=(t,e,n)=>(X(t,typeof e!="symbol"?e+"":e,n),n);const F=(t,e)=>typeof getComputedStyle<"u"?getComputedStyle(t,null).getPropertyValue(e):t.style.getPropertyValue(e),Q=t=>F(t,"overflow")+F(t,"overflow-y")+F(t,"overflow-x"),Y=t=>{if(!(t instanceof HTMLElement))return window;let e=t;for(;e&&!(e===document.body||e===document.documentElement||!e.parentNode);){if(/(scroll|auto)/.test(Q(e)))return e;e=e.parentNode}return window};class K extends c.Component{constructor(e){super(e),C(this,"elementObserver"),C(this,"wrapper"),C(this,"lazyLoadHandler",n=>{var u,s;const{onContentVisible:a}=this.props,[i]=n,{isIntersecting:o}=i;if(o){this.setState({visible:!0},()=>{a&&a()});const h=(u=this.wrapper)==null?void 0:u.current;h&&h instanceof HTMLElement&&((s=this.elementObserver)==null||s.unobserve(h))}}),this.elementObserver=null,this.wrapper=U.createRef(),this.state={visible:!1}}componentDidMount(){var e;this.getEventNode();const{offset:n,threshold:u}=this.props,s={rootMargin:typeof n=="number"?`${n}px`:n||"0px",threshold:u||0};this.elementObserver=new IntersectionObserver(this.lazyLoadHandler,s);const a=(e=this.wrapper)==null?void 0:e.current;a instanceof HTMLElement&&this.elementObserver.observe(a)}shouldComponentUpdate(e,n){return n.visible}componentWillUnmount(){var e,n;const u=(e=this.wrapper)==null?void 0:e.current;u&&u instanceof HTMLElement&&((n=this.elementObserver)==null||n.unobserve(u))}getEventNode(){var e;return Y((e=this.wrapper)==null?void 0:e.current)}render(){const{children:e,className:n,height:u,width:s,elementType:a}=this.props,{visible:i}=this.state,o={height:u,width:s},h=`LazyLoad${i?" is-visible":""}${n?` ${n}`:""}`;return c.createElement(a||"div",{className:h,style:o,ref:this.wrapper},i&&c.Children.only(e))}}C(K,"defaultProps",{elementType:"div",className:"",offset:0,threshold:0,width:null,onContentVisible:null,height:null});function Z(t,e,n){var u=this,s=c.useRef(null),a=c.useRef(0),i=c.useRef(null),o=c.useRef([]),h=c.useRef(),j=c.useRef(),M=c.useRef(t),w=c.useRef(!0);M.current=t;var N=typeof window<"u",k=!e&&e!==0&&N;if(typeof t!="function")throw new TypeError("Expected a function");e=+e||0;var y=!!(n=n||{}).leading,d=!("trailing"in n)||!!n.trailing,l="maxWait"in n,x="debounceOnServer"in n&&!!n.debounceOnServer,m=l?Math.max(+n.maxWait||0,e):null;c.useEffect(function(){return w.current=!0,function(){w.current=!1}},[]);var b=c.useMemo(function(){var p=function(f){var g=o.current,O=h.current;return o.current=h.current=null,a.current=f,j.current=M.current.apply(O,g)},v=function(f,g){k&&cancelAnimationFrame(i.current),i.current=k?requestAnimationFrame(f):setTimeout(f,g)},E=function(f){if(!w.current)return!1;var g=f-s.current;return!s.current||g>=e||g<0||l&&f-a.current>=m},S=function(f){return i.current=null,d&&o.current?p(f):(o.current=h.current=null,j.current)},R=function f(){var g=Date.now();if(E(g))return S(g);if(w.current){var O=e-(g-s.current),A=l?Math.min(O,m-(g-a.current)):O;v(f,A)}},T=function(){if(N||x){var f=Date.now(),g=E(f);if(o.current=[].slice.call(arguments),h.current=u,s.current=f,g){if(!i.current&&w.current)return a.current=s.current,v(R,e),y?p(s.current):j.current;if(l)return v(R,e),p(s.current)}return i.current||v(R,e),j.current}};return T.cancel=function(){i.current&&(k?cancelAnimationFrame(i.current):clearTimeout(i.current)),a.current=0,o.current=s.current=h.current=i.current=null},T.isPending=function(){return!!i.current},T.flush=function(){return i.current?S(Date.now()):j.current},T},[y,l,e,m,d,k,N,x]);return b}function _({keywords:t,exclude:e}){const[n,u]=c.useState(I),[s,a]=c.useState([]),[i,o]=c.useState(!1),h=c.useRef(0),j=t.join(),M=JSON.stringify(e),w=c.useCallback(()=>{console.warn("IN CALLBACK",n);const y=JSON.parse(M);G(j).then(d=>{u(d);const l=H(d);console.log("GOT RESPONSE: ",l);const x=[];if(l.error!==""){const m=r.jsx("div",{id:"KeywordMatches",children:r.jsx("p",{id:"km-error-info",children:l.error.split(`
`).map((b,p)=>r.jsxs("p",{children:[b,r.jsx("br",{})]},p))})});x.push(m),a([...x]),console.error("ENCOUNTERED ERROR IN USEEFFECT",...x);return}for(let m=0;m<Math.min(l.numberOfResults-1,20);m++){const b=l.imageLink[m],p=l.id[m],v=l.title[m],E=l.description[m],S=70,R=E.length>S?E.substring(0,S-3)+"...":E;y.includes(p)||x.push(r.jsx($,{to:`/gallery/${p}`,className:"keyword-matches-link",children:r.jsxs("article",{className:"keyword-matches-tile",children:[r.jsx(P,{src:b,alt:v,classes:"keyword-matches-image"}),r.jsx("p",{className:"keyword-matches-description",children:R})]})},p))}D(s,x)||(console.log(s,l),a(x)),h.current===0&&(h.current+=20),o(!0)}).catch(d=>{d instanceof TypeError?(n.error!=="No keyword matches found."&&(u({...I,error:"No keyword matches found."}),console.log("Encountered TypeError.")),console.log("Encountered TypeError")):d instanceof Error&&d.name==="Error"?(n.error!=="Sorry, an unexpected error occurred."&&u({...I,error:"Sorry, an unexpected error occurred."}),console.log(`Encountered an Error. 
Error message: ${d.message||"none"}`)):(n.error===""&&u({...I,error:`Unexpected error occured of type '${d.name}'.`}),console.log(`Encountered ${d.name}.`))})},[]);c.useEffect(()=>{console.warn("IN USEEFFECT"),w(),console.warn("EXITING USEEFFECT")},[w]);function N(y=20){console.log("IN LOAD MORE",n);const d=[];for(let l=0;l<Math.min(n.numberOfResults,y+h.current);l++){const x=n.imageLink[l],m=n.id[l],b=n.title[l],p=n.description[l],v=70,E=p.length>v?p.substring(0,v-3)+"...":p;[...e].includes(m)||d.push(r.jsx($,{to:`/gallery/${m}`,className:"keyword-matches-link",children:r.jsxs("article",{className:"keyword-matches-tile",children:[r.jsx(P,{src:x,alt:b,classes:"keyword-matches-image"}),r.jsx("p",{className:"keyword-matches-description",children:E})]})},m))}h.current+=y,console.log(s,d,h.current),D(s,d)||(a(d),console.log(s,d))}const k=Z((y=20)=>N(y),3e3);return n.error!==""?r.jsx("div",{id:"KeywordMatches",children:r.jsx("h2",{id:"error-info",children:n.error.split(`
`).map((y,d)=>r.jsxs("p",{children:[y,r.jsx("br",{})]},d))})}):i?r.jsx(r.Fragment,{children:r.jsxs("div",{id:"KeywordMatches",children:[!n.error&&r.jsx("h3",{id:"keyword-matches-heading",children:"See more pictures like this:"}),r.jsx("div",{className:"keyword-matches-grid",children:r.jsx(V,{next:k,hasMore:n.numberOfResults-e.length!==s.length&&n.error==="",children:n.error===""?r.jsx(q,{columnsCountBreakPoints:{320:1,550:2,900:3,1200:4},children:r.jsx(z,{gutter:"1em",children:s})}):s,loader:r.jsx("div",{className:"loader"}),dataLength:s.length,scrollThreshold:.8,style:{overflow:"visible"}})})]})}):r.jsx(r.Fragment,{children:r.jsx("div",{className:"loader"})})}function re(){const[t,e]=c.useState(L),[n,u]=c.useState(!1),s=J(),a=c.useRef({id:s.id||""}),i=s.id;return window.scrollTo(0,0),c.useEffect(()=>{i?W(i).then(o=>{a.current.id=i,e({...o}),u(!0)}).catch(o=>{console.log(o),o instanceof TypeError?(t.error!==o.name&&e({...L,error:"No keyword matches found."}),console.log("Encountered TypeError")):o instanceof Error&&o.name==="Error"?(t.error!==o.name&&e({...L,error:"Sorry, an unexpected error occurred."}),console.log(`Encountered an Error. 
Error message: ${o.message||"none"}`)):(t.error!==o.name&&e({...L,error:`Unexpected error occured of type '${o.name}'.`}),console.log(`Encountered ${o.name}.`))}):e({...L,error:"Sorry, the requested image was not found."})},[i,t.error]),t.error!==""?r.jsx("div",{id:"GalleryImage",children:r.jsx("h1",{id:"error-info",children:t.error.split(`
`).map(o=>r.jsxs(r.Fragment,{children:[o,r.jsx("br",{})]}))})}):n&&s.id===a.current.id?r.jsxs("div",{id:"GalleryImage",children:[r.jsxs("div",{id:"gi-main",children:[r.jsx("div",{id:"gallery-image-container",children:r.jsx("img",{src:t.imageLink,alt:t.title,id:"gallery-image"})}),r.jsxs("div",{id:"gi-data",children:[r.jsx("h1",{id:"gi-image-title",children:t.title}),r.jsx("br",{}),r.jsx("p",{id:"gi-description",children:t.description}),r.jsx("br",{}),r.jsxs("code",{id:"gallery-image-address",children:[r.jsx("p",{id:"gallery-address-heading",children:"Image address:"}),r.jsx("a",{href:t.imageLink,className:"gallery-img-link",children:t.imageLink})]}),r.jsx("a",{id:"gallery-download-link",href:t.imageLink,download:t.title,children:r.jsx("h2",{children:"Download Image"})})]})]}),r.jsx(K,{children:r.jsx(_,{keywords:t.keywords,exclude:[t.id]})})]}):r.jsx("div",{id:"GalleryImage",children:r.jsx("div",{className:"loader"})})}export{re as default};
