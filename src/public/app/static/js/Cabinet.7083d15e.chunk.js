"use strict";(self.webpackChunkcontent_insight_frontend=self.webpackChunkcontent_insight_frontend||[]).push([[595],{889:function(e,t,n){n.r(t),n.d(t,{default:function(){return c}});var r=n(184),c=function(){return(0,r.jsx)("div",{children:"Billing."})}},444:function(e,t,n){n.r(t),n.d(t,{default:function(){return A}});var r=n(257),c=n(880),s=n(683),a=n(165);function o(e,t,n,r,c,s,a){try{var o=e[s](a),i=o.value}catch(l){return void n(l)}o.done?t(i):Promise.resolve(i).then(r,c)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(r,c){var s=e.apply(t,n);function a(e){o(s,r,c,a,i,"next",e)}function i(e){o(s,r,c,a,i,"throw",e)}a(void 0)}))}}var l=n(791),d=n(175),u=n(523),p=n(253),j="ProjectTile_projectTile__quj6f",f="ProjectTile_projectDetails__grJt9",h="ProjectTile_projectName__zn2aT",x="ProjectTile_projectURL__QeNpF",v="ProjectTile_projectControls__P+4YV",g=n(184),_=function(e){var t=e._id,n=e.projectName,r=e.projectCreationDate,s=e.projectURL,a=e.onDelete,o=(0,c.$B)().url;return(0,g.jsxs)("div",{className:j,children:[(0,g.jsxs)("div",{className:f,children:[" ",(0,g.jsxs)(u.rU,{to:"".concat(o,"/").concat(t),children:[(0,g.jsx)("div",{className:h,children:n}),(0,g.jsxs)("div",{className:x,children:["URL: ",s]}),(0,g.jsxs)("div",{className:x,children:["Created: ",r]})]})]}),(0,g.jsx)("div",{className:v,children:(0,g.jsx)(p.Z,{icon:"icon_delete",text:"Delete project",onClick:function(){a(t)}})})]})},m=(0,l.memo)(_),P=n(863),w={projectTilesWrapper:"ProjectsList_projectTilesWrapper__BioBg"},N=(0,r.Pi)((function(){var e=(0,l.useRef)(null),t=P.Z.user,n=t.userProjects,r=t.createProject,c=t.deleteProject,o=function(){var e=i((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=i((0,a.Z)().mark((function e(t){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,g.jsxs)("div",{className:w.projectsContainer,children:[(0,g.jsx)(d.zx,{icon:"icon_plus",text:"Add project",onClick:function(){e.current.showModal()}}),(0,g.jsx)("div",{className:w.projectTilesWrapper,children:n.length?n.map((function(e){return(0,g.jsx)(m,(0,s.Z)((0,s.Z)({},e),{},{onDelete:u}),e._id)})):"You dont have any projects yet."}),(0,g.jsx)("dialog",{ref:e,children:(0,g.jsx)(d.hK,{onCreateClick:o,onCloseClick:function(){e.current.close()}})})]})})),k=n(982),b=n(885),y="ProjectPage_projectPage__gPfMH",C="ProjectPage_settings__O-GlV",Z="ProjectPage_knowledgeBase__pVuHl",D="ProjectPage_scriptCode__YCQon",U="ProjectPage_knowledgeBaseList__HxEv1",B="ProjectPage_knowledgeBaseUploadForm__k82B2",L="ProjectPage_headerWrapper__qmX26",z="ProjectPage_buttonsWrapper__uchQ+",S="ProjectPage_dragndropMessage__cuePI",R="ProjectPage_filesList__qlSQN",T=n(961),I=(0,r.Pi)((function(){var e=(0,c.UO)().id,t=(0,l.useState)(),n=(0,b.Z)(t,2),r=n[0],o=n[1],p=(0,l.useState)(""),j=(0,b.Z)(p,2),f=j[0],h=j[1],x=(0,l.useState)(!1),v=(0,b.Z)(x,2),_=v[0],m=v[1],w=(0,l.useState)([]),N=(0,b.Z)(w,2),I=N[0],W=N[1],A=(0,l.useState)(""),E=(0,b.Z)(A,2),F=E[0],$=E[1],M=(0,l.useState)(""),Q=(0,b.Z)(M,2),q=Q[0],H=Q[1],K=P.Z.user,O=K.getProjectById,V=K.saveProjectMetadata,Y=K.ingestKnowledgeBase,G=K.deleteKnowledgeBase,J=K._id,X=P.Z.interface.pushNotification,ee=O(e);(0,l.useEffect)((function(){ee&&(o(ee),h(ee.projectURL))}),[ee]);var te,ne=function(){var e=i((0,a.Z)().mark((function e(){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((0,T.Z)(f)||(H("projectURLError"),0)){e.next=2;break}return e.abrupt("return");case 2:return H(""),t=(0,s.Z)((0,s.Z)({},r),{},{projectURL:f}),m(!0),$("Updating project metadata"),e.next=8,V(t);case 8:m(!1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),re=function(e){console.log("handleFilesAdd"),e.preventDefault(),e.stopPropagation();try{for(var t="drop"===e.type?e.dataTransfer.files:e.target.files,n=(0,k.Z)(I),r=0;r<t.length;r+=1)"text/plain"===t[r].type&&n.push(t[r]);W(n)}catch(q){X({type:"error",message:"Error while loading files from local drive. \n"+q.message})}},ce=function(){var e=i((0,a.Z)().mark((function e(){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m(!0),$("Ingesting knowledge base"),t=new FormData,I.forEach((function(e){t.append("dataFiles",e)})),t.append("projectId",(null===r||void 0===r?void 0:r._id)||""),t.append("projectName",(null===r||void 0===r?void 0:r.projectName)||""),e.next=8,Y(t);case 8:W([]),m(!1);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),se=function(){var e=i((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m(!0),$("Deleting knowledge base"),e.next=4,G((null===r||void 0===r?void 0:r._id)||"",(null===r||void 0===r?void 0:r.projectName)||"");case 4:W([]),m(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ae=function(){return'   <script\n       id="content_insight_widget"\n       data-userId="'.concat(J,'"\n       data-projectId="').concat(e,'"\n       src="http://localhost:3300/widget"\n       data-completionsURL="http://localhost:3300/api/v1/getCompletion"\n   ><\/script>')};return r?(0,g.jsxs)("div",{children:[(0,g.jsx)(u.rU,{to:"/cabinet/projects",style:{display:"block",width:"fit-content"},children:(0,g.jsx)(d.zx,{icon:"icon_arrow_left",text:"To projects list"})}),(0,g.jsx)("h1",{children:r.projectName}),(0,g.jsxs)("div",{className:y,children:[(0,g.jsxs)("div",{className:C,children:[(0,g.jsxs)("div",{children:[(0,g.jsxs)("div",{className:L,children:[(0,g.jsx)("h2",{children:"Client side script "}),(0,g.jsx)(d.zx,{disabled:_,text:"Copy script",icon:"icon_copy",onClick:function(){window.navigator.clipboard.writeText(ae()).then((function(){return X({type:"info",message:"Script copied to clipboard."})}))}})]}),(0,g.jsx)("code",{className:D,children:ae()})]}),(0,g.jsxs)("div",{children:[(0,g.jsxs)("div",{className:L,children:[(0,g.jsx)("h2",{children:"Project metadata "}),(0,g.jsx)(d.zx,{disabled:_,text:"Save metadata",icon:"icon_save",onClick:ne})]}),(0,g.jsxs)("label",{children:["Project URL for the widget usage",(0,g.jsx)("input",{type:"url",className:"projectURLError"===q?"error":"",placeholder:"https://example.com",value:f,onChange:(te="projectURL",function(e){"projectURL"===te&&h(e.target.value)})})]})]})]}),(0,g.jsxs)("div",{className:Z,children:[(0,g.jsxs)("div",{className:L,children:[(0,g.jsx)("h2",{children:"Project knowledge base"}),(0,g.jsxs)("div",{className:z,children:[(0,g.jsx)(d.zx,{disabled:_||!I.length,text:"Ingest knowledge base",icon:"icon_edit",onClick:ce}),(0,g.jsx)(d.zx,{disabled:_||!r.projectIngestedData.length,text:"Delete knowledge base",icon:"icon_delete",onClick:se})]})]}),(0,g.jsxs)("details",{open:!!r.projectIngestedData.length,children:[(0,g.jsx)("summary",{children:"List of knowledgebase files"}),(0,g.jsx)("div",{className:U,children:(0,g.jsx)("ul",{className:R,children:r.projectIngestedData.map((function(e){var t=e.fileName,n=e.size;return(0,g.jsxs)("li",{children:[t,", ",n]},t)}))})})]}),(0,g.jsxs)("details",{open:!r.projectIngestedData.length,children:[(0,g.jsx)("summary",{children:"Ingest files"}),(0,g.jsxs)("div",{className:B,onDragOver:function(e){e.preventDefault(),e.stopPropagation()},children:[null!==I&&void 0!==I&&I.length?(0,g.jsx)("ul",{className:R,children:Array.from(I).map((function(e){var t=e.name,n=e.size;return(0,g.jsxs)("li",{children:[(0,g.jsx)("span",{children:t}),(0,g.jsx)("span",{children:n})]},t+n)}))}):(0,g.jsx)("div",{className:S,children:"Drag'n'drop txt files or click the area for dialog window. Files are adding up to the ones that are already in knowledge base."}),(0,g.jsx)("input",{type:"file",accept:".txt",multiple:!0,onDragEnd:re,onChange:re})]})]})]}),_?(0,g.jsx)(d.$j,{text:F}):null]})]}):(0,g.jsx)("div",{children:"Project not found."})})),W="Projects_projects__BGRec",A=(0,r.Pi)((function(){var e=(0,c.$B)().url;return(0,g.jsxs)("div",{className:W,children:[" ",(0,g.jsxs)(c.rs,{children:[(0,g.jsx)(c.AW,{exact:!0,path:"".concat(e),component:N}),(0,g.jsx)(c.AW,{path:"".concat(e,"/:id"),component:I})]})]})}))},796:function(e,t,n){n.r(t),n.d(t,{default:function(){return c}});var r=n(184),c=function(){return(0,r.jsx)("div",{children:"Settings."})}},346:function(e,t,n){n.r(t),n.d(t,{default:function(){return c}});var r=n(184),c=function(){return(0,r.jsx)("div",{children:"Stats."})}},266:function(e,t,n){n.r(t),n.d(t,{Billing:function(){return h.default},Projects:function(){return f.default},Settings:function(){return x.default},Stats:function(){return v.default},default:function(){return j}});var r=n(791),c=n(880),s=n(175),a="Cabinet_cabinet__ohff-",o="Cabinet_cabinetPageContent__xyzny",i=n(184),l=(0,r.lazy)((function(){return Promise.resolve().then(n.bind(n,444))})),d=(0,r.lazy)((function(){return Promise.resolve().then(n.bind(n,889))})),u=(0,r.lazy)((function(){return Promise.resolve().then(n.bind(n,796))})),p=(0,r.lazy)((function(){return Promise.resolve().then(n.bind(n,346))})),j=function(){var e=(0,c.$B)().url;return(0,i.jsxs)("div",{className:a,children:[(0,i.jsx)(s.fv,{}),(0,i.jsx)("div",{className:o,children:(0,i.jsx)(r.Suspense,{fallback:(0,i.jsx)(s.$j,{}),children:(0,i.jsxs)(c.rs,{children:[(0,i.jsx)(c.AW,{path:"".concat(e,"/projects"),component:l}),(0,i.jsx)(c.AW,{path:"".concat(e,"/stats"),component:p}),(0,i.jsx)(c.AW,{path:"".concat(e,"/billing"),component:d}),(0,i.jsx)(c.AW,{path:"".concat(e,"/settings"),component:u}),(0,i.jsx)(c.AW,{exact:!0,path:"".concat(e,"/"),component:function(){return(0,i.jsx)(c.l_,{to:"".concat(e,"/projects")})}})]})})})]})},f=n(444),h=n(889),x=n(796),v=n(346)}}]);
//# sourceMappingURL=Cabinet.7083d15e.chunk.js.map