import { constants } from "../constants/constants.js";
import { formatDateToYYYYMMDD } from "./time.utility.service.js";
import Task from "../models/task.model.js"
import { addTaskToDate } from "./task.service.js"
import { renderSelectedDay, renderWeeklyCalendar } from "./calendar.service.js";

export function closeAddModal(){
    constants.taskInput.value = ''
    constants.dateInput.value = ''
    constants.descriptionInput.value = ''
    constants.modalsOverlayBg.style.display = "none"
}
export function openAddModal(selectedDay){
  constants.modalsOverlayBg.style.display = "block"
  if(selectedDay){
    constants.dateInput.value = formatDateToYYYYMMDD(selectedDay)
  }else{
    constants.dateInput.valueAsDate = new Date()
  }
}
export function saveTaskBtn(){
  let task = new Task(constants.taskInput.value, constants.priorityInput.value, constants.descriptionInput.value, "red", constants.timeFromInput.value, constants.timeEndInput.value, false)
  
  if(constants.dateInput.value && constants.taskInput.value){
    addTaskToDate(constants.dateInput.value, task)
  } else { 
    console.log("nothing happens")
  }
  
  renderSelectedDay()
  renderWeeklyCalendar()
  closeAddModal()
}

export default {closeAddModal, openAddModal, saveTaskBtn}