"use strict";(self.webpackChunkcontent_insight_frontend=self.webpackChunkcontent_insight_frontend||[]).push([[595],{4128:function(e,t,r){r.r(t),r.d(t,{default:function(){return _}});var n=r(885),s=r(4165),i=r(5861),o=r(2791),a=r(7257),c=r(4880),d=r(3473),l=r(5764),u=r(1603),p="Billing_checkoutResultMessage__HI5wo",j=r(1243),g=r(7837),h=r(184),x=(0,d.J)("pk_test_51Nxd5pEafHQOYw4BGVCREVAXfGdqJ1waIwTd9TT9cWrP1dI8b9rkgaTV25WSRbVGzQFx9YcYDubV8WGF1Y0zNKYf00E2dA3E0t"),f=function(){var e=u.Z.user.userStripeCustomerId,t=function(){var t=(0,i.Z)((0,s.Z)().mark((function t(){var r;return(0,s.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,j.Z.post(u._+"/user/customerPortal",{userStripeCustomerId:e});case 2:r=t.sent,window.location.href=r.data.portal_session_url;case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return(0,h.jsxs)("div",{children:["User is registered in Stripe."," ",(0,h.jsx)(g.zx,{onClick:t,children:"To the customer portal"})]})},v=function(){var e=u.Z.user,t=e.createSubscription,r=e.getProjectById,s=u.Z.interface.currentProjectId,i=(0,o.useState)(""),a=(0,n.Z)(i,2),c=a[0],d=a[1],p=r(s);(0,o.useEffect)((function(){t({projectId:s,projectName:(null===p||void 0===p?void 0:p.projectName)||""}).then((function(e){return d(e)}))}),[]);var j={clientSecret:c};return(0,h.jsx)("div",{id:"checkout",children:c&&(0,h.jsx)(l.EmbeddedCheckoutProvider,{stripe:x,options:j,children:(0,h.jsx)(l.EmbeddedCheckout,{})})})},m=function(){var e,t=(0,o.useState)(),r=(0,n.Z)(t,2),s=r[0],i=r[1],a=u.Z.user,d=a.getPaymentSessionStatus,l=a.getProjectById,j=a.updateSubscriptionDataLocal,g=u.Z.interface,x=g.currentProjectId,f=g.setCurrentProjectId,v=(0,c.TH)().search;return(0,o.useEffect)((function(){if(v){var e=new URLSearchParams(v),t=e.get("session_id"),r=e.get("projectId");if(!t||!r)return;d({session_id:t,projectId:r}).then((function(e){i(e),f(r||""),j({projectId:r,isActive:"complete"===e.status,stripeCustomerId:e.stripeCustomerId,stripeProjectSubscriptionId:e.stripeProjectSubscriptionId,lastPaid:e.lastPaid})}))}}),[v]),s?(0,h.jsxs)("div",{className:p,children:["Checkout result for project :",(0,h.jsxs)("p",{children:["Project name : ",null===(e=l(x))||void 0===e?void 0:e.projectName]}),(0,h.jsxs)("p",{children:["Project id : ",x]}),(0,h.jsxs)("p",{children:["Result :","complete"===s.status?"Payment successful":"Payment failed"]})]}):null},_=(0,a.Pi)((function(){var e,t=(0,c.$B)().path,r=(0,u.Z.user.getProjectById)(u.Z.interface.currentProjectId);return(0,h.jsxs)(c.rs,{children:[(0,h.jsx)(c.AW,{exact:!0,path:t,component:null!==r&&void 0!==r&&null!==(e=r.subscription)&&void 0!==e&&e.id?f:v}),(0,h.jsx)(c.AW,{path:"".concat(t,"/checkoutResult"),component:m})]})}))},7797:function(e,t,r){r.r(t),r.d(t,{default:function(){return N}});var n=r(8683),s=r(7257),i=r(7837),o=r(4880),a=r(5146),c=r(1603),d="ProjectTile_projectTile__quj6f",l="ProjectTile_projectDetails__grJt9",u="ProjectTile_wrapper__v8hyE",p="ProjectTile_projectName__zn2aT",j="ProjectTile_projectDetailField__Y9KxJ",g="ProjectTile_projectControls__P+4YV",h=r(1374),x=r(184),f=(0,s.Pi)((function(e){var t=e._id,r=e.projectName,n=e.projectCreationDate,s=e.projectURL,i=e.subscription,f=e.onDelete,v=(0,o.k6)(),m=new Date(n||"").toLocaleDateString(void 0,{weekday:"long",year:"numeric",month:"long",day:"numeric"}),_=c.Z.interface.setCurrentProjectId;return(0,x.jsxs)("div",{className:d,children:[(0,x.jsx)("div",{className:l,onClick:function(){_(t||""),v.replace("/cabinet/settings")},children:(0,x.jsxs)("div",{className:u,children:[(0,x.jsxs)("div",{className:p,children:[r,(0,x.jsx)(h.Z,{isActive:!(null===i||void 0===i||!i.isActive)})]}),(0,x.jsxs)("div",{className:j,children:["URL: ",s]}),(0,x.jsxs)("div",{className:j,children:["Created: ",m]})]})}),(0,x.jsx)("div",{className:g,children:(0,x.jsx)(a.Z,{icon:"icon_delete",text:"Delete project",onClick:function(e){f(t||"")}})})]})})),v="Projects_projectsContainer__-CySH",m="Projects_addProjectButton__lsD59",_="Projects_projectTilesWrapper__ha7Uj",w=r(2791),N=(0,s.Pi)((function(){var e=c.Z.user.userProjects,t=c.Z.interface,r=t.setModalType,s=t.setCurrentProjectId,o=t.setDeleteProjectId,a=t.isLoading;(0,w.useEffect)((function(){return s("")}),[]);var d=function(e){o(e),r("projectDelete")};return(0,x.jsxs)("div",{className:v,children:[(0,x.jsx)(i.zx,{icon:"icon_plus",text:"Add project",className:m,onClick:function(){r("projectCreate")}}),(0,x.jsx)("div",{className:_,children:e.length?e.map((function(e){return(0,x.jsx)(f,(0,n.Z)((0,n.Z)({},e),{},{onDelete:d}),e._id)})):"You dont have any projects yet."}),a?(0,x.jsx)(i.$j,{}):null]})}))},4054:function(e,t,r){r.r(t),r.d(t,{default:function(){return R}});var n=r(2982),s=r(4165),i=r(8683),o=r(5861),a=r(885),c=r(2791),d=r(7257),l=r(1523),u=r(7837),p=r(4193),j=r(1603),g="Settings_projectPageWrapper__x8BfJ",h="Settings_projectPage__1LYim",x="Settings_projectHeader__MfVop",f="Settings_projectPageSection__HZoTz",v="Settings_sectionHeader__7Fv+K",m="Settings_sectionContent__mfMiW",_="Settings_widgetSettings__3ZVDl",w="Settings_widgetControls__SxOnQ",N="Settings_color__oSXPk",b="Settings_range__nDO0q",C="Settings_demoWidgetWrapper__dASOJ",P="Settings_knowledgeBase__rYB0Z",S="Settings_knowledgeBaseList__pqKmI",k="Settings_knowledgeBaseUploadForm__roudD",Z="Settings_filesList__LJdJd",B="Settings_scriptCode__72b-w",y="Settings_buttonsWrapper__QHHgf",I="Settings_dragndropMessage__I6pO6",D=r(184),R=(0,d.Pi)((function(){var e,t,r=(0,c.useState)(),d=(0,a.Z)(r,2),R=d[0],T=d[1],W=(0,c.useState)(""),z=(0,a.Z)(W,2),L=z[0],E=z[1],U=(0,c.useState)(""),A=(0,a.Z)(U,2),H=A[0],F=A[1],Y=(0,c.useState)(""),M=(0,a.Z)(Y,2),J=M[0],V=M[1],K=(0,c.useState)(""),O=(0,a.Z)(K,2),$=O[0],q=O[1],G=(0,c.useState)("0"),Q=(0,a.Z)(G,2),X=Q[0],ee=Q[1],te=(0,c.useState)(""),re=(0,a.Z)(te,2),ne=re[0],se=re[1],ie=(0,c.useState)("0"),oe=(0,a.Z)(ie,2),ae=oe[0],ce=oe[1],de=(0,c.useState)([]),le=(0,a.Z)(de,2),ue=le[0],pe=le[1],je=(0,c.useState)(""),ge=(0,a.Z)(je,2),he=ge[0],xe=ge[1],fe=j.Z.user,ve=fe._id,me=fe.getProjectById,_e=fe.saveProjectSettings,we=fe.ingestKnowledgeBase,Ne=j.Z.interface,be=Ne.isLoading,Ce=Ne.spinnerMessage,Pe=Ne.currentProjectId,Se=Ne.setSpinnerMessage,ke=Ne.pushNotification,Ze=Ne.setIsLoading,Be=Ne.setModalType;(0,c.useEffect)((function(){var e=me(Pe);if(e){var t=e.projectName,r=e.projectURL,n=e.widgetSettings,s=n.widgetHeaderColor,i=n.widgetBackgroundColor,o=n.widgetBorderColor,a=n.widgetBorderWidth,c=n.widgetBorderRadius;T(e),E(t||""),F(r||""),V(s||""),q(i||""),se(o||""),ce(a||""),ee(c||"")}}),[]);var ye=function(){return'   <script\n    id="clarify_bot_widget"\n    data-userId="'.concat(ve,'"\n    data-projectId="').concat(Pe,'"\n    src="https://content-insight-backend-c244a3d2147a.herokuapp.com/widget/getWidget"\n    data-backendURL="https://content-insight-backend-c244a3d2147a.herokuapp.com"\n   ><\/script>')},Ie=function(e){return function(t){switch(e){case"projectName":E(t.target.value);break;case"projectURL":F(t.target.value);break;case"widgetHeaderColor":V(t.target.value);break;case"widgetBackgroundColor":q(t.target.value);break;case"widgetBorderColor":se(t.target.value);break;case"widgetBorderWidth":ce(t.target.value);break;case"widgetBorderRadius":ee(t.target.value)}}},De=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((0,p.f)(L)?(0,p.r)(H)||(xe("projectURLError"),0):(xe("projectNameError"),0)){e.next=2;break}return e.abrupt("return");case 2:return xe(""),t=(0,i.Z)((0,i.Z)({},R),{},{projectName:L,projectURL:H}),Ze(!0),Se("Updating project metadata..."),e.next=8,_e(t);case 8:Ze(!1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Re=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Ze(!0),Se("Updating widget settings..."),t=(0,i.Z)((0,i.Z)({},R),{},{widgetSettings:{widgetHeaderColor:J,widgetBackgroundColor:$,widgetBorderRadius:X,widgetBorderColor:ne,widgetBorderWidth:ae}}),e.next=5,_e(t);case 5:Ze(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Te=function(e){console.log("handleFilesAdd"),e.preventDefault(),e.stopPropagation();try{for(var t="drop"===e.type?e.dataTransfer.files:e.target.files,r=(0,n.Z)(ue),s=0;s<t.length;s+=1)"text/plain"===t[s].type&&r.push(t[s]);pe(r)}catch(he){ke({type:"error",message:"Error while loading files from local drive. \n"+he.message})}},We=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(){var t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Ze(!0),Se("Ingesting knowledge base"),t=new FormData,ue.forEach((function(e){t.append("dataFiles",e)})),t.append("projectId",(null===R||void 0===R?void 0:R._id)||""),t.append("projectName",(null===R||void 0===R?void 0:R.projectName)||""),e.next=8,we(t);case 8:pe([]);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return R?(0,D.jsxs)("div",{className:g,children:[(0,D.jsx)("div",{className:x,children:(0,D.jsx)(l.rU,{to:"/cabinet/projects",style:{display:"block",width:"fit-content"},children:(0,D.jsx)(u.zx,{icon:"icon_arrow_left",text:"To projects list"})})}),(0,D.jsxs)("div",{className:h,children:[(0,D.jsxs)("div",{className:f,children:[(0,D.jsxs)("div",{className:v,children:[(0,D.jsx)("h2",{children:"Widget settings"}),(0,D.jsx)(u.zx,{disabled:be,text:"Discard",icon:"icon_close",onClick:function(){if(R){var e=R.widgetSettings;V((null===e||void 0===e?void 0:e.widgetHeaderColor)||""),q((null===e||void 0===e?void 0:e.widgetBackgroundColor)||""),se((null===e||void 0===e?void 0:e.widgetBorderColor)||""),ce((null===e||void 0===e?void 0:e.widgetBorderWidth)||""),ee((null===e||void 0===e?void 0:e.widgetBorderRadius)||"")}}}),(0,D.jsx)(u.zx,{disabled:be,text:"Save",icon:"icon_save",onClick:Re})]}),(0,D.jsxs)("div",{className:m+" "+_,children:[(0,D.jsxs)("div",{className:w,children:[" ",(0,D.jsxs)("label",{className:N,children:["Header color",(0,D.jsx)("input",{type:"color",value:J,onChange:Ie("widgetHeaderColor")})]}),(0,D.jsxs)("label",{className:N,children:["Background color",(0,D.jsx)("input",{type:"color",value:$,onChange:Ie("widgetBackgroundColor")})]}),(0,D.jsxs)("label",{className:N,children:["Border color",(0,D.jsx)("input",{type:"color",value:ne,onChange:Ie("widgetBorderColor")})]}),(0,D.jsxs)("label",{className:b,children:["Border width, px",(0,D.jsx)("input",{type:"range",min:0,max:6,value:ae,onChange:Ie("widgetBorderWidth")})]}),(0,D.jsxs)("label",{className:b,children:["Border radius, px",(0,D.jsx)("input",{type:"range",min:0,max:30,value:X,onChange:Ie("widgetBorderRadius")})]})]}),(0,D.jsx)("div",{className:C,children:(0,D.jsx)(u.e4,{settings:{projectId:Pe,widgetHeaderColor:J,widgetBackgroundColor:$,widgetBorderRadius:X,widgetBorderColor:ne,widgetBorderWidth:ae}})})]})]}),(0,D.jsxs)("div",{className:f,children:[(0,D.jsxs)("div",{className:v,children:[(0,D.jsx)("h2",{children:"Knowledge base"}),(0,D.jsxs)("div",{className:y,children:[(0,D.jsx)(u.zx,{disabled:be||!ue.length,text:"Ingest",icon:"icon_edit",onClick:We}),(0,D.jsx)(u.zx,{disabled:be||!(null!==R&&void 0!==R&&null!==(e=R.projectIngestedData)&&void 0!==e&&e.length),text:"Delete",icon:"icon_delete",onClick:function(){Se("Deleting knowledge base"),Be("proejctKBDelete"),pe([])}})]})]}),(0,D.jsxs)("div",{className:m+" "+P,children:[(0,D.jsxs)("div",{children:[(0,D.jsx)("label",{children:"List of knowledgebase files"}),(0,D.jsx)("div",{className:S,children:(0,D.jsx)("ul",{className:Z,children:null===R||void 0===R||null===(t=R.projectIngestedData)||void 0===t?void 0:t.map((function(e){var t=e.fileName,r=e.size;return(0,D.jsxs)("li",{children:[(0,D.jsx)("span",{children:t}),(0,D.jsxs)("span",{children:[Number.parseFloat(r||"").toFixed(2)," kb"]})]},t)}))})})]}),(0,D.jsxs)("div",{children:[(0,D.jsx)("label",{children:"Ingest files"}),(0,D.jsxs)("div",{className:k,onDragOver:function(e){e.preventDefault(),e.stopPropagation()},children:[" ",(0,D.jsx)("input",{title:"files to upload",type:"file",accept:".txt",multiple:!0,onDragEnd:Te,onChange:Te}),null!==ue&&void 0!==ue&&ue.length?(0,D.jsx)("ul",{className:Z,children:Array.from(ue).map((function(e){var t=e.name,r=e.size;return(0,D.jsxs)("li",{children:[(0,D.jsx)("span",{children:t}),(0,D.jsx)("span",{children:r})]},t+r)}))}):(0,D.jsx)("div",{className:I,children:"Drag'n'drop txt files or click the area for dialog window. Files are adding up to the ones that are already in knowledge base."})]})]})]})]})," ",(0,D.jsxs)("div",{className:f,children:[(0,D.jsxs)("div",{className:v,children:[(0,D.jsx)("h2",{children:"Metadata"}),(0,D.jsx)(u.zx,{disabled:be,text:"Discard",icon:"icon_close",onClick:function(){E((null===R||void 0===R?void 0:R.projectName)||""),F((null===R||void 0===R?void 0:R.projectURL)||"")}}),(0,D.jsx)(u.zx,{disabled:be,text:"Save",icon:"icon_save",onClick:De})]}),(0,D.jsxs)("div",{className:m,children:[(0,D.jsxs)("label",{children:["Project name",(0,D.jsx)("span",{className:"hintText",children:"leters, numbers, dashes are allowed"}),(0,D.jsx)("input",{type:"text",className:"projectNameError"===he?"error":"",placeholder:"project-name",value:L,onChange:Ie("projectName")})]}),(0,D.jsxs)("label",{children:["Project URL for the widget usage",(0,D.jsx)("input",{type:"url",className:"projectURLError"===he?"error":"",placeholder:"https://example.com",value:H,onChange:Ie("projectURL")})]})]})]}),(0,D.jsxs)("div",{className:f,children:[(0,D.jsxs)("div",{className:v,children:[(0,D.jsx)("h2",{children:"Client script"}),(0,D.jsx)(u.zx,{disabled:be,text:"Copy",icon:"icon_copy",onClick:function(){window.navigator.clipboard.writeText(ye()).then((function(){return ke({type:"info",message:"Script copied to clipboard."})}))}})]}),(0,D.jsxs)("div",{className:m,children:[(0,D.jsx)("code",{className:B,children:ye()})," "]})]}),be?(0,D.jsx)(u.$j,{text:Ce}):null]})]}):(0,D.jsx)("div",{children:"Project not found."})}))},346:function(e,t,r){r.r(t),r.d(t,{default:function(){return s}});var n=r(184),s=function(){return(0,n.jsx)("div",{children:"Stats."})}},266:function(e,t,r){r.r(t),r.d(t,{Billing:function(){return m.default},Projects:function(){return v.default},Settings:function(){return _.default},Stats:function(){return w.default},default:function(){return f}});var n=r(885),s=r(2791),i=r(7257),o=r(4880),a=r(7837),c=r(1603),d="Cabinet_projectTitle__mdMBP",l="Cabinet_projectName__zYEFB",u="Cabinet_projectId__6NzER",p=r(184),j=(0,s.lazy)((function(){return Promise.resolve().then(r.bind(r,7797))})),g=(0,s.lazy)((function(){return Promise.resolve().then(r.bind(r,4128))})),h=(0,s.lazy)((function(){return Promise.resolve().then(r.bind(r,4054))})),x=(0,s.lazy)((function(){return Promise.resolve().then(r.bind(r,346))})),f=(0,i.Pi)((function(){var e,t=(0,o.$B)().url,r=(0,o.TH)().pathname,i=c.Z.interface.currentProjectId,f=c.Z.user.getProjectById,v=(0,s.useState)(),m=(0,n.Z)(v,2),_=m[0],w=m[1];return(0,s.useEffect)((function(){w(f(i))}),[i]),(0,p.jsx)("div",{className:"page",children:(0,p.jsxs)("div",{className:"pageContent",children:[_?(0,p.jsxs)("div",{className:d,children:[(0,p.jsxs)("h1",{className:l,children:["Project name : "+_.projectName,(0,p.jsx)(a.tU,{isActive:!(null===(e=_.subscription)||void 0===e||!e.isActive)})]}),(0,p.jsx)("span",{className:u,children:"Project id : "+_._id})]}):null,(0,p.jsx)(s.Suspense,{fallback:(0,p.jsx)(a.$j,{}),children:(0,p.jsxs)(o.rs,{children:[(0,p.jsx)(o.l_,{from:"/:url*(/+)",to:r.slice(0,-1)})," ",(0,p.jsx)(o.AW,{path:"".concat(t,"/projects"),component:j}),(0,p.jsx)(o.AW,{path:"".concat(t,"/stats"),component:x}),(0,p.jsx)(o.AW,{path:"".concat(t,"/billing"),component:g}),(0,p.jsx)(o.AW,{path:"".concat(t,"/settings"),component:h}),(0,p.jsx)(o.l_,{to:"".concat(t,"/projects")})," "]})})]})})})),v=r(7797),m=r(4128),_=r(4054),w=r(346)}}]);
//# sourceMappingURL=Cabinet.06622b48.chunk.js.map