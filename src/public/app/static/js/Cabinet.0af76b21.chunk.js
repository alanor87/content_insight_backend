"use strict";(self.webpackChunkcontent_insight_frontend=self.webpackChunkcontent_insight_frontend||[]).push([[595],{2889:function(e,t,n){n.r(t),n.d(t,{default:function(){return s}});var r=n(184),s=function(){return(0,r.jsx)("div",{children:"Billing."})}},4194:function(e,t,n){n.r(t),n.d(t,{default:function(){return $}});var r=n(7257),s=n(4880),a=n(8683),c=n(7823),o=n(2791),i=n(1523),l=n(5146),d="ProjectTile_projectTile__quj6f",j="ProjectTile_projectDetails__grJt9",u="ProjectTile_projectName__zn2aT",p="ProjectTile_projectURL__QeNpF",h="ProjectTile_projectControls__P+4YV",x=n(184),f=function(e){var t=e._id,n=e.projectName,r=e.projectCreationDate,a=e.projectURL,c=e.onDelete,o=(0,s.$B)().url;return(0,x.jsxs)("div",{className:d,children:[(0,x.jsxs)("div",{className:j,children:[" ",(0,x.jsxs)(i.rU,{to:"".concat(o,"/").concat(t),children:[(0,x.jsx)("div",{className:u,children:n}),(0,x.jsxs)("div",{className:p,children:["URL: ",a]}),(0,x.jsxs)("div",{className:p,children:["Created: ",r]})]})]}),(0,x.jsx)("div",{className:h,children:(0,x.jsx)(l.Z,{icon:"icon_delete",text:"Delete project",onClick:function(){c(t)}})})]})},g=(0,o.memo)(f),m=n(7863),_="ProjectsList_projectsContainer__q0Cj8",v="ProjectsList_addProjectButton__pAUz0",P="ProjectsList_projectTilesWrapper__BioBg",N=(0,r.Pi)((function(){var e=m.Z.user.userProjects,t=m.Z.interface,n=t.setModalType,r=t.setCurrentProjectId,s=t.isLoading,o=function(e){r(e),n("projectDelete")};return(0,x.jsxs)("div",{className:_,children:[(0,x.jsx)(c.zx,{icon:"icon_plus",text:"Add project",className:v,onClick:function(){n("projectCreate")}}),(0,x.jsx)("div",{className:P,children:e.length?e.map((function(e){return(0,x.jsx)(g,(0,a.Z)((0,a.Z)({},e),{},{onDelete:o}),e._id)})):"You dont have any projects yet."}),s?(0,x.jsx)(c.$j,{}):null]})})),w=n(2982),b=n(4165),k=n(5861),L=n(885),y="ProjectPage_projectPageWrapper__DfPKp",C="ProjectPage_projectPage__gPfMH",U="ProjectPage_projectHeader__Npbm9",Z="ProjectPage_settings__O-GlV",D="ProjectPage_knowledgeBase__pVuHl",R="ProjectPage_knowledgeBaseList__HxEv1",B="ProjectPage_knowledgeBaseUploadForm__k82B2",S="ProjectPage_projectPageSection__BaH67",z="ProjectPage_sectionHeader__8KMsL",I="ProjectPage_sectionContent__WjGjw",T="ProjectPage_scriptCode__YCQon",W="ProjectPage_buttonsWrapper__uchQ+",A="ProjectPage_dragndropMessage__cuePI",E="ProjectPage_filesList__qlSQN",F=n(4193),H=(0,r.Pi)((function(){var e=(0,s.UO)().id,t=(0,o.useState)(),n=(0,L.Z)(t,2),r=n[0],l=n[1],d=(0,o.useState)(""),j=(0,L.Z)(d,2),u=j[0],p=j[1],h=(0,o.useState)(""),f=(0,L.Z)(h,2),g=f[0],_=f[1],v=(0,o.useState)(""),P=(0,L.Z)(v,2),N=P[0],H=P[1],M=(0,o.useState)([]),$=(0,L.Z)(M,2),K=$[0],Q=$[1],q=(0,o.useState)(""),O=(0,L.Z)(q,2),V=O[0],Y=O[1],G=(0,o.useState)(""),J=(0,L.Z)(G,2),X=J[0],ee=J[1],te=m.Z.user,ne=te.getProjectById,re=te.saveProjectMetadata,se=te.ingestKnowledgeBase,ae=te._id,ce=m.Z.interface,oe=ce.pushNotification,ie=ce.isLoading,le=ce.setIsLoading,de=ce.setCurrentProjectId,je=ce.setModalType,ue=ne(e);(0,o.useEffect)((function(){ue&&(l(ue),p(ue.projectName),_(ue.projectURL),H(ue.widgetURL))}),[ue]);var pe=function(e){return function(t){switch(e){case"projectName":p(t.target.value);break;case"projectURL":_(t.target.value);break;case"widgetURL":H(t.target.value)}}},he=function(){var e=(0,k.Z)((0,b.Z)().mark((function e(){var t;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((0,F.f)(u)?(0,F.r)(g)?(0,F.r)(N)||(ee("widgetURLError"),0):(ee("projectURLError"),0):(ee("projectNameError"),0)){e.next=2;break}return e.abrupt("return");case 2:return ee(""),t=(0,a.Z)((0,a.Z)({},r),{},{projectName:u,projectURL:g,widgetURL:N}),le(!0),Y("Updating project metadata"),e.next=8,re(t);case 8:le(!1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),xe=function(e){console.log("handleFilesAdd"),e.preventDefault(),e.stopPropagation();try{for(var t="drop"===e.type?e.dataTransfer.files:e.target.files,n=(0,w.Z)(K),r=0;r<t.length;r+=1)"text/plain"===t[r].type&&n.push(t[r]);Q(n)}catch(X){oe({type:"error",message:"Error while loading files from local drive. \n"+X.message})}},fe=function(){var e=(0,k.Z)((0,b.Z)().mark((function e(){var t;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return le(!0),Y("Ingesting knowledge base"),t=new FormData,K.forEach((function(e){t.append("dataFiles",e)})),t.append("projectId",(null===r||void 0===r?void 0:r._id)||""),t.append("projectName",(null===r||void 0===r?void 0:r.projectName)||""),e.next=8,se(t);case 8:Q([]),le(!1);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ge=function(){return'   <script\n    id="content_insight_widget"\n    data-userId="'.concat(ae,'"\n    data-projectId="').concat(e,'"\n    src="').concat(N,'"\n    data-completionsURL="https://content-insight-backend-c244a3d2147a.herokuapp.com/api/v1/getCompletion"\n   ><\/script>')};return r?(0,x.jsxs)("div",{className:y,children:[(0,x.jsxs)("div",{className:U,children:[(0,x.jsxs)("h1",{children:["Project : ",r.projectName]})," ",(0,x.jsx)(i.rU,{to:"/cabinet/projects",style:{display:"block",width:"fit-content"},children:(0,x.jsx)(c.zx,{icon:"icon_arrow_left",text:"To projects list"})})]}),(0,x.jsxs)("div",{className:C,children:[(0,x.jsxs)("div",{className:Z,children:[(0,x.jsxs)("div",{className:S,children:[(0,x.jsxs)("div",{className:z,children:[(0,x.jsx)("h2",{children:"Client script"}),(0,x.jsx)(c.zx,{disabled:ie,text:"Copy",icon:"icon_copy",onClick:function(){window.navigator.clipboard.writeText(ge()).then((function(){return oe({type:"info",message:"Script copied to clipboard."})}))}})]}),(0,x.jsx)("div",{className:I,children:(0,x.jsx)("code",{className:T,children:ge()})})]}),(0,x.jsxs)("div",{className:S,children:[(0,x.jsxs)("div",{className:z,children:[(0,x.jsx)("h2",{children:"Metadata"}),(0,x.jsx)(c.zx,{disabled:ie,text:"Discard",icon:"icon_close",onClick:function(){p((null===r||void 0===r?void 0:r.projectName)||""),_((null===r||void 0===r?void 0:r.projectURL)||""),H((null===r||void 0===r?void 0:r.widgetURL)||"")}}),(0,x.jsx)(c.zx,{disabled:ie,text:"Save",icon:"icon_save",onClick:he})]}),(0,x.jsxs)("div",{className:I,children:[(0,x.jsxs)("label",{children:["Project name",(0,x.jsx)("span",{className:"hintText",children:"leters, numbers, dashes are allowed"}),(0,x.jsx)("input",{type:"text",className:"projectNameError"===X?"error":"",placeholder:"project-name",value:u,onChange:pe("projectName")})]}),(0,x.jsxs)("label",{children:["Project URL for the widget usage",(0,x.jsx)("input",{type:"url",className:"projectURLError"===X?"error":"",placeholder:"https://example.com",value:g,onChange:pe("projectURL")})]}),(0,x.jsxs)("label",{children:["Widget source URL",(0,x.jsx)("input",{type:"url",className:"widgetURLError"===X?"error":"",placeholder:"https://example.com",value:N,onChange:pe("widgetURL")})]})]})]})]}),(0,x.jsx)("div",{className:D,children:(0,x.jsxs)("div",{className:S,children:[(0,x.jsxs)("div",{className:z,children:[(0,x.jsx)("h2",{children:"Knowledge base"}),(0,x.jsxs)("div",{className:W,children:[(0,x.jsx)(c.zx,{disabled:ie||!K.length,text:"Ingest",icon:"icon_edit",onClick:fe}),(0,x.jsx)(c.zx,{disabled:ie||!r.projectIngestedData.length,text:"Delete",icon:"icon_delete",onClick:function(){de((null===r||void 0===r?void 0:r._id)||""),Y("Deleting knowledge base"),je("proejctKBDelete"),Q([])}})]})]}),(0,x.jsxs)("div",{className:I,children:[(0,x.jsxs)("details",{open:!!r.projectIngestedData.length,children:[(0,x.jsx)("summary",{children:"List of knowledgebase files"}),(0,x.jsx)("div",{className:R,children:(0,x.jsx)("ul",{className:E,children:r.projectIngestedData.map((function(e){var t=e.fileName,n=e.size;return(0,x.jsxs)("li",{children:[(0,x.jsx)("span",{children:t}),(0,x.jsxs)("span",{children:[Number.parseFloat(n).toFixed(2)," kb"]})]},t)}))})})]}),(0,x.jsxs)("details",{open:!r.projectIngestedData.length,children:[(0,x.jsx)("summary",{children:"Ingest files"}),(0,x.jsxs)("div",{className:B,onDragOver:function(e){e.preventDefault(),e.stopPropagation()},children:[null!==K&&void 0!==K&&K.length?(0,x.jsx)("ul",{className:E,children:Array.from(K).map((function(e){var t=e.name,n=e.size;return(0,x.jsxs)("li",{children:[(0,x.jsx)("span",{children:t}),(0,x.jsx)("span",{children:n})]},t+n)}))}):(0,x.jsx)("div",{className:A,children:"Drag'n'drop txt files or click the area for dialog window. Files are adding up to the ones that are already in knowledge base."}),(0,x.jsx)("input",{type:"file",accept:".txt",multiple:!0,onDragEnd:xe,onChange:xe})]})]})]})]})}),ie?(0,x.jsx)(c.$j,{text:V}):null]})]}):(0,x.jsx)("div",{children:"Project not found."})})),M={},$=(0,r.Pi)((function(){var e=(0,s.$B)().url;return(0,x.jsxs)("div",{className:M.projects,children:[" ",(0,x.jsxs)(s.rs,{children:[(0,x.jsx)(s.AW,{exact:!0,path:"".concat(e),component:N}),(0,x.jsx)(s.AW,{path:"".concat(e,"/:id"),component:H})]})]})}))},8796:function(e,t,n){n.r(t),n.d(t,{default:function(){return s}});var r=n(184),s=function(){return(0,r.jsx)("div",{children:"Settings."})}},346:function(e,t,n){n.r(t),n.d(t,{default:function(){return s}});var r=n(184),s=function(){return(0,r.jsx)("div",{children:"Stats."})}},6521:function(e,t,n){n.r(t),n.d(t,{Billing:function(){return p.default},Projects:function(){return u.default},Settings:function(){return h.default},Stats:function(){return x.default},default:function(){return j}});var r=n(2791),s=n(4880),a=n(7823),c=n(184),o=(0,r.lazy)((function(){return Promise.resolve().then(n.bind(n,4194))})),i=(0,r.lazy)((function(){return Promise.resolve().then(n.bind(n,2889))})),l=(0,r.lazy)((function(){return Promise.resolve().then(n.bind(n,8796))})),d=(0,r.lazy)((function(){return Promise.resolve().then(n.bind(n,346))})),j=function(){var e=(0,s.$B)().url,t=(0,s.TH)().pathname;return(0,c.jsx)("div",{className:"page",children:(0,c.jsx)("div",{className:"pageContent",children:(0,c.jsx)(r.Suspense,{fallback:(0,c.jsx)(a.$j,{}),children:(0,c.jsxs)(s.rs,{children:[(0,c.jsx)(s.l_,{from:"/:url*(/+)",to:t.slice(0,-1)}),(0,c.jsx)(s.AW,{path:"".concat(e,"/projects"),component:o}),(0,c.jsx)(s.AW,{path:"".concat(e,"/stats"),component:d}),(0,c.jsx)(s.AW,{path:"".concat(e,"/billing"),component:i}),(0,c.jsx)(s.AW,{path:"".concat(e,"/settings"),component:l}),(0,c.jsx)(s.AW,{exact:!0,path:"".concat(e,"/"),component:function(){return(0,c.jsx)(s.l_,{to:"".concat(e,"/projects")})}})]})})})})},u=n(4194),p=n(2889),h=n(8796),x=n(346)}}]);
//# sourceMappingURL=Cabinet.0af76b21.chunk.js.map