import { initModalBtns } from "./services/inti.service.js"
import {getTasks} from './services/task.service.js'
const tasksFromLocalStorage = getTasks();
let tasksOnDate = (tasksFromLocalStorage) ? tasksFromLocalStorage : {};
let sortedTasksOnDate = []
const today = new Date()


const sortedTaskList = document.getElementById("sorted-task-list")

function sortByDueDate() {
  
  for(const keys in tasksOnDate){
    for(const taskObj of tasksOnDate[keys]){
      const taskObjWithDate = {...taskObj, date: keys}
      sortedTasksOnDate.push(taskObjWithDate)
    }
  }
  sortedTasksOnDate.sort((a,b) => new Date(a.date) - new Date(b.date))
}

function renderSortedTaskList(){
  sortedTasksOnDate.forEach((task) =>{
    let taskDate = new Date(task.date)
    let todayNoHours = today.setHours(0, 0, 0, 0);
    
    if(task.completed === false && taskDate >= todayNoHours){
    let taskCard = document.createElement('li')
    taskCard.className = 'task-li'
    taskCard.innerHTML =
    `
    <div class="card-top-section">
      <p class="task-priority ${task.priority}">${task.priority}</p>
      <div class="time-container">
        <p>${task.timeFrom}</p>
        <p>${task.timeTo}</p>
      </div>
    </div>
    <h3 class="task-name">${task.task}</h3>
    <p class="description-p">${task.description}</p>
    <p class="due-date">due date: <span class="current-day">${task.date}</span></p>
    `

    sortedTaskList.appendChild(taskCard)
  }
  })
}

sortByDueDate()
initModalBtns()
renderSortedTaskList()