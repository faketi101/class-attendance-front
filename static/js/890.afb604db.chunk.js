(self.webpackChunkclient=self.webpackChunkclient||[]).push([[890],{6383:function(e,t){var n=this;t.status=function(e){var t=[],n=[],a=[],s=[];if(e.classes.map((function(e){return"present"!==e.attend&&"late"!==e.attend||t.push(e),"absent"!==e.attend&&"camera_off"!==e.attend||n.push(e),"sick"===e.attend&&a.push(e),"leave"===e.attend&&s.push(e),null})),t.length+n.length+a.length+s.length===e.classes.length){var l=t.length+n.length+a.length+s.length,c="present";return t.length===l&&(c="present"),a.length>1&&(c="sick"),s.length>1&&(c="leave"),n.length>0&&(c="absent"),{f_status:c,total_class:l,presents:t,absents:n,sicks:a,leaves:s}}},t.counter=function(e){var t,a=(t=Array.isArray(e.online_attendance)?e.online_attendance.map(n.status):n.status(e.online_attendance)).length||1,s=[],l=[],c=[],r=[];if(Array.isArray(t))t.map((function(t){return t?(t.f_status&&"present"===t.f_status&&s.push(t),!t.f_status||"absent"!==t.f_status&&"camera_off"!==t.attend||l.push(t),t.f_status&&"sick"===t.f_status&&c.push(t),t.f_status&&"leave"===t.f_status&&r.push(t),null):console.log(e)}));else{var d=t;"present"===d.f_status&&s.push(d),"absent"!==d.f_status&&"camera_off"!==d.attend||l.push(d),"sick"===d.f_status&&c.push(d),"leave"===d.f_status&&r.push(d)}if(s.length+l.length+c.length+r.length===a)return{present_percent:100*s.length/a,class_count:a,presents:s,absents:l,sicks:c,leaves:r}},t.filter=function(e){var t,n=e.data,a=null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.update_date,s=[],l=n.data;if(l.map((function(e){return e.online_attendance.map((function(t){if(t.date===a){var n={student:e,attendance:t};s.push(n)}return null})),null})),s.length===l.length)return s},t.bdDate=function(){var e=new Date,t=e.getTime()+6e4*e.getTimezoneOffset(),n=new Date(t+216e5),a="",s="";return a=n.getMonth()<10?"0".concat(n.getMonth()+1):n.getMonth()+1,s=n.getDate()<10?"0".concat(n.getDate()):n.getDate(),{date:"".concat(n.getFullYear(),"-").concat(a,"-").concat(s),all:n}}},8836:function(e){e.exports=function(e){}},5890:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var a=n(5861),s=n(8152),l=n(7757),c=n.n(l),r=n(4569),d=n.n(r),i=n(2791),u=n(577),o=n(8836),p=n.n(o),h=n(7594),v=n(184),_=function(e,t){return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("th",{scope:"col",children:"Class_".concat(t+1)},"__".concat(t))})},f=function(e){var t,n=(0,i.useState)(!1),l=(0,s.Z)(n,2),r=l[0],o=l[1],f=null===e||void 0===e?void 0:e.props;return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(u.Ix,{position:"top-center",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0}),(0,v.jsxs)("table",{className:"table table-striped text-center",children:[(0,v.jsx)("thead",{className:"bg-dark text-white",children:(0,v.jsxs)("tr",{children:[(0,v.jsx)("th",{scope:"col",children:"#"}),(0,v.jsx)("th",{scope:"col",children:"Name"}),(0,v.jsx)("th",{scope:"col",children:"ID"}),null===(t=f[0])||void 0===t?void 0:t.attendance.classes.map(_),(0,v.jsx)("th",{scope:"col",children:"Total Attend"}),(0,v.jsx)("th",{scope:"col",children:"Edit"})]})}),(0,v.jsx)("tbody",{children:f.map((function(e,t){var n=function(){var t=(0,a.Z)(c().mark((function t(n){var a,s,l,r,i,o,v,_,f,m;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,s=e,l=n.target.id,r="",(i=n.target)&&(i.className="","present"===i.value?i.className="text-success":"absent"===i.value||"camera_off"===i.value?i.className="text-danger":i.className="text-info"),o=n.target.value,v=localStorage.getItem("token"),e.attendance.classes.map((function(e){return e.name===l&&(r=e),null})),_={student:s,st_d_class:r,updated_attend:o,update_date:s.attendance.date,_token:v},console.log(_),t.next=13,d().post("".concat(h.Sv,"/api/update_attendance"),_);case 13:null!==(f=t.sent)&&void 0!==f&&null!==(a=f.data)&&void 0!==a&&a.success&&u.Am.success((null===f||void 0===f||null===(m=f.data)||void 0===m?void 0:m.message)||"Attendance Updated"),t.next=21;break;case 17:t.prev=17,t.t0=t.catch(0),u.Am.error("Something went wrong. Please try again later"),p()(t.t0);case 21:case"end":return t.stop()}}),t,null,[[0,17]])})));return function(e){return t.apply(this,arguments)}}(),s=[];return e.attendance.classes.map((function(e){return"present"===e.attend&&s.push(e),null})),(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)("tr",{children:[(0,v.jsxs)("th",{scope:"row",children:[t+1,"."]}),(0,v.jsx)("td",{children:e.student.name}),(0,v.jsx)("td",{children:e.student.school_id}),e.attendance.classes.map((function(t,a){var s=function(){return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)("select",{id:"".concat(t.name),name:"attend",onChange:n,className:"",children:[(0,v.jsx)("option",{value:t.attend,selected:!0,disabled:!0,hidden:!0,children:t.attend.toUpperCase()}),(0,v.jsx)("option",{className:"text-success",value:"present",children:"PRESENT"}),(0,v.jsx)("option",{className:"text-danger",value:"absent",children:"ABSENT"}),(0,v.jsx)("option",{className:"text-danger",value:"camera_off",children:"CAMERA_OFF"}),(0,v.jsx)("option",{className:"text-warning",value:"late",children:"LATE"}),(0,v.jsx)("option",{className:"text-info",value:"sick",children:"SICK"}),(0,v.jsx)("option",{className:"text-info",value:"leave",children:"LEAVE"})]})})};return(0,v.jsx)(v.Fragment,{children:(0,v.jsx)("td",{className:"fs-6",id:"".concat(e.name),children:(0,v.jsx)("p",{className:"badge text-wrap ".concat("present"===t.attend?"bg-success":"absent"===t.attend||"camera_off"===t.attend?"bg-danger":"sick"===t.attend||"leave"===t.attend?"bg-primary":"bg-warning"),children:r?(0,v.jsx)(s,{}):t.attend.toUpperCase()})},"_".concat(a))})})),(0,v.jsx)("td",{className:"fs-6",children:(0,v.jsx)("p",{className:"badge bg-primary",children:s.length})}),(0,v.jsx)("td",{children:(0,v.jsx)("button",{className:"badge bg-info text-white fw-bold",onClick:function(e){var t;r?(o(!1),(null===(t=document)||void 0===t?void 0:t.getElementById("update_submit_btn")).click()):o(!0)},children:r?"Update":"Edit"})})]},"___".concat(t))})}))})]})]})},m=n(6383),g=n(6281),x=n(6871),j=n(6241),b=function(){document.title="NCPSC || Update Attendance";var e=(0,i.useState)(""),t=(0,s.Z)(e,2),n=t[0],l=t[1],r=(0,i.useState)(!1),o=(0,s.Z)(r,2),_=o[0],b=o[1],N=(0,i.useState)(""),k=(0,s.Z)(N,2),w=k[0],y=k[1],A=(0,x.s0)(),C=function(){var e=(0,a.Z)(c().mark((function e(){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,h.PR)();case 2:t=e.sent,y(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();w&&"admin"!==w.role&&A("/"),(0,i.useEffect)((function(){C()}),[]);var Z=function(){var e=(0,a.Z)(c().mark((function e(t){var n,a,s,r,i,o,v,_,f,g,x,j,N,k,w,y,A;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,null===t||void 0===t||t.preventDefault(),b(!0),g=(null===t||void 0===t||null===(n=t.target)||void 0===n||null===(a=n.update_date)||void 0===a?void 0:a.value)||(null===t||void 0===t||null===(s=t.update_date)||void 0===s?void 0:s.value),x=(null===t||void 0===t||null===(r=t.target)||void 0===r||null===(i=r.update_class)||void 0===i?void 0:i.value)||(null===t||void 0===t||null===(o=t.update_class)||void 0===o?void 0:o.value),j=(null===t||void 0===t||null===(v=t.target)||void 0===v||null===(_=v.update_section)||void 0===_?void 0:_.value)||(null===t||void 0===t||null===(f=t.update_section)||void 0===f?void 0:f.value),N=localStorage.getItem("token"),k={update_date:g,update_class:x,update_section:j,_token:N},e.next=10,d().post("".concat(h.Sv,"/api/get_attendance"),k);case 10:(w=e.sent).data.success&&(l((0,m.filter)(w)),b(!1)),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(0),b(!1),u.Am.error(null===e.t0||void 0===e.t0||null===(y=e.t0.response)||void 0===y||null===(A=y.data)||void 0===A?void 0:A.message),p()(e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(t){return e.apply(this,arguments)}}();return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(u.Ix,{position:"top-center",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0}),_?(0,v.jsx)(j.Z,{}):null,(0,v.jsx)("h3",{children:"Update Attendance"}),(0,v.jsxs)("form",{id:"update_form",onSubmit:Z,className:"".concat(g.Z.form_2),children:[(0,v.jsxs)("div",{className:g.Z.cls_div,children:[(0,v.jsx)("p",{children:"Update attendance date"}),(0,v.jsx)("input",{type:"date",name:"update_date",defaultValue:(0,m.bdDate)().date})]}),(0,v.jsxs)("div",{className:g.Z.cls_div,children:[(0,v.jsx)("p",{children:"Update Class"}),(0,v.jsx)("select",{className:g.Z.input_1,name:"update_class",id:"update_class",children:(0,v.jsx)("option",{value:"ten",children:"TEN"})})]}),(0,v.jsxs)("div",{className:g.Z.cls_div,children:[(0,v.jsx)("p",{children:"Update Section"}),(0,v.jsx)("select",{className:g.Z.input_1,name:"update_section",id:"update_section",children:(0,v.jsx)("option",{value:"kadam",children:"KADAM"})})]}),(0,v.jsx)("div",{className:g.Z.cls_div,children:(0,v.jsx)("button",{className:"btn btn-success shadow-none",id:"update_submit_btn",type:"submit",children:"View Attendance"})})]}),n?(0,v.jsx)(f,{props:n,re:Z}):null]})}},6281:function(e,t){"use strict";t.Z={form:"style_uti_form__3KRm5",form_2:"style_uti_form_2__gvoqw",date_div:"style_uti_date_div__EOiel",cls_div:"style_uti_cls_div__F7lfj",st_id_div:"style_uti_st_id_div__Xh+33",input_1:"style_uti_input_1__n-x9i",button:"style_uti_button__h6xHr"}}}]);
//# sourceMappingURL=890.afb604db.chunk.js.map