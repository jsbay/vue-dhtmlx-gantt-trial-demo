<template>
  <div style="text-align: center;" id="gantt-container">
    <div id="gannt-tool">
      <button style="margin: 5px;" @click="changeView('day')">日视图</button>
      <button style="margin: 5px;" @click="changeView('week')">周视图</button>
      <button style="margin: 5px;" @click="changeView('year')">年视图</button>
      <button style="margin: 5px;" @click="toggleFullScreen">切换全屏</button>
      <button style="margin: 5px;" @click="toggleGanttGrid">切换表格显示</button>
    </div>
    
    <div ref="ganttContainer" style="height: calc(100vh - 33px)"></div>
  </div>
</template>

<script>
// DHTMLX-GANTT 配置项 中文文档 https://blog.csdn.net/qq_24472595/article/details/81630117
import { gantt } from 'dhtmlx-gantt';
import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_terrace.css";
// import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_skyblue.css";
// import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_meadow.css";
// import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_broadway.css";
// import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_contrast_white.css";
// import "dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css"; 

// import Dayjs from "dayjs";

// 声明需要加载的插件
gantt.plugins({
  fullscreen: true,
  tooltip: true,
  // auto_scheduling: true
});

/**
 * 设置全屏时的根元素, 设置以后 该元素下的内容将 一块全屏
 */
 gantt.ext.fullscreen.getFullscreenElement = function() {
  return document.getElementById("gantt-container");
}

/**
 * https://docs.dhtmlx.com/gantt/api__gantt_show_links_config.html
 * 显示或禁止 显示 甘特图中的 连线(任务之间的关系)
 * 默认值 true
 */
gantt.config.show_links = true; // 显示连线

/**
 * https://docs.dhtmlx.com/gantt/api__gantt_drag_links_config.html
 * 允许通过拖拽 添加 依赖 连线
 * 默认值 true
 */
gantt.config.drag_links = false; // 禁止拖拽连线
/**
 * https://docs.dhtmlx.com/gantt/api__gantt_drag_progress_config.html
 * 允许通过 拖拽方式 调整 任务的进度
 * 默认值 true
 */
gantt.config.drag_progress = false; // 禁用工作进度拖拽
/**
 * https://docs.dhtmlx.com/gantt/api__gantt_drag_move_config.html
 * 允许通过 拖拽方式 移动 task
 * 默认值 true
 */
gantt.config.drag_move = false;
/**
 * https://docs.dhtmlx.com/gantt/api__gantt_drag_resize_config.html
 * 允许通过 拖拽方式 调整 task bar 的 两端来改变工期
 * 默认值 true
 */
gantt.config.drag_resize = false; // 禁止用户通过拖拽任务的条形图的两端来改变工期
/**
 * https://docs.dhtmlx.com/gantt/api__gantt_details_on_dblclick_config.html
 * 允许 双击 task 时，弹出lightbox弹出框
 * 默认值 true
 */
gantt.config.details_on_dblclick = false; // 禁止 双击task时，弹出lightbox弹出框
/**
 * https://docs.dhtmlx.com/gantt/api__gantt_resize_rows_config.html
 * 启用 通过拖拽调整行高
 * 默认值 false
 */
gantt.config.resize_rows = true;
/**
 * https://docs.dhtmlx.com/gantt/api__gantt_fit_tasks_config.html
 * 甘特图自动调整时间范围为了更好的显示所有的 task
 * 默认值 false
 */
gantt.config.fit_tasks = true; 

// gantt.config.start_on_monday = true;

// gantt.config.auto_types = true;
// gantt.config.auto_scheduling = true;
// gantt.config.auto_scheduling_compatibility = true;
// gantt.locale.labels.section_split = "Display";

/**
 * https://docs.dhtmlx.com/gantt/api__gantt_open_split_tasks_config.html
 * 允许 render === "split" 的任务 展开
 * 示例地址: https://docs.dhtmlx.com/gantt/samples/04_customization/21_open_split_task.html
 * 默认值 false
 */
gantt.config.open_split_tasks = true; 

/**
 * https://docs.dhtmlx.com/gantt/api__gantt_grid_elastic_columns_config.html
 * 默认情况下，dhtmlxGantt 在调整整个网格大小时不调整列的大小。因此, 当网格的宽度增加时，列的宽度将保持不变，会导致网格右侧将出现空白区域。
 * 设置为 true 后, 调整 表格大小时, 列的大小也会跟着改变
 * 默认值 false
 */
gantt.config.grid_elastic_columns = true;

/**
 * https://docs.dhtmlx.com/gantt/api__gantt_keep_grid_width_config.html
 * 调整 表格 colums 宽度时 , 是否保持 初始表格宽度
 * 实测 可能导致 拖拽放大 列宽时, 只能扩大一点点
 * 默认值 false
 */
gantt.config.keep_grid_width = false; 

/**
 * https://docs.dhtmlx.com/gantt/api__gantt_grid_width_config.html
 * 左侧表格的宽度
 * 默认值 360
 */
gantt.config.grid_width = 540;

/**
 * https://docs.dhtmlx.com/gantt/api__gantt_show_grid_config.html
 * 显示 甘特图的 左侧表格
 * 默认值 true
 */
 gantt.config.show_grid = true;

/**
 * https://docs.dhtmlx.com/gantt/api__gantt_scale_height_config.html
 * 设置 时间刻度 的高度, 设置后 表格表头的高度会自动改变为一致的 
 * 默认值 35
 */
gantt.config.scale_height = 60; // 日期栏的高度 

const weekScaleTemplate = function (date) {
  // const mouthMap = {
  //     Jan: '一月',
  //     Feb: '二月',
  //     Mar: '三月',
  //     Apr: '四月',
  //     May: '五月',
  //     Jun: '六月',
  //     Jul: '七月',
  //     Aug: '八月',
  //     Sept: '九月',
  //     Oct: '十月',
  //     Nov: '十一月',
  //     Dec: '十二月'
  // };
  // // 可以时使用dayjs 处理返回
  // const dateToStr = gantt.date.date_to_str('%d');
  // const mToStr = gantt.date.date_to_str('%M');
  // const endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1, 'day');
  //   // 处理一下月份
  //   return `${dateToStr(date)} 日 - ${dateToStr(endDate)} 日 (${
  //     mouthMap[mToStr(date)]
  // })`;
  return `第${gantt.date.date_to_str('%W')(date)}周`
};
const dayFormat = function (date) {
  // const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  // return `${gantt.date.date_to_str('%n')(date)}-${gantt.date.date_to_str('%d')(date)}, ${weeks[Dayjs(date).day()]}`;
  return `${gantt.date.date_to_str('%n')(date)}月${gantt.date.date_to_str('%d')(date)}日`;
};

const daysStyle = function(date){
  if(date.getDay()==0||date.getDay()==6){
    return "weekend";
  }
};
/**
 * https://docs.dhtmlx.com/gantt/api__gantt_scales_config.html
 * 时间 刻度设置 
 */
 gantt.config.scales = [
  { unit: 'year', step: 1, format: '%Y年' },
  { unit: 'week', step: 1, format: '第%W周' },
  { unit: 'day', step: 1, format: dayFormat, css: daysStyle }
];


// gantt.plugins({
//   marker: true
// });
// gantt.addMarker({
//   start_date: new Date('2022-12-10'),
//   end_date: new Date('2022-12-12'),
//   text: '休息'
// });

/**
 * 设置 gannt timeline 单元格 class 名
 * 下方例子 为 周六周日 设置 class 为 weekend
 * @param {*} task 
 * @param {*} date 
 */
gantt.templates.timeline_cell_class = function(task,date){
  if(date.getDay()==0||date.getDay()==6){ 
    return "weekend" ;
  }
};

/**
 * https://docs.dhtmlx.com/gantt/api__gantt_columns_config.html
 * 定义 表格的 列
 */
gantt.config.columns = [
  {
    name:"wbs", 
    label:"WBS",
    tree: true,
    resize: true,
    min_width: 80,
    template: function (obj) {
      return obj.WBSName;
    }
  },
  {
    name: 'text',
    label: '任务名称',
    width: 160,
    resize: true,
    align: 'center',
    template: function (obj) {
      return obj.text;
    }
  },
  {
    name: 'start_date',
    label: '开始时间',
    width: 80,
    align: 'center',
    template: function (obj) {
      return obj.start_date;
    }
  },
  {
    name: 'end_date',
    label: '结束时间',
    width: 80,
    align: 'center',
    template: function (obj) {
      return obj.end_date;
    }
  },
  {
    name: 'progress',
    label: '进度',
    width: 65,
    align: 'center',
    template: function (obj) {
      return `${(obj.progress * 100).toFixed(2)}%`;
    }
  }
];

// 连接线双击, 默认会弹框 询问 是否 删除当前连线
gantt.attachEvent("onLinkDblClick", function(){
  // any custom logic here
  return false;
});

/**
 * https://docs.dhtmlx.com/gantt/api__refs__gantt_templates.html
 * 
 */

gantt.templates.task_text=function(start, end, task){
    return task.WBSName + ' ' + task.text;
};

gantt.templates.tooltip_text = function (start, end, task) {
  if (task.type == gantt.config.types.milestone) {
    return task.text + "<br/>" +
    "<b>完成时间:</b> " +
    gantt.templates.tooltip_date_format(end);
  }
  
  return "<b>任务名:</b> " + task.text + "<br/>" +
    "<b>完成进度: </b>" + (task.progress * 100).toFixed(2) + "%<br/>" +
    "<b>计划用时: </b> " + task.duration + ' 天 ' +
    '(' +  gantt.templates.tooltip_date_format(start) + ' 至 ' + 
      gantt.templates.tooltip_date_format(end) + ')';
};

// gantt.templates.leftside_text = function (start, end, task) {
//   return task.duration + " days";
// };

gantt.templates.rightside_text = function (start, end, task) {
  if (task.type == gantt.config.types.milestone) {
    return task.text;
  }
  return task.duration + " 天";
};

export default {
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },

  methods: {
    $_initGanttEvents: function() {
      if (!gantt.$_eventsInitialized) {
        gantt.attachEvent('onTaskSelected', (id) => {
          let task = gantt.getTask(id);
          this.$emit('task-selected', task);
        });

        gantt.attachEvent('onTaskIdChange', (id, new_id) => {
          if (gantt.getSelectedId() == new_id) {
            let task = gantt.getTask(new_id);
            this.$emit('task-selected', task);
          }
        });

        gantt.$_eventsInitialized = true;
      }
    },

    $_initDataProcessor: function() {
      if (!gantt.$_dataProcessorInitialized) {
        gantt.createDataProcessor((entity, action, data, id) => { 
          this.$emit(`${entity}-updated`, id, action, data);
        });

        gantt.$_dataProcessorInitialized = true;
      }
    },
    changeView(type) {
      if (type === 'week') {
        gantt.config.scale_height = 50;
        gantt.config.scales = [
          { unit: 'year', step: 1, format: '%Y年' },
          { unit: 'week', step: 1, format: weekScaleTemplate, css: () => 'week-cell' }
        ];
      } else if (type === 'day') {
        gantt.config.scale_height = 60;
        gantt.config.scales = [
          { unit: 'year', step: 1, format: '%Y年' },
          { unit: 'week', step: 1, format: '第%W周' },
          { unit: 'day', step: 1, format: dayFormat, css: daysStyle }
        ];
      } else if (type === 'year') {
        gantt.config.scale_height = 30;
        gantt.config.scales = [
          { unit: 'year', step: 1, format: '%Y年' }
        ];
      }
      gantt.render()
    },
    toggleFullScreen() {
      if (!gantt.getState().fullscreen) {
        // expanding the gantt to full screen
        gantt.expand();
    }
      else {
        // collapsing the gantt to the normal mode
        gantt.collapse();
      }
    },
    toggleGanttGrid() {
      gantt.config.show_grid = !gantt.config.show_grid;
      gantt.render()
    }
  },

  mounted: function () {
    this.$_initGanttEvents();
    gantt.config.date_format = "%Y-%m-%d";

    gantt.init(this.$refs.ganttContainer);
    gantt.parse(this.$props.tasks);

    this.$_initDataProcessor();
  }
}
</script>

<style>
  /* @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css"; */
.weekend{ 
  background: #f3fff4 !important;
}

.gantt_task_scale .weekend {
  border-bottom: 1px solid #cecece;
}

.gantt_selected .weekend {
  background: #f7eb91 !important;
}

.gantt_row {
  background-color: #f2f2f2;
}

.gantt_row .gantt_cell:not(:last-child),
.gantt_grid_scale .gantt_grid_head_cell:not(:last-child) {
  border-right: 1px solid #ebebeb !important;
}

/* .week-cell {
  width: 140px !important;
} */
/* .gantt_row.odd, .gantt_task_row.odd {
  background-color: #f2f2f2;
} */
</style>