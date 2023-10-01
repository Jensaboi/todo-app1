export default class Task {
    task;
    priority;
    description;
    taskColor;
    timeFrom;
    timeTo;
    completed;

    constructor(task, priority, description, taskColor, timeFrom, timeTo, completed){
      this.task = task;
      this.priority = priority;
      this.description = description;
      this.taskColor = taskColor;
      this.timeFrom = timeFrom;
      this.timeTo = timeTo;
      this.completed = completed;
    }
  }
  