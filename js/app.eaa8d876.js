(function(){"use strict";var t={9170:function(t,e,n){var a=n(9242),r=n(3396);const i={class:"container"};function s(t,e,n,a,s,o){const g=(0,r.up)("GanttComponent");return(0,r.wg)(),(0,r.iD)("div",i,[(0,r.Wm)(g,{class:"left-container",tasks:s.tasks,onTaskUpdated:o.logTaskUpdate,onLinkUpdated:o.logLinkUpdate,onTaskSelected:o.selectTask},null,8,["tasks","onTaskUpdated","onLinkUpdated","onTaskSelected"])])}const o={style:{"text-align":"center"},id:"gantt-container"},g={id:"gannt-tool"},c={ref:"ganttContainer",style:{height:"calc(100vh - 33px)"}};function l(t,e,n,a,i,s){return(0,r.wg)(),(0,r.iD)("div",o,[(0,r._)("div",g,[(0,r._)("button",{style:{margin:"5px"},onClick:e[0]||(e[0]=t=>s.changeView("day"))},"日视图"),(0,r._)("button",{style:{margin:"5px"},onClick:e[1]||(e[1]=t=>s.changeView("week"))},"周视图"),(0,r._)("button",{style:{margin:"5px"},onClick:e[2]||(e[2]=t=>s.changeView("year"))},"年视图"),(0,r._)("button",{style:{margin:"5px"},onClick:e[3]||(e[3]=(...t)=>s.toggleFullScreen&&s.toggleFullScreen(...t))},"切换全屏"),(0,r._)("button",{style:{margin:"5px"},onClick:e[4]||(e[4]=(...t)=>s.toggleGanttGrid&&s.toggleGanttGrid(...t))},"切换表格显示")]),(0,r._)("div",c,null,512)])}var d=n(5151);d.gantt.plugins({fullscreen:!0,tooltip:!0}),d.gantt.ext.fullscreen.getFullscreenElement=function(){return document.getElementById("gantt-container")},d.gantt.config.show_links=!0,d.gantt.config.drag_links=!1,d.gantt.config.drag_progress=!1,d.gantt.config.drag_move=!1,d.gantt.config.drag_resize=!1,d.gantt.config.details_on_dblclick=!1,d.gantt.config.resize_rows=!0,d.gantt.config.fit_tasks=!0,d.gantt.config.open_split_tasks=!0,d.gantt.config.grid_elastic_columns=!0,d.gantt.config.keep_grid_width=!1,d.gantt.config.grid_width=540,d.gantt.config.show_grid=!0,d.gantt.config.scale_height=60;const u=function(t){return`第${d.gantt.date.date_to_str("%W")(t)}周`},p=function(t){return`${d.gantt.date.date_to_str("%n")(t)}月${d.gantt.date.date_to_str("%d")(t)}日`},f=function(t){if(0==t.getDay()||6==t.getDay())return"weekend"};d.gantt.config.scales=[{unit:"year",step:1,format:"%Y年"},{unit:"week",step:1,format:"第%W周"},{unit:"day",step:1,format:p,css:f}],d.gantt.templates.timeline_cell_class=function(t,e){if(0==e.getDay()||6==e.getDay())return"weekend"},d.gantt.config.columns=[{name:"wbs",label:"WBS",tree:!0,resize:!0,min_width:80,template:function(t){return t.WBSName}},{name:"text",label:"任务名称",width:160,resize:!0,align:"center",template:function(t){return t.text}},{name:"start_date",label:"开始时间",width:80,align:"center",template:function(t){return t.start_date}},{name:"end_date",label:"结束时间",width:80,align:"center",template:function(t){return t.end_date}},{name:"progress",label:"进度",width:65,align:"center",template:function(t){return`${(100*t.progress).toFixed(2)}%`}}],d.gantt.attachEvent("onLinkDblClick",(function(){return!1})),d.gantt.templates.task_text=function(t,e,n){return n.WBSName+" "+n.text},d.gantt.templates.tooltip_text=function(t,e,n){return n.type==d.gantt.config.types.milestone?n.text+"<br/><b>完成时间:</b> "+d.gantt.templates.tooltip_date_format(e):"<b>任务名:</b> "+n.text+"<br/><b>完成进度: </b>"+(100*n.progress).toFixed(2)+"%<br/><b>计划用时: </b> "+n.duration+" 天 ("+d.gantt.templates.tooltip_date_format(t)+" 至 "+d.gantt.templates.tooltip_date_format(e)+")"},d.gantt.templates.rightside_text=function(t,e,n){return n.type==d.gantt.config.types.milestone?n.text:n.duration+" 天"};var _={props:{tasks:{type:Object,default(){return{data:[],links:[]}}}},methods:{$_initGanttEvents:function(){d.gantt.$_eventsInitialized||(d.gantt.attachEvent("onTaskSelected",(t=>{let e=d.gantt.getTask(t);this.$emit("task-selected",e)})),d.gantt.attachEvent("onTaskIdChange",((t,e)=>{if(d.gantt.getSelectedId()==e){let t=d.gantt.getTask(e);this.$emit("task-selected",t)}})),d.gantt.$_eventsInitialized=!0)},$_initDataProcessor:function(){d.gantt.$_dataProcessorInitialized||(d.gantt.createDataProcessor(((t,e,n,a)=>{this.$emit(`${t}-updated`,a,e,n)})),d.gantt.$_dataProcessorInitialized=!0)},changeView(t){"week"===t?(d.gantt.config.scale_height=50,d.gantt.config.scales=[{unit:"year",step:1,format:"%Y年"},{unit:"week",step:1,format:u,css:()=>"week-cell"}]):"day"===t?(d.gantt.config.scale_height=60,d.gantt.config.scales=[{unit:"year",step:1,format:"%Y年"},{unit:"week",step:1,format:"第%W周"},{unit:"day",step:1,format:p,css:f}]):"year"===t&&(d.gantt.config.scale_height=30,d.gantt.config.scales=[{unit:"year",step:1,format:"%Y年"}]),d.gantt.render()},toggleFullScreen(){d.gantt.getState().fullscreen?d.gantt.collapse():d.gantt.expand()},toggleGanttGrid(){d.gantt.config.show_grid=!d.gantt.config.show_grid,d.gantt.render()}},mounted:function(){this.$_initGanttEvents(),d.gantt.config.date_format="%Y-%m-%d",d.gantt.init(this.$refs.ganttContainer),d.gantt.parse(this.$props.tasks),this.$_initDataProcessor()}},m=n(89);const h=(0,m.Z)(_,[["render",l]]);var k=h,y={name:"app",components:{GanttComponent:k},data(){return{tasks:{data:[{id:1e4,text:"我是项目名",start_date:"2022-12-01",end_date:"2022-12-12",type:"project",WBSName:"0",progress:.12,open:!0},{id:10001,text:"任务 1",start_date:"2022-12-01",end_date:"2022-12-18",WBSName:"1",progress:.4,parent:"10000",type:"project",open:!0},{id:10001001,text:"任务 1.1",start_date:"2022-12-01",end_date:"2022-12-18",duration:"18",WBSName:"1.1",progress:.4,parent:"10001"},{id:10001002,text:"任务 1 的里程碑",start_date:"2022-12-23",end_date:"2022-12-28",WBSName:"1.2",type:"milestone",rollup:!0,parent:"10001"},{id:10002,text:"任务 2",start_date:"2022-12-10",end_date:"2022-12-30",type:"project",progress:.32,WBSName:"2",parent:"10000",open:!0,render:"split"},{id:10002001,text:"任务 2 的阶段1",start_date:"2022-12-10",end_date:"2022-12-18",WBSName:"2.1",parent:"10002"},{id:10002002,text:"任务 2 的阶段2",start_date:"2022-12-19",end_date:"2022-12-29",WBSName:"2.2",parent:"10002"},{id:10003,text:"任务 3",start_date:"2023-01-18",end_date:"2023-02-18",WBSName:"3",parent:"10000"}],links:[{id:1,source:10002001,target:10002002,type:"0"},{id:2,source:10002002,target:10003,type:"0"}]},selectedTask:null,messages:[]}},computed:{progressPercentage(){let t=this.selectedTask.progress;return t?`${Math.round(100*+t)} %`:"0"},formattedStartDate(){let t=this.selectedTask.start_date;return`${t.getFullYear()} / ${t.getMonth()+1} / ${t.getDate()}`},formattedEndDate(){let t=this.selectedTask.end_date;return`${t.getFullYear()} / ${t.getMonth()+1} / ${t.getDate()}`}},methods:{selectTask(t){this.selectedTask=t},addMessage(t){this.messages.unshift(t),this.messages.length>40&&this.messages.pop()},logTaskUpdate(t,e,n){let a=n&&n.text?` (${n.text})`:"",r=`Task ${e}: ${t} ${a}`;this.addMessage(r)},logLinkUpdate(t,e,n){let a=`Link ${e}: ${t}`;n&&(a+=` ( source: ${n.source}, target: ${n.target} )`),this.addMessage(a)}}};const v=(0,m.Z)(y,[["render",s]]);var b=v;(0,a.ri)(b).mount("#app")}},e={};function n(a){var r=e[a];if(void 0!==r)return r.exports;var i=e[a]={exports:{}};return t[a](i,i.exports,n),i.exports}n.m=t,function(){var t=[];n.O=function(e,a,r,i){if(!a){var s=1/0;for(l=0;l<t.length;l++){a=t[l][0],r=t[l][1],i=t[l][2];for(var o=!0,g=0;g<a.length;g++)(!1&i||s>=i)&&Object.keys(n.O).every((function(t){return n.O[t](a[g])}))?a.splice(g--,1):(o=!1,i<s&&(s=i));if(o){t.splice(l--,1);var c=r();void 0!==c&&(e=c)}}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[a,r,i]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,a){var r,i,s=a[0],o=a[1],g=a[2],c=0;if(s.some((function(e){return 0!==t[e]}))){for(r in o)n.o(o,r)&&(n.m[r]=o[r]);if(g)var l=g(n)}for(e&&e(a);c<s.length;c++)i=s[c],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(l)},a=self["webpackChunkgantt_vue"]=self["webpackChunkgantt_vue"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(9170)}));a=n.O(a)})();
//# sourceMappingURL=app.eaa8d876.js.map