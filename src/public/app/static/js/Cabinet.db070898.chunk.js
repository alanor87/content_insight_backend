"use strict";(self.webpackChunkcontent_insight_frontend=self.webpackChunkcontent_insight_frontend||[]).push([[595],{4128:function(e,t,r){r.r(t),r.d(t,{default:function(){return w}});var n=r(885),s=r(4165),i=r(5861),o=r(2791),a=r(7257),c=r(1243),l=r(4880),d=r(7837),u=r(3473),p=r(5764),j=r(1603),g=r(6195),x="Billing_checkoutResultMessage__HI5wo",h=r(184),v=(0,u.J)("production"===g.O?"pk_live_51Nxd5pEafHQOYw4BCyqKCmyF3KfPhaD9jlNKBODcRTlusWqtqHS8k73scyJDagI1cwAHElCEIF4qgcbU21e7kfA700qxfZJHKU":"pk_test_51Nxd5pEafHQOYw4BGVCREVAXfGdqJ1waIwTd9TT9cWrP1dI8b9rkgaTV25WSRbVGzQFx9YcYDubV8WGF1Y0zNKYf00E2dA3E0t"),f=function(){var e=j.Z.user.userStripeCustomerId,t=function(){var t=(0,i.Z)((0,s.Z)().mark((function t(){var r;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.Z.post(j._+"/api/v1/user/customerPortal",{userStripeCustomerId:e});case 2:r=t.sent,window.location.href=r.data.portal_session_url;case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return(0,h.jsxs)("div",{children:["User is registered in Stripe."," ",(0,h.jsx)(d.zx,{onClick:t,children:"To the customer portal"})]})},_=function(){var e=j.Z.user,t=e.createSubscription,r=e.getProjectById,s=j.Z.interface.currentProjectId,i=(0,o.useState)(""),a=(0,n.Z)(i,2),c=a[0],l=a[1],d=r(s);(0,o.useEffect)((function(){t({projectId:s,projectName:(null===d||void 0===d?void 0:d.projectName)||""}).then((function(e){return l(e)}))}),[]);var u={clientSecret:c};return(0,h.jsx)("div",{id:"checkout",children:c&&(0,h.jsx)(p.EmbeddedCheckoutProvider,{stripe:v,options:u,children:(0,h.jsx)(p.EmbeddedCheckout,{})})})},m=function(){var e,t=(0,o.useState)(),r=(0,n.Z)(t,2),s=r[0],i=r[1],a=j.Z.user,c=a.getPaymentSessionStatus,d=a.getProjectById,u=a.updateSubscriptionDataLocal,p=j.Z.interface,g=p.currentProjectId,v=p.setCurrentProjectId,f=(0,l.TH)().search;return(0,o.useEffect)((function(){if(f){var e=new URLSearchParams(f),t=e.get("session_id"),r=e.get("projectId");if(!t||!r)return;c({session_id:t,projectId:r}).then((function(e){i(e),v(r||""),u({projectId:r,isActive:"complete"===e.status,stripeCustomerId:e.stripeCustomerId,stripeProjectSubscriptionId:e.stripeProjectSubscriptionId,lastPaid:e.lastPaid})}))}}),[f]),s?(0,h.jsxs)("div",{className:x,children:["Checkout result for project :",(0,h.jsxs)("p",{children:["Project name : ",null===(e=d(g))||void 0===e?void 0:e.projectName]}),(0,h.jsxs)("p",{children:["Project id : ",g]}),(0,h.jsxs)("p",{children:["Result :","complete"===s.status?"Payment successful":"Payment failed"]})]}):null},w=(0,a.Pi)((function(){var e,t=(0,l.$B)().path,r=j.Z.user.getProjectById,n=j.Z.interface.currentProjectId,s=r(n);return n?(0,h.jsxs)(l.rs,{children:[(0,h.jsx)(l.AW,{exact:!0,path:t,component:null!==s&&void 0!==s&&null!==(e=s.subscription)&&void 0!==e&&e.id?f:_}),(0,h.jsx)(l.AW,{path:"".concat(t,"/checkoutResult"),component:m})]}):(0,h.jsx)(l.l_,{to:"/projects"})}))},7797:function(e,t,r){r.r(t),r.d(t,{default:function(){return N}});var n=r(8683),s=r(7257),i=r(7837),o=r(4880),a=r(5146),c=r(1603),l="ProjectTile_projectTile__quj6f",d="ProjectTile_projectDetails__grJt9",u="ProjectTile_wrapper__v8hyE",p="ProjectTile_projectName__zn2aT",j="ProjectTile_projectDetailField__Y9KxJ",g="ProjectTile_projectControls__P+4YV",x=r(1374),h=r(184),v=(0,s.Pi)((function(e){var t=e._id,r=e.projectName,n=e.projectCreationDate,s=e.projectURL,i=e.subscription,v=e.onDelete,f=(0,o.k6)(),_=new Date(n||"").toLocaleDateString(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"}),m=c.Z.interface.setCurrentProjectId;return(0,h.jsxs)("div",{className:l,children:[(0,h.jsx)("div",{className:d,onClick:function(){m(t||""),f.replace("/cabinet/settings")},children:(0,h.jsxs)("div",{className:u,children:[(0,h.jsxs)("div",{className:p,children:[r,(0,h.jsx)(x.Z,{isActive:!(null===i||void 0===i||!i.isActive)})]}),(0,h.jsxs)("div",{className:j,children:["URL: ",s]}),(0,h.jsxs)("div",{className:j,children:["Created: ",_]})]})}),(0,h.jsx)("div",{className:g,children:(0,h.jsx)(a.Z,{icon:"icon_delete",text:"Delete project",onClick:function(e){v(t||"")}})})]})})),f="Projects_projectsContainer__-CySH",_="Projects_addProjectButton__lsD59",m="Projects_projectTilesWrapper__ha7Uj",w=r(2791),N=(0,s.Pi)((function(){var e=c.Z.user.userProjects,t=c.Z.interface,r=t.setModalType,s=t.setCurrentProjectId,o=t.setDeleteProjectId,a=t.isLoading;(0,w.useEffect)((function(){return s("")}),[]);var l=function(e){o(e),r("projectDelete")};return(0,h.jsxs)("div",{className:f,children:[(0,h.jsx)(i.zx,{icon:"icon_plus",text:"Add project",className:_,onClick:function(){r("projectCreate")}}),(0,h.jsx)("div",{className:m,children:e.length?e.map((function(e){return(0,h.jsx)(v,(0,n.Z)((0,n.Z)({},e),{},{onDelete:l}),e._id)})):"You dont have any projects yet."}),a?(0,h.jsx)(i.$j,{}):null]})}))},4054:function(e,t,r){r.r(t),r.d(t,{default:function(){return L}});var n=r(2982),s=r(4165),i=r(8683),o=r(5861),a=r(885),c=r(2791),l=r(7257),d=r(1523),u=r(7837),p=r(4193),j=r(1603),g="Settings_projectPageWrapper__x8BfJ",x="Settings_projectPage__1LYim",h="Settings_projectHeader__MfVop",v="Settings_projectPageSection__HZoTz",f="Settings_sectionHeader__7Fv+K",_="Settings_sectionContent__mfMiW",m="Settings_widgetSettings__3ZVDl",w="Settings_widgetControls__SxOnQ",N="Settings_color__oSXPk",C="Settings_range__nDO0q",b="Settings_demoWidgetWrapper__dASOJ",S="Settings_knowledgeBase__rYB0Z",k="Settings_labelWrapper__AToKV",P="Settings_clearList__ujRdJ",Z="Settings_knowledgeBaseList__pqKmI",B="Settings_knowledgeBaseUploadForm__roudD",y="Settings_filesList__LJdJd",I="Settings_scriptCode__72b-w",D="Settings_buttonsWrapper__QHHgf",R="Settings_dragndropMessage__I6pO6",T=r(184),L=(0,l.Pi)((function(){var e,t,r=(0,c.useState)(),l=(0,a.Z)(r,2),L=l[0],W=l[1],E=(0,c.useState)(""),z=(0,a.Z)(E,2),H=z[0],U=z[1],A=(0,c.useState)(""),F=(0,a.Z)(A,2),K=F[0],Y=F[1],J=(0,c.useState)(""),M=(0,a.Z)(J,2),q=M[0],O=M[1],V=(0,c.useState)(""),Q=(0,a.Z)(V,2),$=Q[0],G=Q[1],X=(0,c.useState)("0"),ee=(0,a.Z)(X,2),te=ee[0],re=ee[1],ne=(0,c.useState)(""),se=(0,a.Z)(ne,2),ie=se[0],oe=se[1],ae=(0,c.useState)("0"),ce=(0,a.Z)(ae,2),le=ce[0],de=ce[1],ue=(0,c.useState)([]),pe=(0,a.Z)(ue,2),je=pe[0],ge=pe[1],xe=(0,c.useState)(""),he=(0,a.Z)(xe,2),ve=he[0],fe=he[1],_e=(0,c.useRef)(null),me=j.Z.user,we=me._id,Ne=me.getProjectById,Ce=me.saveProjectSettings,be=me.ingestKnowledgeBase,Se=j.Z.interface,ke=Se.isLoading,Pe=Se.spinnerMessage,Ze=Se.currentProjectId,Be=Se.setSpinnerMessage,ye=Se.pushNotification,Ie=Se.setIsLoading,De=Se.setModalType;(0,c.useEffect)((function(){if(!ke){var e=Ne(Ze);if(e){var t=e.projectName,r=e.projectURL,n=e.widgetSettings,s=n.widgetHeaderColor,i=n.widgetBackgroundColor,o=n.widgetBorderColor,a=n.widgetBorderWidth,c=n.widgetBorderRadius;W(e),U(t||""),Y(r||""),O(s||""),G(i||""),oe(o||""),de(a||""),re(c||"")}}}),[ke,Ze]);var Re=function(){return'   <script\n    id="clarify_bot_widget"\n    data-userId="'.concat(we,'"\n    data-projectId="').concat(Ze,'"\n    src="').concat(j._,"/widget/getWidget?projectId=").concat(Ze,'"\n    data-backendURL="').concat(j._,'"\n   ><\/script>')},Te=function(e){return function(t){switch(e){case"projectName":U(t.target.value);break;case"projectURL":Y(t.target.value);break;case"widgetHeaderColor":O(t.target.value);break;case"widgetBackgroundColor":G(t.target.value);break;case"widgetBorderColor":oe(t.target.value);break;case"widgetBorderWidth":de(t.target.value);break;case"widgetBorderRadius":re(t.target.value)}}},Le=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((0,p.f)(H)?(0,p.r)(K)||(fe("projectURLError"),0):(fe("projectNameError"),0)){e.next=2;break}return e.abrupt("return");case 2:return fe(""),t=(0,i.Z)((0,i.Z)({},L),{},{projectName:H,projectURL:K}),Ie(!0),Be("Updating project metadata..."),e.next=8,Ce(t);case 8:Ie(!1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),We=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Ie(!0),Be("Updating widget settings..."),t=(0,i.Z)((0,i.Z)({},L),{},{widgetSettings:{widgetHeaderColor:q,widgetBackgroundColor:$,widgetBorderRadius:te,widgetBorderColor:ie,widgetBorderWidth:le}}),e.next=5,Ce(t);case 5:Ie(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ee=function(e){e.preventDefault(),e.stopPropagation(),console.log("handleFilesAdd");try{for(var t,r="drop"===e.type?e.dataTransfer.files:e.target.files,s=(0,n.Z)(je),i=0;i<r.length;i+=1)"text/plain"===r[i].type&&s.push(r[i]);ge(s),null!==_e&&void 0!==_e&&null!==(t=_e.current)&&void 0!==t&&t.value&&(_e.current.value="")}catch(ve){ye({type:"error",message:"Error while loading files from local drive. \n"+ve.message})}},ze=function(){ge([])},He=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Ie(!0),Be("Ingesting knowledge base"),t=new FormData,je.forEach((function(e){t.append("dataFiles",e)})),t.append("projectId",(null===L||void 0===L?void 0:L._id)||""),t.append("projectName",(null===L||void 0===L?void 0:L.projectName)||""),e.next=8,be(t);case 8:ze();case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return L?(0,T.jsxs)("div",{className:g,children:[(0,T.jsx)("div",{className:h,children:(0,T.jsx)(d.rU,{to:"/cabinet/projects",style:{display:"block",width:"fit-content"},children:(0,T.jsx)(u.zx,{icon:"icon_arrow_left",text:"To projects list"})})}),(0,T.jsxs)("div",{className:x,children:[(0,T.jsxs)("div",{className:v,children:[(0,T.jsxs)("div",{className:f,children:[(0,T.jsx)("h2",{children:"Widget settings"}),(0,T.jsx)(u.zx,{disabled:ke,text:"Discard",icon:"icon_close",onClick:function(){if(L){var e=L.widgetSettings;O((null===e||void 0===e?void 0:e.widgetHeaderColor)||""),G((null===e||void 0===e?void 0:e.widgetBackgroundColor)||""),oe((null===e||void 0===e?void 0:e.widgetBorderColor)||""),de((null===e||void 0===e?void 0:e.widgetBorderWidth)||""),re((null===e||void 0===e?void 0:e.widgetBorderRadius)||"")}}}),(0,T.jsx)(u.zx,{disabled:ke,text:"Save",icon:"icon_save",onClick:We})]}),(0,T.jsxs)("div",{className:_+" "+m,children:[(0,T.jsxs)("div",{className:w,children:[" ",(0,T.jsxs)("label",{className:N,children:["Header color",(0,T.jsx)("input",{type:"color",value:q,onChange:Te("widgetHeaderColor")})]}),(0,T.jsxs)("label",{className:N,children:["Background color",(0,T.jsx)("input",{type:"color",value:$,onChange:Te("widgetBackgroundColor")})]}),(0,T.jsxs)("label",{className:N,children:["Border color",(0,T.jsx)("input",{type:"color",value:ie,onChange:Te("widgetBorderColor")})]}),(0,T.jsxs)("label",{className:C,children:["Border width, px",(0,T.jsx)("input",{type:"range",min:0,max:6,value:le,onChange:Te("widgetBorderWidth")})]}),(0,T.jsxs)("label",{className:C,children:["Border radius, px",(0,T.jsx)("input",{type:"range",min:0,max:30,value:te,onChange:Te("widgetBorderRadius")})]})]}),(0,T.jsx)("div",{className:b,children:(0,T.jsx)(u.e4,{settings:{projectId:Ze,widgetHeaderColor:q,widgetBackgroundColor:$,widgetBorderRadius:te,widgetBorderColor:ie,widgetBorderWidth:le}})})]})]}),(0,T.jsxs)("div",{className:v,children:[(0,T.jsxs)("div",{className:f,children:[(0,T.jsx)("h2",{children:"Knowledge base"}),(0,T.jsxs)("div",{className:D,children:[(0,T.jsx)(u.zx,{disabled:ke||!je.length,text:"Ingest",icon:"icon_edit",onClick:He}),(0,T.jsx)(u.zx,{disabled:ke||!(null!==L&&void 0!==L&&null!==(e=L.projectIngestedData)&&void 0!==e&&e.length),text:"Delete",icon:"icon_delete",onClick:function(){Be("Deleting knowledge base"),De("proejctKBDelete"),ze()}})]})]}),(0,T.jsxs)("div",{className:_+" "+S,children:[(0,T.jsxs)("div",{children:[(0,T.jsx)("label",{children:"List of knowledgebase files"}),(0,T.jsx)("div",{className:Z,children:(0,T.jsx)("ul",{className:y,children:null===L||void 0===L||null===(t=L.projectIngestedData)||void 0===t?void 0:t.map((function(e){var t=e.fileName,r=e.size;return(0,T.jsxs)("li",{children:[(0,T.jsx)("span",{children:t}),(0,T.jsxs)("span",{children:[Number.parseFloat(r||"").toFixed(2)," kb"]})]},t)}))})})]}),(0,T.jsxs)("div",{children:[(0,T.jsxs)("label",{className:k,children:[(0,T.jsx)("span",{children:"Files to ingest"}),null!==je&&void 0!==je&&je.length?(0,T.jsx)("span",{className:P,onClick:ze,children:"Clear list"}):null]}),(0,T.jsx)("input",{ref:_e,type:"file",accept:".txt",multiple:!0,onChange:Ee}),(0,T.jsx)("div",{className:B,onDragOver:function(e){return e.preventDefault()},onDrop:Ee,onClick:function(){var e;return null===_e||void 0===_e||null===(e=_e.current)||void 0===e?void 0:e.click()},children:null!==je&&void 0!==je&&je.length?(0,T.jsx)("ul",{className:y,children:Array.from(je).map((function(e){var t=e.name,r=e.size;return(0,T.jsxs)("li",{children:[(0,T.jsx)("span",{children:t}),(0,T.jsx)("span",{children:"".concat(r/1e3," kb")})]},t+r)}))}):(0,T.jsx)("div",{className:R,children:"Drag'n'drop txt files or click Add files button. Files are adding up to the ones that are already in knowledge base."})})]})]})]})," ",(0,T.jsxs)("div",{className:v,children:[(0,T.jsxs)("div",{className:f,children:[(0,T.jsx)("h2",{children:"Metadata"}),(0,T.jsx)(u.zx,{disabled:ke,text:"Discard",icon:"icon_close",onClick:function(){U((null===L||void 0===L?void 0:L.projectName)||""),Y((null===L||void 0===L?void 0:L.projectURL)||"")}}),(0,T.jsx)(u.zx,{disabled:ke,text:"Save",icon:"icon_save",onClick:Le})]}),(0,T.jsxs)("div",{className:_,children:[(0,T.jsxs)("label",{children:["Project name",(0,T.jsx)("span",{className:"hintText",children:"leters, numbers, dashes are allowed"}),(0,T.jsx)("input",{type:"text",className:"projectNameError"===ve?"error":"",placeholder:"project-name",value:H,onChange:Te("projectName")})]}),(0,T.jsxs)("label",{children:["Project URL for the widget usage",(0,T.jsx)("input",{type:"url",className:"projectURLError"===ve?"error":"",placeholder:"https://example.com",value:K,onChange:Te("projectURL")})]})]})]}),(0,T.jsxs)("div",{className:v,children:[(0,T.jsxs)("div",{className:f,children:[(0,T.jsx)("h2",{children:"Client script"}),(0,T.jsx)(u.zx,{disabled:ke,text:"Copy",icon:"icon_copy",onClick:function(){window.navigator.clipboard.writeText(Re()).then((function(){return ye({type:"info",message:"Script copied to clipboard."})}))}})]}),(0,T.jsxs)("div",{className:_,children:[(0,T.jsx)("code",{className:I,children:Re()})," "]})]}),ke?(0,T.jsx)(u.$j,{text:Pe}):null]})]}):(0,T.jsx)("div",{children:"Project not found."})}))},1895:function(e,t,r){r.r(t),r.d(t,{Billing:function(){return f.default},Projects:function(){return v.default},Settings:function(){return _.default},Stats:function(){return m},default:function(){return h}});var n=r(885),s=r(2791),i=r(7257),o=r(4880),a=r(7837),c=r(1603),l="Cabinet_projectTitle__mdMBP",d="Cabinet_projectName__zYEFB",u="Cabinet_projectId__6NzER",p=r(184),j=(0,s.lazy)((function(){return Promise.resolve().then(r.bind(r,7797))})),g=(0,s.lazy)((function(){return Promise.resolve().then(r.bind(r,4128))})),x=(0,s.lazy)((function(){return Promise.resolve().then(r.bind(r,4054))})),h=(0,i.Pi)((function(){var e,t=(0,o.$B)().url,r=(0,o.TH)().pathname,i=c.Z.interface,h=i.currentProjectId,v=i.isLoading,f=c.Z.user.getProjectById,_=(0,s.useState)(),m=(0,n.Z)(_,2),w=m[0],N=m[1];return(0,s.useEffect)((function(){N(f(h))}),[h,v]),(0,p.jsx)("div",{className:"page",children:(0,p.jsxs)("div",{className:"pageContent",children:[w?(0,p.jsxs)("div",{className:l,children:[(0,p.jsxs)("h1",{className:d,children:["Project name : "+w.projectName,(0,p.jsx)(a.tU,{isActive:!(null===(e=w.subscription)||void 0===e||!e.isActive)})]}),(0,p.jsx)("span",{className:u,children:"Project id : "+w._id})]}):null,(0,p.jsx)(s.Suspense,{fallback:(0,p.jsx)(a.$j,{}),children:(0,p.jsxs)(o.rs,{children:[(0,p.jsx)(o.l_,{from:"/:url*(/+)",to:r.slice(0,-1)})," ",(0,p.jsx)(o.AW,{path:"".concat(t,"/projects"),component:j}),(0,p.jsx)(o.AW,{path:"".concat(t,"/billing"),component:g}),(0,p.jsx)(o.AW,{path:"".concat(t,"/settings"),component:x}),(0,p.jsx)(o.l_,{to:"".concat(t,"/projects")})," "]})})]})})})),v=r(7797),f=r(4128),_=r(4054),m=function(){return(0,p.jsx)("div",{children:"Stats."})}}}]);
//# sourceMappingURL=Cabinet.db070898.chunk.js.map