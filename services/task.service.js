import { tasksOnDate } from "./calendar.service.js";
export let tasksFromLocalStorage;

export function getTasks() {
   return JSON.parse(localStorage.getItem("tasksOnDate"));
};

export function addTaskToDate(date,task){
    if(!tasksOnDate[date]){
      tasksOnDate[date] = []
    }
    tasksOnDate[date].push(task)
    localStorage.setItem("tasksOnDate", JSON.stringify(tasksOnDate))
}
