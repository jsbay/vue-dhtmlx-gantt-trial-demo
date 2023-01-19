<template>
  <div class="container">
    <!--
    <div class="right-container">
      <div class="gantt-selected-info">
        <div v-if="selectedTask">
          <h2>{{ selectedTask.text }}</h2>
          <span><b>ID: </b>{{ selectedTask.id }}</span
          ><br />
          <span><b>Progress: </b> {{ progressPercentage }}</span
          ><br />
          <span><b>Start Date: </b
            >{{ formattedStartDate }}</span
          ><br />
          <span><b>End Date: </b>{{ formattedEndDate }}</span
          ><br />
        </div>
        <div v-else class="select-task-prompt">
          <h2>Click any task</h2>
        </div>
      </div>
      <ul class="gantt-messages">
        <li
          class="gantt-message"
          v-for="(message, index) in messages"
          v-bind:key="index"
        >
          {{ message }}
        </li>
      </ul>
    </div>
    -->
    <GanttComponent
      class="left-container"
      :tasks="tasks"
      @task-updated="logTaskUpdate"
      @link-updated="logLinkUpdate"
      @task-selected="selectTask"
    ></GanttComponent>
  </div>
</template>

<script>
import GanttComponent from "./components/GanttComponent.vue";

export default {
  name: "app",
  components: { GanttComponent },
  data() {
    return {
      tasks: {
        data: [
          {
            "id": 10000, 
            "text":"我是项目名",
            "start_date":"2022-12-01",
            "end_date":"2022-12-12",
            // "duration":"11",
            type: 'project',
            "WBSName": '0',
            "progress": 0.12,
            "open":true
          },
          { 
            "id":10001, 
            "text":"任务 1",
            "start_date":"2022-12-01",
            "end_date":"2022-12-18",
            "WBSName": '1',
            "progress": 0.4,
            "parent":"10000",
            type: 'project',
            open: true
          },
          { 
            "id":10001001, 
            "text":"任务 1.1",
            "start_date":"2022-12-01",
            "end_date":"2022-12-18",
            "duration":"18",
            "WBSName": '1.1',
            "progress": 0.4,
            "parent":"10001"
          },
          { "id": 10001002, 
            "text":"任务 1 的里程碑",
            "start_date":"2022-12-23",
            "end_date":"2022-12-28",
            "WBSName": '1.2',
            type:"milestone",
            rollup: true,
            "parent": "10001",
          },
          {
            "id": 10002, 
            "text":"任务 2",
            "start_date":"2022-12-10",
            "end_date":"2022-12-30",
            type: 'project',
            "progress": 0.32,
            // "duration":"20",
            "WBSName": '2',
            "parent":"10000",
            "open":true,
            render:"split",
          },
          {
            "id": 10002001, 
            "text":"任务 2 的阶段1",
            "start_date":"2022-12-10",
            "end_date":"2022-12-18",
            // "duration":"8",
            "WBSName": '2.1',
            "parent":"10002"
          },
          {
            "id": 10002002, 
            "text":"任务 2 的阶段2",
            "start_date":"2022-12-19",
            "end_date":"2022-12-29",
            // "duration":"10",
            "WBSName": '2.2',
            "parent":"10002"
          },
          {
            "id": 10003, 
            "text":"任务 3",
            "start_date":"2023-01-18",
            "end_date":"2023-02-18",
            // "duration":"30",
            "WBSName": '3',
            "parent":"10000"
          }
        ],
        links: [
        { id: 1, source: 10002001, target: 10002002, type: "0" },
        { id: 2, source: 10002002, target: 10003, type: "0" },
        ],
      },
      selectedTask: null,
      messages: [],
    };
  },
  computed: {
    progressPercentage() {
      let taskProgress = this.selectedTask.progress;
      if (!taskProgress) {
        return "0";
      }
      return `${Math.round(+taskProgress * 100)} %`;
    },
    formattedStartDate() {
      let taskStart = this.selectedTask.start_date;
      return `${taskStart.getFullYear()} / ${taskStart.getMonth() + 1} / ${taskStart.getDate()}`;
    },
    formattedEndDate() {
      let taskEnd = this.selectedTask.end_date;
      return `${taskEnd.getFullYear()} / ${taskEnd.getMonth() + 1} / ${taskEnd.getDate()}`;
    },
  },
  methods: {
    selectTask(task) {
      this.selectedTask = task;
    },

    addMessage(message) {
      this.messages.unshift(message);
      if (this.messages.length > 40) {
        this.messages.pop();
      }
    },

    logTaskUpdate(id, mode, task) {
      let text = task && task.text ? ` (${task.text})` : "";
      let message = `Task ${mode}: ${id} ${text}`;
      this.addMessage(message);
    },

    logLinkUpdate(id, mode, link) {
      let message = `Link ${mode}: ${id}`;
      if (link) {
        message += ` ( source: ${link.source}, target: ${link.target} )`;
      }
      this.addMessage(message);
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.container {
  height: 100vh;
  width: 100%;
}

.left-container {
  overflow: hidden;
  position: relative;
  height: 100%;
}

.right-container {
  border-right: 1px solid #cecece;
  float: right;
  height: 100%;
  width: 340px;
  box-shadow: 0 0 5px 2px #aaa;
  position: relative;
  z-index: 2;
}

.gantt-messages {
  list-style-type: none;
  height: 50%;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 5px;
}

.gantt-messages > .gantt-message {
  background-color: #f4f4f4;
  box-shadow: inset 5px 0 #d69000;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin: 5px 0;
  padding: 8px 0 8px 10px;
}

.gantt-selected-info {
  border-bottom: 1px solid #cecece;
  box-sizing: border-box;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  height: 50%;
  line-height: 28px;
  padding: 10px;
}

.gantt-selected-info h2 {
  border-bottom: 1px solid #cecece;
}

.select-task-prompt h2 {
  color: #d9d9d9;
}
</style>
